import React, { Dispatch, SetStateAction, useEffect, useState } from 'react'
import { FaBell } from 'react-icons/fa'
import { IoCheckmarkCircle } from 'react-icons/io5'
import { MdDelete } from 'react-icons/md'
import { RxCross1, RxCross2 } from 'react-icons/rx'
import { userAuth } from '../../context/AuthContext'
import { toast } from 'react-toastify'
import AdminPagination from './AdminPagination'
import Week from './Week'
import Month from './Month'
import Day from './Day'


interface scheduleIntern {
  booking : BookingInterface[];
    meta : Meta | null;
    loading : boolean;
    setPage : Dispatch<SetStateAction<number>>;
    dayOfMonth : string;
    setDayOfMonth : Dispatch<SetStateAction<string>>;
    weekDayName : string;
    scheduleFilter : string;
     setScheduleFilter : Dispatch<SetStateAction<string>>;
    daysInMonth : number;
    currentMonth : number;
    currentYear : number;
     viewOrder : (id : string) => void;
  handleDeleteClick : (id : string) => void;
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

const ScheduleByDay = ({booking, meta, loading, setPage,  dayOfMonth, setDayOfMonth, weekDayName, scheduleFilter, setScheduleFilter, daysInMonth, currentMonth, currentYear, handleDeleteClick, viewOrder} : scheduleIntern) => {
  
 

  return (
    <div className='scheduled-container'>
       {
        // scheduleFilter == "week" ? (
        //   <Week currentMonth={currentMonth} currentYear={currentYear} booking={booking}  handleDeleteClick={handleDeleteClick} viewOrder={viewOrder}/>
        // ) : 
        scheduleFilter == "month" ? (
           <Month booking={booking} daysInMonth={daysInMonth} setDayOfMonth={setDayOfMonth} setScheduleFilter={setScheduleFilter} currentMonth={currentMonth} currentYear={currentYear}/>
        ) : (
            <Day dayOfMonth={dayOfMonth} weekDayName={weekDayName} currentMonth={currentMonth} currentYear={currentYear} booking={booking}  handleDeleteClick={handleDeleteClick} viewOrder={viewOrder}/>
        )
       }
     
        
    </div>
  )
}

export default ScheduleByDay