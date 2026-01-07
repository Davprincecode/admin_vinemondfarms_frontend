import React, { Dispatch, SetStateAction, useEffect, useState } from "react";
import { IoIosArrowBack, IoIosArrowForward } from "react-icons/io";
import { toast } from "react-toastify";
import { userAuth } from "../../context/AuthContext";
import ButtonPreloader from "../../../component/ButtonPreloader";


type TimeSlot = {
  bookingId: string;
  relBookingId : string;
  date: string;
  startTime: string;
  endTime: string;
  interval: string;
  currency: string;
  price: number;
  bookingStatus: string;
  bookingDescription : string;
  maxDayBeforeBooking : string;
  maxTimeBeforeBooking : string;
};

interface calendarIntern {
    bookTime : TimeSlot[];
    SetBookTime : (slots: TimeSlot[]) => void;
    setBookingDescription : (data : string) => void;
     setInterval : (data : string) => void;
     relBookingId : string;
    setRelBookingId: (id: string) => void;
      currentMonth: number;
      setCurrentMonth: Dispatch<SetStateAction<number>>;
      currentYear: number;
      setCurrentYear: Dispatch<SetStateAction<number>>;
      changeMonth: (data: number) => void;
}

const BookingCalendars = ({bookTime, SetBookTime, setBookingDescription, setInterval, relBookingId, setRelBookingId, currentMonth, setCurrentMonth,  currentYear, setCurrentYear, changeMonth} : calendarIntern) => {
  const today = new Date();
  const [selectedDate, setSelectedDate] = useState<string | null>(null);
  const [selectedDay, setSelectedDay] = useState<number | null>(null);
   const [selectedBookingTime, SetSelectedBookingTime] = useState<TimeSlot[]>([]);
   const [bookingId, setBookingId] = useState<string>();
   
  const [timeSlots, setTimeSlots] = useState<TimeSlot[]>([]);
  const [loading, setLoading] = useState(false);
  const [userLoading, setUserLoading] = useState(false);
 
  const { baseUrl } = userAuth();

  const daysInMonth = new Date(currentYear, currentMonth + 1, 0).getDate();
  const firstDayOfMonth = new Date(currentYear, currentMonth, 1).getDay(); 
  const offset = firstDayOfMonth === 0 ? 6 : firstDayOfMonth - 1; 

    useEffect(()=>{
    const startDate = currentYear + "-" + (currentMonth + 1) + "-" + "01";
    const endDate = currentYear + "-" + (currentMonth + 1) + "-" + daysInMonth;
    handleMonthlyBooking(startDate, endDate);
    }, [currentMonth, currentYear])

  const handleDateClick = async (date: string, isPass : boolean, status : string) => { 
    if(isPass == false && status == "available" || isPass == false && status == "full"){
      const clickedDate = new Date(date);
      if (clickedDate < new Date(today.getFullYear(), today.getMonth(), today.getDate())) return;
      setSelectedDate(date);
      setSelectedDay(clickedDate.getDate());
      setLoading(true);
      const dateTime = timeSlots.filter(item => item.date == date);
      setRelBookingId(dateTime[0].relBookingId);
      SetSelectedBookingTime(dateTime);
      setBookingDescription(dateTime[0].bookingDescription);
      setInterval(dateTime[0].interval);
      setLoading(false);
    }
  };
   
  const handleMonthlyBooking = async (startDate : string, endDate : string) => {
    setLoading(true);
    try {
      const response = await fetch(`${baseUrl}/bookings/${startDate}/${endDate}`, {
        method: "GET",
        headers: { "Content-Type": "application/json" },
        redirect: "follow"
      });   
      if (!response.ok) {
        const errorResponse = await response.json();
        throw new Error(errorResponse.message);
      }
        const result = await response.json(); 
        setBookingDescription(result.data.lenghth > 0 && result.data[0].bookingDescription);
        setInterval(result.data.lenghth > 0 && result.data[0].interval);
        setTimeSlots(result.data);
        SetSelectedBookingTime([]);
        setSelectedDate(null);
        setLoading(false);
    } catch (error) {
      if (typeof error === "object" && error !== null && "message" in error && typeof error.message === "string") {
        toast.error(error.message);
      } else {
        toast.error("An unknown error occurred.");
      }
      setTimeSlots([]);
      setLoading(false);
    } finally {
      setLoading(false);
    }
  }
  
 const bookConsult = (bookingId: string) => {
  const bookingtime = selectedBookingTime.filter(item => item.bookingId == bookingId)[0]; 
  
  if (!bookingtime) {
    toast.error("Booking time not found.");
    return;
  }

const bookingDate = new Date(bookingtime.date);
const today = new Date();

// Normalize both dates to midnight to avoid time-of-day issues
bookingDate.setHours(0, 0, 0, 0);
today.setHours(0, 0, 0, 0);

const maxDayBeforeBooking = parseInt(bookingtime.maxDayBeforeBooking);

// Calculate difference in days
const diffInMs = bookingDate.getTime() - today.getTime();
const diffInDays = Math.round(diffInMs / (1000 * 60 * 60 * 24));
  
  if (diffInDays > maxDayBeforeBooking) {
    toast.error(`You can only book up to ${maxDayBeforeBooking} days before the booking date.`);
    return;
  }

  // Check maxTimeBeforeBooking
  const maxTimeBeforeBooking = parseInt(bookingtime.maxTimeBeforeBooking); // e.g. 60 minutes
  const bookingStartTime = new Date(`${bookingtime.date} ${bookingtime.startTime}`);
  const now = new Date();

  const diffInMinutes = Math.floor((bookingStartTime.getTime() - now.getTime()) / (1000 * 60));

  if (diffInMinutes < maxTimeBeforeBooking) {
    toast.error(`You must book at least ${maxTimeBeforeBooking} minutes before the start time.`);
    return;
  }
   
  // If all checks pass
  setBookingId(bookingId); 
  SetBookTime([bookingtime]);
 
  
  }



  return ( 
  
  <>
   
<div className="calendar-flex-con">
      <div className="calendar-container">
        <div className="calendar-header">
          <button onClick={() => changeMonth(-1)} className="prevMonth">
            <IoIosArrowBack />
          </button>
          <span className="date-title">
            {new Date(currentYear, currentMonth).toLocaleString("default", { month: "long" })} {currentYear}
          </span>
          <button onClick={() => changeMonth(1)} className="nextMonth">
            <IoIosArrowForward />
          </button>
        </div>

        <div className="calendar-weekdays">
          {["Mon", "Tue", "Wed", "Thur", "Fri", "Sat", "Sun"].map((day) => (
            <div key={day} className="weekday">
              {day}
            </div>
          ))}
        </div>
        {
      loading ? (
        <div className="center-prealoader flex-center justification-center" style={{height : "100%"}}>
           <ButtonPreloader />
        </div>
            
      ) : (
        <div className="calendar-grid">
          {[...Array(offset)].map((_, i) => (
            <div key={`empty-${i}`} className="calendar-day empty"></div>
          ))}

          {[...Array(daysInMonth)].map((_, i) => {
            const day = i + 1;
            const dateStr = `${currentYear}-${String(currentMonth + 1).padStart(2, "0")}-${String(day).padStart(2, "0")}`;
            const dateObj = new Date(dateStr);
            const isPast = dateObj < new Date(today.getFullYear(), today.getMonth(), today.getDate());
            const slotsForDay = timeSlots.filter(slot => slot.date === dateStr);
            const allBooked = slotsForDay.length > 0 && slotsForDay.every(slot => slot.bookingStatus === "booked");
            const anyAvailable = slotsForDay.some(slot => slot.bookingStatus === "available");

            const statusClass = allBooked ? "full" : anyAvailable ? "available" : "notavailable";

            return (
              <div
                key={day}
                className={`calendar-day  ${isPast ? "past" : statusClass} ${selectedDay == day && "selectedDay"}`}
                onClick={() => handleDateClick(dateStr, isPast, statusClass)}
              >
                {day}
              </div>
            );
          })}
        </div>
      )}
      </div>

      <div className="calendar-time-container">
        {selectedDate && (
          <div className="times-section">
            <h3>Times for <br /> {selectedDate}</h3>

            {loading ? (
              // <p>Loading...</p>
              <ButtonPreloader/>
            ) : selectedBookingTime.length > 0 ? (
              selectedBookingTime.map((slot) => (

                slot.bookingStatus == "available" ? 
                    (
                    <div key={slot.bookingId} className={`time-slot ${slot.bookingStatus} ${slot.bookingId == bookingId && "selectedTime"}`}  onClick={() => bookConsult(slot.bookingId)} >
                        <strong>{slot.startTime} - {slot.endTime}</strong>
                        <p>{slot.bookingStatus}</p>
                    </div>
                    )
                :
                    (
                    <div key={slot.bookingId} className={`time-slot ${slot.bookingStatus}`}>
                    <strong>{slot.startTime} - {slot.endTime}</strong>
                    <p>{slot.bookingStatus}</p>
                    </div>
                    )
              ))
            ) : (
              <p className="notAvailable">Not available</p>
            )}
          </div>
        )}
      </div>
    </div>
      
   
    
    </>
    
  );
};

export default BookingCalendars;
