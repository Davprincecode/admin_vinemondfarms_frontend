import React, { useEffect, useRef, useState } from 'react';
import { toast } from 'react-toastify';
import { IoIosArrowBack } from 'react-icons/io';
import ButtonPreloader from '../../../component/ButtonPreloader';

import { userAuth } from '../../context/AuthContext';
import ConfirmFreeBooking from './ConfirmFreeBooking';

type TimeUserSlot = {
  date: string;
  start_time: string;
  end_time: string;
};

type TimeSlot = {
  bookingId: string;
  date: string;
  startTime: string;
  endTime: string;
  timeInterval: string;
  bookingStatus: string;
};

interface scheduleIntern {
  scheduleToggle: (data : string) => void;
  toggleToDefault: () => void;
}

const durationMap: { [label: string]: number } = {
  '10min':10, '20min': 20, '30min': 30, '40min': 40, '50min' : 50, '1hr': 60, '1hr 30min': 90, '2hr': 120,
  '2hr 30min': 150, '3hr': 180, '4hr': 240, '5hr': 300,
  '6hr': 360, '7hr': 420, '8hr': 480, '9hr': 540, '10hr': 600,
  '11hr': 660, '12hr': 720, '13hr': 780, '14hr': 840, '15hr': 900,
  '16hr': 960, '17hr': 1020, '18hr': 1080, '19hr': 1140, '20hr': 1200,
  '21hr': 1260, '22hr': 1320, '23hr': 1380, '24hr': 1440,
};

const weekdayMap: Record<string, number> = {
  Sunday: 0, Monday: 1, Tuesday: 2, Wednesday: 3,
  Thursday: 4, Friday: 5, Saturday: 6,
};

const cloneDate = (date: Date) => new Date(date.getTime());
const addDays = (date: Date, days: number) => new Date(date.getFullYear(), date.getMonth(), date.getDate() + days);
const addMonths = (date: Date, months: number) => new Date(date.getFullYear(), date.getMonth() + months, date.getDate());
const addWeeks = (date: Date, weeks: number) => addDays(date, weeks * 7);
const addYears = (date: Date, years: number) => new Date(date.getFullYear() + years, date.getMonth(), date.getDate());
const isBetweenInclusive = (date: Date, start: Date, end: Date) => date >= start && date <= end;


const formatTime = (date: Date): string => {
  let hours = date.getHours();
  const minutes = date.getMinutes();
  const ampm = hours >= 12 ? 'PM' : 'AM';

  hours = hours % 12;
  hours = hours === 0 ? 12 : hours;

  const hh = String(hours).padStart(2, '0');
  const mm = String(minutes).padStart(2, '0');

  return `${hh}:${mm} ${ampm}`;
};


const formatOccurrence = (date: string, start: Date, end: Date): TimeUserSlot => {
  return {
    date,
    start_time: formatTime(start),
    end_time: formatTime(end),
  };
};
const getNthWeekdayOfMonth = (baseDate: Date, weekNumber: number, weekday: string): Date | null => {
  const targetDay = weekdayMap[weekday];
  const firstDay = new Date(baseDate.getFullYear(), baseDate.getMonth(), 1);
  let count = 0;

  for (let i = 0; i < 31; i++) {
    const current = addDays(firstDay, i);
    if (current.getMonth() !== baseDate.getMonth()) break;
    if (current.getDay() === targetDay) {
      count++;
      if (count === weekNumber) return current;
    }
  }

  return null;
};

