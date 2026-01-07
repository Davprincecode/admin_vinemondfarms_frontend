import React, { Dispatch, SetStateAction, useState } from 'react'
import { FaRegCalendarDays } from 'react-icons/fa6'
import { TiWorld } from 'react-icons/ti'
import { FaCalendarAlt } from 'react-icons/fa'
import { CiClock1 } from 'react-icons/ci'
import { NavLink } from 'react-router-dom'
import BookingCalendars from './BookingCalendars'
import ConsultantDetails from './ConsultantDetails'
import { toast } from 'react-toastify'
import { userAuth } from '../../context/AuthContext'
import DeletePopup from './DeletePopUp'


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

type dataProp = {
  relBookingId : string, 
  setRelBookingId: Dispatch<SetStateAction<string>>;
  scheduleToggle : (data : string) => void;
  currentMonth: number;
  setCurrentMonth: Dispatch<SetStateAction<number>>;
  currentYear: number;
  setCurrentYear: Dispatch<SetStateAction<number>>;
  changeMonth: (data: number) => void;
}

function MySchedule({relBookingId, setRelBookingId, scheduleToggle, currentMonth, setCurrentMonth,  currentYear, setCurrentYear, changeMonth} : dataProp) {
  
    const [schedule, setSchedule] = useState<boolean>(false);
    const [bookTime, SetBookTime] = useState<TimeSlot[]>([]);
    const [bookingDescription, setBookingDescription] = useState<string>('');
    const [interval, setInterval] = useState<string>('');
    const {baseUrl, token} = userAuth();
    const [showPopup, setShowPopup] = useState(false);
    const [selectedId, setSelectedId] = useState<string | null>(null);
    const [loading, setLoading] = useState<boolean>(false);

    const scheduleFunction = () => {
      setSchedule(!schedule)
    }

    const errorFunction = () => {
      toast.error("Select Time");
    }
    const onCancel = () =>{
      setShowPopup(false)
       location.reload();
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
                  method: "DELETE",
                  headers: myHeaders,
                  redirect: "follow"
              };
              try {
                  const response = await fetch(`${baseUrl}/booking/${id}`, requestOptions);    
                  if (!response.ok) {
                  const errorResponse = await response.json();
                  throw new Error(errorResponse.message);
                  }
                  const result = await response.json();   
                  setLoading(false);
                  setShowPopup(false);
                  setSelectedId(null);
                  setLoading(false);     
                  toast.error("delete successfully");
                  location.reload();
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

    <div className='consultant-con-wrapper pageNav'>


      <div className="consultant-con">
        {
          schedule ? (
              <ConsultantDetails bookTime={bookTime} scheduleFunction={scheduleFunction}/>
          ) : (
          <div className="consultant">

              <div className="consultant-detail">
                  <div className="consultant-icon"><FaCalendarAlt /></div>

                  <p className='schedule-name'>Scheduled</p>

                  <h2 className='consultant-name'>Consultations</h2>

                  <div className="clock flex-center"><CiClock1 /> <h2>{interval}</h2></div>
                  
                  <div className="consultant-bod">
                        {bookingDescription}
                    </div>
              </div>

                <div className="consultant-calendar">
                 
                       <BookingCalendars bookTime={bookTime} SetBookTime={SetBookTime} setBookingDescription={setBookingDescription} setInterval={setInterval} relBookingId={relBookingId} setRelBookingId={setRelBookingId} currentMonth={currentMonth} setCurrentMonth={setCurrentMonth} currentYear={currentYear} setCurrentYear={setCurrentYear} changeMonth={changeMonth}/>
                    
                    {
                      relBookingId && (
                        <div className="nextBtn gap-10">
                             <div className="edit-bck" onClick={() => scheduleToggle("edit")}>edit</div>
                             <div className="delete-bck"  onClick={() => handleDeleteClick(relBookingId)}>delete</div>
                       </div>
                      )
                    }
                    
                    
                    
                  


                </div>


            </div>
                    )}
      </div>
    

    <DeletePopup
        isOpen={showPopup}
        itemId={selectedId ?? ""}
        onCancel={onCancel}
        onDelete={handleDeleteConfirm}
    />

    </div>
  )
}

export default MySchedule