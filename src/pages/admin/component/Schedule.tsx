import React, { Dispatch, SetStateAction, useEffect, useState } from 'react'
import { userAuth } from '../../context/AuthContext';
import AddSchedule from './AddSchedule';
import { LuPlus } from 'react-icons/lu';
import { MdKeyboardArrowLeft, MdKeyboardArrowRight } from 'react-icons/md';
import { CiSearch } from 'react-icons/ci';
import ScheduleByDay from './ScheduleByDay';
import SchedulebyMonth from './SchedulebyMonth';
import ScheduleList from './ScheduleList';
import { toast } from 'react-toastify';
import CancelBooking from './CancelBooking';
import BookingDetails from '../../../component/BookingDetails';
import MySchedule from './MySchedule';

interface scheduleIntern {
  scheduleToggle : (data : string) => void;
  relBookingId : string;
  setRelBookingId: Dispatch<SetStateAction<string>>;
}
interface BookingInterface {
        bookingDate : string;
        bookingDateFormat : string;
        bookingEndTime : string;
        bookingId : string;
        bookingStartTime : string;
        customerId : string;
        customerName : string;
        customerEmail : string;
        customerPhoneNumber : string;
        customerOrderNote : string;
        id : string;
        orderDate : string;
        orderStatus : string;
        paymentMethod : string;
        timeLeft : string;
        total : number
}
interface Meta {
  current_page: number;
  per_page: number;
  total: number;
  last_page: number;
  next_page_url: string | null;
  prev_page_url: string | null;
}

const headers = ['my schedule', 'bookings list', 'bookings calendar'];