const AddSchedule = ({ scheduleToggle, toggleToDefault }: scheduleIntern) => {


  const { baseUrl, token } = userAuth();
  const [showPopup, setShowPopup] = useState(false);
  const [loading, setLoading] = useState(false);
  const [title, setTitle] = useState('');
  const [startDate, setStartDate] = useState('');
  const [endDate, setEndDate] = useState('');
  const [startTime, setStartTime] = useState('');
  const [endTime, setEndTime] = useState('');
  const [day, setDay] = useState(0);
  const [weekDay, setWeekday] = useState('');
  const [recurrence, setRecurrence] = useState('none');
  const [recurrenceDayOfMonth, setRecurrenceDayOfMonth] = useState<number | ''>('');
  const [recurrenceWeekNumber, setRecurrenceWeekNumber] = useState<number | ''>('');
  const [recurrenceWeekday, setRecurrenceWeekday] = useState('');
  const [selectedDays, setSelectedDays] = useState<string[]>([]);
  const [bufferTime, setBufferTime] = useState('');
  const [interval, setInterval] = useState<number | ''>('');
  const [bookingPerDay, setBookingPerDay] = useState<number | ''>('');
  const [maxTimeBeforeBooking, setMaxTimeBeforeBooking] = useState<number | ''>('');
  const [maxDayBeforeBooking, setMaxDayBeforeBooking] = useState<number | ''>('');
  const [price, setPrice] = useState<number | ''>(0);
  const [currency, setCurrency] = useState('NGN');
  const [errorSlots, setErrorSlots] = useState<TimeUserSlot[]>([]);
  const [timeSlots, setTimeSlots] = useState<TimeUserSlot[]>([]);
  const [timeSlotFromServer, setTimeSlotFromServer] = useState<TimeUserSlot[]>([]);

  const weeks = ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday', 'Sunday'];


  
  const toggleDay = (day: string) => {
    if(day !== "") {
        setSelectedDays(prev =>
              prev.includes(day) ? prev.filter(d => d !== day) : [...prev, day]
            );
    }
  };

  const monthlyFunction = (data: string) => {
    if (data === 'day') {
      setRecurrenceDayOfMonth(day);
      setRecurrenceWeekNumber('');
      setRecurrenceWeekday('');
    } else {
      setRecurrenceWeekNumber(parseInt(data));
      setRecurrenceWeekday(weekDay);
      setRecurrenceDayOfMonth('');
    }
  };

  const dateFunction = (dateStr: string, data: string) => {
  const date = new Date(dateStr);

  if (data === "start") {
    setDay(date.getDate());
    setWeekday(date.toLocaleDateString('en-US', { weekday: 'long' }));
    setStartDate(dateStr);

    // Optional: If endDate is already set, validate it
    if (endDate) {
      const end = new Date(endDate);
      if (end < date) {
        toast.error("End date must be greater than start date");
      }
    }
  }

  if (data === "end") {
    const start = new Date(startDate);
    if (startDate && date < start) {
      toast.error("End date must be greater than start date");
      return;
    }
    setEndDate(dateStr);
  }
  };


    const timeInputRef = useRef<HTMLInputElement>(null);

  const timeFunction = (timeStr: string, type: 'start' | 'end') => {

  if (type === 'start') {
    setStartTime(timeStr);

    if (endTime) {
      const startMin = timeToMinutes(timeStr);
      const endMin = timeToMinutes(endTime);
      if (endMin < startMin) {
        toast.error('End time must be greater than start time');
        setStartTime('');
      }
    }
  }

  if (type === 'end') {
    if (startTime) {
      const startMin = timeToMinutes(startTime);
      const endMin = timeToMinutes(timeStr);
      if (endMin < startMin) {
        toast.error('End time must be greater than start time');
        return;
      }
    }
    setEndTime(timeStr);
  }
};

  const recurrenceFunction = (data: string) => {
    if (data !== 'monthly') {
      setRecurrenceDayOfMonth('');
      setRecurrenceWeekNumber('');
      setRecurrenceWeekday('');
    }
    if (data !== 'weekly' && data !== 'biweekly') {
      setSelectedDays([]);
      toggleDay(weekDay);
    }
    setRecurrence(data);
  };

  const formatDateLocal = (date: Date): string => {
  const year = date.getFullYear();
  const month = String(date.getMonth() + 1).padStart(2, '0'); // month is 0-indexed
  const day = String(date.getDate()).padStart(2, '0');
  return `${year}-${month}-${day}`;
};

 const generateRecurringDates = (
  startDate: string,
  endDate: string,
  recurrence: string,
  selectedDays: string[],
  recurrenceDayOfMonth?: number,
  recurrenceWeekNumber?: number,
  recurrenceWeekday?: string
): string[] => {
  if (!startDate || !endDate) return [];
  const start = new Date(startDate);
  const end = new Date(endDate);
  let dates: string[] = [];

  switch (recurrence) {
    case 'daily':
      for (let date = cloneDate(start); date <= end; date = addDays(date, 1)) {
        dates.push(formatDateLocal(date));
      }
      break;

    case 'weekly':
    case 'biweekly':
     const dayIndexes = selectedDays.map(day => weekdayMap[day]).filter(i => i !== undefined);
        let date = cloneDate(start);
        date.setDate(date.getDate() - date.getDay() + 1); // Monday
        const weekStep = recurrence === 'biweekly' ? 2 : 1;

        while (date <= end) {
          for (const dayIndex of dayIndexes) {
            const occurrence = addDays(date, dayIndex);
            if (isBetweenInclusive(occurrence, start, end)) {
              dates.push(occurrence.toISOString().split('T')[0]);
            }
          }
          date = addWeeks(date, weekStep);
        }
        break;
     

    case 'monthly':
      if (recurrenceDayOfMonth) {
        for (let date = cloneDate(start); date <= end; date = addMonths(date, 1)) {
          const targetDate = new Date(date.getFullYear(), date.getMonth(), recurrenceDayOfMonth);
          if (targetDate <= end) {
            dates.push(formatDateLocal(targetDate));
          }
        }
      } else if (recurrenceWeekNumber && recurrenceWeekday) {
        for (let date = cloneDate(start); date <= end; date = addMonths(date, 1)) {
          const targetDate = getNthWeekdayOfMonth(date, recurrenceWeekNumber, recurrenceWeekday);
          if (targetDate && targetDate <= end) {
            dates.push(formatDateLocal(targetDate));
          }
        }
      }
      break;

    case 'yearly':
      for (let date = cloneDate(start); date <= end; date = addYears(date, 1)) {
        dates.push(formatDateLocal(date));
      }
      break;

    default:
      dates.push(formatDateLocal(start));
      break;
  }

  return dates;
};

const timeToMinutes = (time: string): number => {
  const [rawTime, period] = time.split(' ');
  const [hh, mm] = rawTime.split(':').map(Number);

  let hours = hh;
  if (period === 'PM' && hh !== 12) hours += 12;
  if (period === 'AM' && hh === 12) hours = 0;

  return hours * 60 + mm;
};

const isOverlap = (slotA: TimeUserSlot, slotB: TimeUserSlot): boolean => {
  if (slotA.date !== slotB.date) return false;

  const startA = timeToMinutes(slotA.start_time);
  const endA = timeToMinutes(slotA.end_time);
  const startB = timeToMinutes(slotB.start_time);
  const endB = timeToMinutes(slotB.end_time);

  return startA < endB && startB < endA;
};

const generateTimeSlots = (
  dateStr: string,
  startTime: string = '00:00',
  endTime: string = '23:59',
  interval?: number,
  buffer?: number,
  timeSlotFromServer: TimeUserSlot[] = []
): { valid: TimeUserSlot[]; errors: TimeUserSlot[] } => {
  const slots: TimeUserSlot[] = [];
  const errors: TimeUserSlot[] = [];

  const [startHour, startMinute] = startTime.split(':').map(Number);
  const [endHour, endMinute] = endTime.split(':').map(Number);

  const date = new Date(dateStr);
  const start = new Date(date);
  start.setHours(startHour, startMinute, 0, 0);

  const end = new Date(date);
  end.setHours(endHour, endMinute, 0, 0);

  if (!interval) {
    const slot = formatOccurrence(dateStr, start, end);
    const conflicts = timeSlotFromServer.filter(existing => isOverlap(slot, existing));
    if (conflicts.length > 0) {
      errors.push(...conflicts); 
    }
    return { valid: slots, errors };
  }

  let current = new Date(start);

  while (true) {
    const slotStart = new Date(current);
    const slotEnd = new Date(current);
    slotEnd.setMinutes(slotEnd.getMinutes() + interval);

    if (slotEnd > end) break;

    const newSlot = formatOccurrence(dateStr, slotStart, slotEnd);
      const conflicts = timeSlotFromServer.filter(existing => isOverlap(newSlot, existing));
    if (conflicts.length > 0) {
      errors.push(
        ...conflicts
      );
    }

    current.setMinutes(current.getMinutes() + interval + (buffer ?? 0));
  }

  return { valid: slots, errors };
};

useEffect(() => {
    const allDates = generateRecurringDates(
      startDate,
      endDate,
      recurrence,
      selectedDays,
      recurrenceDayOfMonth as number,
      recurrenceWeekNumber as number,
      recurrenceWeekday
    );

    let allValid: TimeUserSlot[] = [];
    let allErrors: TimeUserSlot[] = [];

    for (const date of allDates) {
      const { valid, errors } = generateTimeSlots(
        date,
        startTime,
        endTime,
        interval as number,
        bufferTime ? parseInt(bufferTime) : 0,
        timeSlotFromServer
      );
      
        
        
      allValid.push(...valid);
      allErrors.push(...errors);
    }
    setTimeSlots(allValid);
    setErrorSlots(allErrors);
  }, [
    startDate,
    endDate,
    recurrence,
    selectedDays,
    recurrenceDayOfMonth,
    recurrenceWeekNumber,
    recurrenceWeekday,
    startTime,
    endTime,
    interval,
    bufferTime,
    timeSlotFromServer
  ]);

useEffect(()=>{
     
    const fetchExitsingDate = async () => {
                    
             setLoading(true);
        try {
          const response = await fetch(`${baseUrl}/bookings/${startDate}/${endDate}/${startTime}/${endTime}`, {
            method: "GET",
            headers: { "Content-Type": "application/json" },
            redirect: "follow"
          });
          
          if (!response.ok) {
            const errorResponse = await response.json();
            throw new Error(errorResponse.message);
          }
            const result = await response.json();
            setTimeSlotFromServer(result.data);
            setLoading(false);
        } catch (error) {
          if (typeof error === "object" && error !== null && "message" in error && typeof error.message === "string") {
            // toast.error(error.message);
          } else {
            toast.error("An unknown error occurred.");
          }
          setLoading(false);
        } finally {
          setLoading(false);
        }
        }

         if(startDate && endDate && startTime && endTime){ 
          fetchExitsingDate();
         }

  },[startDate, endDate, startTime, endTime])
  // ...keep your fetchExistingDate and handleProduct logic here...
 const bookingCount = title.replace(/\s/g, '').length;
const handleBookingDescriptionCount = (e: { target: { value: any; }; }) => {
            const input = e.target.value;
            const nonSpaceCount = input.replace(/\s/g, '').length;
            if (nonSpaceCount <= 300) {
            setTitle(input);
            }
        };

  const validateProductForm = () => {
    if (!title.trim()) {
      toast.error("Title is required");
      return false;
    }
    if (!startDate.trim()) {
      toast.error("Start date is required");
      return false;
    }
    if(errorSlots.length > 0){
       toast.error("Time overlaped existing booking");
       return false;
    }
    if (!endDate.trim()) {
      toast.error("end date is required");
      return false;
    }
    if (!startTime.trim()) {
      toast.error("Start time is required");
      return false;
    }
    if (!endTime.trim()) {
      toast.error("End time is required");
      return false;
    }
    if (!currency.trim()) {
      toast.error("Currency is required");
      return false;
    }
    if (!price || isNaN(price)) {
      // toast.error("Valid price  is required");
      setShowPopup(true);
      if(showPopup){
        return true;
      }else{
        return false;
      }
    }
    if (recurrence == "weekly" || recurrence == "biweekly") {
      if(selectedDays.length < 1){
           toast.error("Select a day");
         return false;
      }
    }

  if (recurrence == "monthly") {
  const isDayMode = recurrenceDayOfMonth !== '';
  const isWeekMode = recurrenceWeekNumber !== '' && recurrenceWeekday !== '';

  if (!isDayMode && !isWeekMode) {
    toast.error("Please select either a day of the month or a week + weekday pattern");
    return false;
  }

  if (isDayMode && (recurrenceDayOfMonth < 1 || recurrenceDayOfMonth > 31)) {
    toast.error("Day of the month must be between 1 and 31");
    return false;
  }

  if (isWeekMode && (recurrenceWeekNumber < 1 || recurrenceWeekNumber > 5)) {
    toast.error("Week number must be between 1 and 5");
    return false;
  }
   }

 return true;

  }

    const handleProduct =  async() => {
            if(!validateProductForm()){
              return;
            }      
             setLoading(true);
             const formdata = new FormData();
                   
                   formdata.append("bookingDescription",  title);
                   formdata.append("startDate",  startDate);
                   formdata.append("endDate",   endDate);
                   formdata.append("startTime",  startTime);
                   formdata.append("endTime",  endTime);
                   formdata.append("currency",  currency);
                   formdata.append("price",  price.toString());
                  //  formdata.append('currency', currency);
                   formdata.append("recurrence",  recurrence);
                   // formdata.append("recurrenceDays", JSON.stringify(selectedDays));
   
                   formdata.append('bufferTime', bufferTime.toString());
                   formdata.append('interval', interval.toString());
                   formdata.append('bookingPerDay', bookingPerDay.toString());
                   formdata.append('maxTimeBeforeBooking', maxTimeBeforeBooking.toString());
                   formdata.append('maxDayBeforeBooking', maxDayBeforeBooking.toString());
   
                   formdata.append("recurrenceDayOfMonth",  recurrenceDayOfMonth.toString());
                   formdata.append("recurrenceWeekNumber",  recurrenceWeekNumber.toString());
                   formdata.append("recurrenceWeekday",  recurrenceWeekday);
   
                   if(selectedDays.length > 0){
                   selectedDays.forEach((selectDay, index) => {
                     formdata.append(`recurrenceDays[${index}]`, selectDay);
                   });
               }
                 const myHeaders = new Headers();
                 myHeaders.append("Authorization", token);
                 const requestOptions: RequestInit = {
                     method: "POST",
                     headers: myHeaders,
                     body: formdata,
                     redirect: "follow"
                 };
                 try {
                     const response = await fetch(`${baseUrl}/booking`, requestOptions);
                     // const results = await response.text();
                     // console.log(results);
                     
                     if (!response.ok) {
                     const errorResponse = await response.json();
                     throw new Error(errorResponse.message);
                     }
                     const result = await response.json();  
                   setTitle('');
                   setStartDate('');
                   setEndDate('');
                   setStartTime('');
                   setEndTime('');
                   setCurrency('NGN');
                   setPrice('');
                   setRecurrence('none');
                   setRecurrenceDayOfMonth('');
                   setRecurrenceWeekNumber('');
                   setRecurrenceWeekday('');
   
                     setLoading(false); 
                   
                     toast.success(result.message);
                     toggleToDefault();  
                     location.reload();     
                 } catch (error) {
                               setLoading(false);
                               if (typeof error === "object" && error !== null && "message" in error && typeof error.message === "string") {
                               toast.error(error.message);
                               } else {
                               toast.error('An unknown error occurred.');
                               }
                     setLoading(false); 
                 }
               
           }
      const [value, onChange] = useState('10:00');
  return (
    <div className='course-container'>

       <div className="admin-shop-header">
                      <div className="admin-header-form flex-center gap-10 justification-between">
                        <div className="back-con flex-center gap-10" onClick={() => scheduleToggle("default")}>
                          <div className="back-left-arrow" >
                            <IoIosArrowBack />
                          </div>
                          <p>back</p>
                        </div>
                        {/* <IoSettingsOutline className="setting-icon"  onClick={backFunction}/> */}
                      </div>
              </div>

         <h2 className='add-product-titles'>Bookable Appointment Schedule</h2>

        <div className="product-form-top flex justification-between">
            <div className="admin-prd-form">

            <div className="admin-input">
              <div className="input-header-flex flex-center justification-between">
                    <label >Booking Decription</label>
                    <div className="input-header">{bookingCount}/300 character</div>
              </div>
            
            <textarea className='bookingDescription'  cols={30} rows={10}  value={title}
            onChange={handleBookingDescriptionCount}>
            </textarea>
            </div>

       


            <div className="admin-input">
            <label>Start Date</label>
            <input
            name="startDate"
            type="date"
            value={startDate}
            onChange={(e) => dateFunction(e.target.value, "start")}
            />
            </div>

            <div className="admin-input">
            <label>End Date</label>
            <input
            name="endDate"
            type="date"
            value={endDate}
            onChange={(e) => dateFunction(e.target.value, "end")}
            />
            </div>

            <div className="admin-input">
            <label>Start Time</label>
                 
    <input
     
      name="startTime"
      type="time"
      value={startTime}
      
      onChange={(e) => timeFunction(e.target.value, 'start')}
    />
   
  
            </div>

            <div className="admin-input">
            <label>End Time</label>
            <input
            name="endTime"
            type="time"
            value={endTime}
            onChange={(e) => timeFunction(e.target.value, 'end')}
            />
            </div>

               <div className="flex-center gap-10">
                                            <div className="admin-input input-short">
                                            <label>Currency</label>
                                            <select
                                            value={currency}
                                            onChange={(e) => setCurrency(e.target.value)}
                                            >
                                            <option value="NGN">NGN</option>
                                            <option value="USD">USD</option>
                                            <option value="GHS">GHS</option>
                                            <option value="ZAR">ZAR</option>
                                            <option value="KES">KES</option>
                                            <option value="XOF">XOF</option>
                                            </select>
                                            </div>

                                          <div className="admin-input course-input">
                                          <label>price</label>
                                          <input
                                            name="coursePrice"
                                            type="number"
                                            min="0"
                                            placeholder="Enter course price"
                                            value={price}
                                            onChange={(e) => setPrice(parseInt(e.target.value))}
                                          />
                                          </div>
                             </div>

            <div className="admin-input">
            <label>Repeat</label>
            <select
            name="recurrence"
            value={recurrence}
            onChange={(e) => recurrenceFunction(e.target.value)}
            >
            <option value="none">Do Not Repeat</option>
            <option value="daily">Daily</option>
            <option value="weekly">Weekly</option>
            <option value="biweekly">Biweekly</option>
            <option value="monthly">Monthly</option>
            <option value="yearly">Yearly</option>
            </select>
            </div>


            {/* ==================================================================================== */}

            {
            (recurrence === "weekly" ||  recurrence === "biweekly") && (
            <div className='weekDaysCon'>
            <div className='weekTitle'>Select Recurrence Days:</div>

            <div className="weekDays">
            {weeks.map((day) => (
            <label key={day} style={{ display: 'block', marginBottom: '8px' }}>
            <input
            type="checkbox"
            checked={selectedDays.includes(day)}
            onChange={() => toggleDay(day)}
            />
            {day}
            </label>
            ))}
            </div>
            <div style={{ marginTop: '16px' }}>
            <strong>Selected Days:</strong> {selectedDays.join(', ') || 'None'}
            </div>
            </div>
            )
            }

            {/* =================================================================================================== */}
            
            {
            recurrence === "monthly" && (
            <>
            <div className="admin-input">
            <label>Day of Month</label>
            <select name="" onChange={(e) => monthlyFunction(e.target.value)}>
            <option value=""></option>
            <option value="day">{day} of every Month</option>
            <option value="1">First {weekDay} of every Month</option>
            <option value="2">Second {weekDay} of every Month</option>
            <option value="3">Third {weekDay} of every Month</option>
            <option value="4">Fourth {weekDay} of every Month</option>
            <option value="5">Fifth {weekDay} of every Month</option>
            </select>
            </div>
            </>        
            )
            }


 {/* ========================================================== */}

            <div className="admin-input-con">

               <h2 className="admin-prod-titles">BOOKING SETTINGS</h2>
            
                <div className="admin-input">
                  <label>interval</label>
                  <select value={interval} onChange={(e) => setInterval(parseInt(e.target.value))}>
                  <option value=""></option>
                  {Object.entries(durationMap).map(([label, value]) => (
                  <option key={value} value={value}>
                  {label}
                  </option>
                  ))}
                  </select>
                </div>

                <div className="admin-input">
                  <label>booking per day</label>
                  <input
                  type="number"
                  min="0"
                  value={bookingPerDay}
                  onChange={(e) => setBookingPerDay(parseInt(e.target.value))}
                  />
                </div>

                <div className="admin-input">
                  <label>buffer time</label>
                  <select value={bufferTime} onChange={(e) => setBufferTime(e.target.value)}>
                  <option value=""></option>
                  {Object.entries(durationMap).map(([label, value]) => (
                  <option key={value} value={value}>
                  {label}
                  </option>
                  ))}
                  </select>
                </div>

                <div className="admin-input">
                  <label>max time before booking</label>
                  <select value={maxTimeBeforeBooking}
                  onChange={(e) => setMaxTimeBeforeBooking(parseInt(e.target.value))}>
                  <option value=""></option>
                  {Object.entries(durationMap).map(([label, value]) => (
                  <option key={value} value={value}>
                  {label}
                  </option>
                  ))}
                  </select>
                </div>

                <div className="admin-input">
                  <label>max day before booking</label>
                  <select 
                  value={maxDayBeforeBooking}
                  onChange={(e) => setMaxDayBeforeBooking(parseInt(e.target.value))}
                  >
                  <option value=""></option>
                  {[...Array(60)].map((_, i) => {
                  const day = i + 1;
                  return (
                  <option key={day} value={day}>
                  {day} {day === 1 ? 'day' : 'days'}
                  </option>
                  );
                  })}
                  </select>
                </div>

            </div>

            {/* ========================================================= */}
            {
              errorSlots.length > 0 && (
                    <div className="error-con">
                        <h4>Time slot overlaps with an existing booking.</h4>
                        <div className="error-details flex-center">
                        {errorSlots.map((item, index )=>(
                        <p key={index}>{item.date} <br/> {item.start_time} - {item.end_time}</p>
                        ))}
                        </div>
                  </div>
              )
            }
             

            {/* =============================== error end ================================= */}

            {
            loading ? (
            <div className="admin-input">
            <div className='inActive'><ButtonPreloader/></div>
            </div>
            ) : (
            title !== '' &&  startDate !== '' && 
            endDate !== '' && 
            startTime !== '' && 
            endTime !== '' && currency !== '' && price !== '' &&
            recurrence !== '' && price > 0 && errorSlots.length < 1 ? (
                <div className="admin-input">
                  <div className="btn" onClick={handleProduct}>Submit</div>
                </div> 
            ) : (
            <div className="admin-input inActive">
            <div className="btn inActive" onClick={validateProductForm}>Submit</div>
            </div> 
            )

            )}

            </div>
        </div>

      <ConfirmFreeBooking
          isOpen={showPopup}
          loading={loading}
          onCancel={() => setShowPopup(false)}
          onDelete={handleProduct}
        />


    </div>
  )
}

export default AddSchedule