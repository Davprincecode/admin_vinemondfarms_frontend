import React from 'react'
import BookingCalendar, { Availability } from './BookingCalendar';
import BookingCalendars from './BookingCalendars';

type BookingSlot = {
  date: string; // YYYY-MM-DD format
  time: string;
  isFull: boolean;
};

function Booking() {

    const sampleData : Availability[] = [
  { date: "2025-08-17", times: ["09:00", "10:30", "13:00", "16:00"] },
  { date: "2025-08-18", times: [] }, // fully booked
  { date: "2025-08-19", times: ["11:00"] },
  { date: "2025-08-22", times: ["09:30", "14:00", "15:30"] },
];

    const data : BookingSlot[] = [
  { date: "2025-08-17", time: "09:00", isFull: true},
  { date: "2025-08-18", time: "" , isFull: false},
  { date: "2025-08-19", time: "11:00" , isFull: true},
  { date: "2025-08-22", time: "09:30", isFull: true},
];


  return (
    <div className='book'>
      
         
      
      
               {/* <BookingCalendar
                      data={sampleData}
                      weekStartsOn={1}
                      onSelect={({ date, time }) => {
                          console.log("Selected:", date, time);
                      }}/> */}




                      <BookingCalendars/>
                   
    </div>
  )
}

export default Booking