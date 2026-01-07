import React, { Dispatch, SetStateAction } from 'react'
import { FaBell } from 'react-icons/fa';
import { GoDotFill } from 'react-icons/go';
import { LuDot } from 'react-icons/lu';
import { RxCross2 } from 'react-icons/rx';


interface scheduleIntern {
    booking : BookingInterface[];
    daysInMonth : number;
    setDayOfMonth : Dispatch<SetStateAction<string>>;
    setScheduleFilter : Dispatch<SetStateAction<string>>;
    currentMonth : number;
    currentYear : number;
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


const Month =  ({booking, daysInMonth, setDayOfMonth, setScheduleFilter, currentMonth, currentYear} : scheduleIntern) => {

    const today = new Date();
    const firstDayOfMonth = new Date(currentYear, currentMonth, 1).getDay(); 

    const offset = firstDayOfMonth === 0 ? 6 : firstDayOfMonth ; 

    const setUserDate = (data : string) => {
        setDayOfMonth(data);
        setScheduleFilter("day");
    }
     
  return (
    <div className='monthly-schedule'>

       <div className="scheduled-wrapper">
      

            <div className="scheduled-body ">
               

        <div className="calendar-grid">

          {[...Array(offset)].map((_, i) => (
            <div key={`empty-${i}`} className="calendar-day empty"></div>
          ))}

         {[...Array(daysInMonth)].map((_, i) => {
            const day = i + 1;
            const dateStr = `${currentYear}-${String(currentMonth + 1).padStart(2, "0")}-${String(day).padStart(2, "0")}`;
            const dateObj = new Date(dateStr);

            const isPast = dateObj < new Date(today.getFullYear(), today.getMonth(), today.getDate());

            // Filter bookings for this day
            const data = booking.filter(item => item.bookingDate === dateStr);
            const topTwo = data.slice(0, 2);
            const remainingCount = data.length - topTwo.length;

                return (
                    <div
                    key={day}
                    className="calendar-day"
                    >
                    <div className="calendar-day-date">{String(day).padStart(2, '0')}</div>

                    {data.length > 0 && (
                        <div className="calendar-userDetails">
                        {topTwo.map((item, index) => (
                            <div key={index} className="calendar-user flex-center gap-5">
                            <GoDotFill className="calendar-dot" />
                            <div className="calendar-name">{item.customerName}</div>
                            </div>
                        ))}
                        {remainingCount > 0 && (
                            <div className="calendar-more" onClick={() => setUserDate(String(day).padStart(2, '0'))}>+{remainingCount} More</div>
                        )}
                        </div>
                    )}
                    </div>
                );
        })}

        </div>

            </div>

        </div>

    </div>
  )
}

export default Month