const Schedule = ({scheduleToggle, relBookingId, setRelBookingId} : scheduleIntern) => {

   const [activeTab, setActiveTab] = useState('my schedule');

    const {baseUrl, token} = userAuth();
    const [showPopup, setShowPopup] = useState(false);
    const [selectedId, setSelectedId] = useState<string | null>(null);
    const [meta, setMeta] = useState<Meta | null>(null);
    const [booking, setBooking] = useState<BookingInterface[]>([]);
    const [authAction, setAuthAction] = useState<boolean>(false);
    const [bookingOrder, setBookingOrder] = useState<BookingInterface[]>([]);
    const [page, setPage] = useState(1);
    const [loading, setLoading] = useState<boolean>(false);
     const [scheduleFilter, setScheduleFilter] = useState <string>('');


       const today = new Date();
      const [currentMonth, setCurrentMonth] = useState(today.getMonth());
      const [currentYear, setCurrentYear] = useState(today.getFullYear());

      const [dayOfMonth, setDayOfMonth] = useState(today.getDate().toString().padStart(2, '0'));
        
      const daysInMonth = new Date(currentYear, currentMonth + 1, 0).getDate();
      const firstDayOfMonth = new Date(currentYear, currentMonth, 1).getDay(); 

      const weekDayName = today.toLocaleDateString('en-US', { weekday: 'short' });
    
        const changeMonth = (delta: number) => {
            let newMonth = currentMonth + delta;
            let newYear = currentYear;
            if (newMonth < 0) {
              newMonth = 11;
              newYear--;
            } else if (newMonth > 11) {
              newMonth = 0;
              newYear++;
            }
            setCurrentMonth(newMonth);
            setCurrentYear(newYear);
            setDayOfMonth("01");
          };

     useEffect(() => {
              const startDate = currentYear + "-" + (currentMonth + 1) + "-" + "01";
              const endDate = currentYear + "-" + (currentMonth + 1) + "-" + daysInMonth;
              getData(page, startDate, endDate);
           }, [currentMonth, currentYear, page]);
     
         const getData = async (pageNumber : number, startDate : string, endDate : string) => {
             setLoading(true);
                 const myHeaders = new Headers();
                 myHeaders.append("Content-Type", "application/json");
                 myHeaders.append("Authorization", token);
                 const requestOptions: RequestInit = {
                     method: "GET",
                     headers: myHeaders,
                     redirect: "follow"
                 };
                 try {
                     const response = await fetch(`${baseUrl}/booking-order/${startDate}/${endDate}?page=${pageNumber}`, requestOptions);
                     if (!response.ok) {
                     const errorResponse = await response.json();
                     throw new Error(errorResponse.message);
                     }
                     const result = await response.json();    
                     setBooking(result.data);
                     setMeta(result.meta);
                     setLoading(false);
                 } catch (error) {
                             setLoading(false);
                             if (typeof error === "object" && error !== null && "message" in error && typeof error.message === "string") {
                             toast.error(error.message);
                             } else {
                             toast.error('An unknown error occurred.');
                             }
                     
                 }
         }


        const handleSearch = async (search : string) => {
            if(search == ''){
              const startDate = currentYear + "-" + (currentMonth + 1) + "-" + "01";
              const endDate = currentYear + "-" + (currentMonth + 1) + "-" + daysInMonth;
                getData(page, startDate, endDate);
            }
            setLoading(true);
            const myHeaders = new Headers();
            myHeaders.append("Content-Type", "application/json");
            const requestOptions: RequestInit = {
                method: "GET",
                headers: myHeaders,
                redirect: "follow"
            };
            try {
                const response = await fetch(`${baseUrl}/search-booking-order/${search}`, requestOptions);
                
                if (!response.ok) {
                const errorResponse = await response.json();
                throw new Error(errorResponse.message);
                }
                const result = await response.json();
                setActiveTab("my schedule");
                setBooking(result.data);
                setMeta(result.meta);
                setLoading(false);
            } catch (error) {
                        setLoading(false);
                        // if (typeof error === "object" && error !== null && "message" in error && typeof error.message === "string") {
                        // toast.error(error.message);
                        // } else {
                        // toast.error('An unknown error occurred.');
                        // }
                
            }
            }

    const viewOrder = (id : string) => {
        setBookingOrder(booking.filter(item => item.id == id));
        setAuthAction(!authAction)
    }

    const handleDeleteClick = (id: string) => {
        setSelectedId(id);
        setShowPopup(true);
      };

      const handleDeleteConfirm = async (id: string | number) => {
                  setLoading(true);
                  const myHeaders = new Headers();
                  myHeaders.append("Content-Type", "application/json");
                  myHeaders.append("Authorization", token);
                  const requestOptions: RequestInit = {
                      method: "PATCH",
                      headers: myHeaders,
                      redirect: "follow"
                  };
                  try {
                      const response = await fetch(`${baseUrl}/cancel-booking-order/${id}`, requestOptions);      
                      if (!response.ok) {
                      const errorResponse = await response.json();
                      throw new Error(errorResponse.message);
                      }
                      const result = await response.json();
                      setSelectedId(null);
                      setLoading(false);
                      toast.error(result.message);
                      setBooking(booking.filter(item => item.id !== id));
                      setShowPopup(false);
                  } catch (error) {
                    setLoading(false);
                    if (typeof error === "object" && error !== null && "message" in error && typeof error.message === "string") {
                    toast.error(error.message);
                    } else {
                    toast.error('An unknown error occurred.');
                    }
                      
                  }
          
      };


      const handleDeleteAllConfirm = async () => {
                  setLoading(true);
                  const myHeaders = new Headers();
                  myHeaders.append("Content-Type", "application/json");
                  myHeaders.append("Authorization", token);
                  const requestOptions: RequestInit = {
                      method: "DELETE",
                      headers: myHeaders,
                      redirect: "follow"
                  };
                  try {
                      const response = await fetch(`${baseUrl}/cancel-booking-order`, requestOptions);    
                      if (!response.ok) {
                      const errorResponse = await response.json();
                      throw new Error(errorResponse.message);
                      }
                      const result = await response.json();   
                      // setProducts(result.data);
                      setLoading(false);
                      // setShowPopup(false);
                      // setSelectedId(null);
                      setLoading(false);
                      // getData(page);
                      
                      
                      toast.error("delete successfully");
                  } catch (error) {
                    setLoading(false);
                    if (typeof error === "object" && error !== null && "message" in error && typeof error.message === "string") {
                    toast.error(error.message);
                    } else {
                    toast.error('An unknown error occurred.');
                    }
                      
                  }
          
      };

    
  return (
    <div>

      <div className="scheduleHeader">

        <div className="created-con">
          <div className="create-schedule flex-center" onClick={() => scheduleToggle("create")}><LuPlus /><p>create schedule</p></div>

          <div className="schedule-title flex-center">
              <MdKeyboardArrowLeft  onClick={() => changeMonth(-1)}/>
              <p className="schedule-date">{new Date(currentYear, currentMonth).toLocaleString("default", { month: "long" })} {currentYear}</p>
              <MdKeyboardArrowRight  onClick={() => changeMonth(1)}/>
            </div>
          <div className="schedule-switch">
            <select value={scheduleFilter} onChange={(e) => setScheduleFilter(e.target.value)}>
              <option value="day">day</option>
              {/* <option value="week">week</option> */}
              <option value="month">month</option>
            </select>
          </div>
         </div>
        
        <div className="header-form-input">
           <input type="text" placeholder="Search" onChange={(e) => handleSearch(e.target.value)}/>
          <CiSearch />
        </div>

      </div>

      <div className="admin-shop-header schedule-shop-header">
                <div className="admin-header-list flex-center gap-10">
                    {headers.map((label) => (
                            <div
                            key={label}
                            className={`header-list ${activeTab === label ? 'header-list-active' : ''}`}
                            onClick={() => setActiveTab(label)}
                            >
                            {label}
                            </div>
                        ))}
                </div>
        </div>
      
     {
        activeTab == "bookings list" ? (
            <ScheduleList booking={booking} meta={meta} loading={loading} setPage={setPage} handleDeleteClick={handleDeleteClick} viewOrder={viewOrder}/>
        ) : activeTab == "bookings calendar" ? (
            <ScheduleByDay booking={booking} meta={meta} loading={loading} setPage={setPage}  dayOfMonth={dayOfMonth} setDayOfMonth={setDayOfMonth} weekDayName={weekDayName} scheduleFilter={scheduleFilter} setScheduleFilter={setScheduleFilter} daysInMonth={daysInMonth} currentMonth={currentMonth} currentYear={currentYear}  handleDeleteClick={handleDeleteClick} viewOrder={viewOrder}/>
        ) : (
           <MySchedule relBookingId={relBookingId} setRelBookingId={setRelBookingId} scheduleToggle={scheduleToggle} currentMonth={currentMonth} setCurrentMonth={setCurrentMonth} currentYear={currentYear} setCurrentYear={setCurrentYear} changeMonth={changeMonth}/>
        )
     }
      
       <BookingDetails  authAction={authAction} setAuthAction={setAuthAction} bookingOrder={bookingOrder}/>


       <CancelBooking
        isOpen={showPopup}
        itemId={selectedId ?? ""}
        loading={loading}
        onCancel={() => setShowPopup(false)}
        onDelete={handleDeleteConfirm}
        />
    </div>
  )
}

export default Schedule