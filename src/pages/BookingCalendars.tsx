import React, { useState } from "react";
import { IoIosArrowBack, IoIosArrowForward } from "react-icons/io";


type Availability = {
  date: string;
  times: { time: string; status: "available" | "booked" }[];
};

const BookingCalendars: React.FC = () => {
  const today = new Date();
  const [currentMonth, setCurrentMonth] = useState(today.getMonth());
  const [currentYear, setCurrentYear] = useState(today.getFullYear());
  const [selectedDate, setSelectedDate] = useState<string | null>('2025-09-20');

  // Sample availability data (replace with API in future)
  const availability: Availability[] = [
    {
      date: `${today.getFullYear()}-${String(today.getMonth() + 1).padStart(2, "0")}-20`,
      times: [
        { time: "10:00 AM", status: "available" },
        { time: "12:00 PM", status: "booked" },
        { time: "02:00 PM", status: "available" }
      ]
    },
    {
      date: `${today.getFullYear()}-${String(today.getMonth() + 1).padStart(2, "0")}-25`,
      times: [
        { time: "09:00 AM", status: "booked" },
        { time: "11:00 AM", status: "booked" }
      ]
    }
  ];

  const daysInMonth = new Date(currentYear, currentMonth + 1, 0).getDate();

  const getStatusForDate = (dateStr: string) => {
    const dayData = availability.find(av => av.date === dateStr);
    if (!dayData) return null;
    const allBooked = dayData.times.every(t => t.status === "booked");
    return allBooked ? "full" : "available";
  };

  const handleDateClick = (date: string) => {
    const clickedDate = new Date(date);
    if (clickedDate < today) return; // prevent selecting past dates
    setSelectedDate(date);
  };

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
  };

  const changeYear = (delta: number) => {
    setCurrentYear(prev => prev + delta);
  };

  return (
  <div className="calendar-flex-con">

    <div className="calendar-container">

      <div className="calendar-header">
        {/* <button onClick={() => changeYear(-1)}>« Prev Year</button> */}

        <button onClick={() => changeMonth(-1)} className="prevMonth"><IoIosArrowBack /></button>
        <span className="date-title">
          {new Date(currentYear, currentMonth).toLocaleString("default", { month: "long" })} {currentYear}
        </span>
        <button onClick={() => changeMonth(1)} className="nextMonth"><IoIosArrowForward /></button>

        {/* <button onClick={() => changeYear(1)}>Next Year »</button> */}
      </div>

      
  <div className="calendar-weekdays">
    {['Mon', 'Tue', 'Wed', 'Thur', 'Fri', 'Sat', 'Sun'].map((day) => (
      <div key={day} className="weekday">
        {day}
      </div>
    ))}
  </div>


      <div className="calendar-grid">
        {[...Array(daysInMonth)].map((_, i) => {
          const day = i + 1;
          const dateStr = `${currentYear}-${String(currentMonth + 1).padStart(2, "0")}-${String(day).padStart(2, "0")}`;
          const status = getStatusForDate(dateStr);
          const dateObj = new Date(dateStr);
          const isPast = dateObj < new Date(today.getFullYear(), today.getMonth(), today.getDate());
          // const isToday = today.getDate();
          // ${isToday ? "today" : ""}

          return (
            <div
              key={day}
              className={`calendar-day ${status || ""} ${isPast ? "past" : ""} `}
              onClick={() => handleDateClick(dateStr)}
            >
              {day}
            </div>
          );
        })}
      </div>
    </div>

    <div className="calendar-time-container">
      {selectedDate && (

        <div className="times-section">

          {/* <h3>Times for {selectedDate}</h3> */}
          <h3>Available</h3>

          {availability.find(av => av.date === selectedDate)?.times.map((t, idx) => (
            <div key={idx} className={`time-slot ${t.status}`}>
              {t.time}
              <p>{t.status}</p>
            </div>
          )) || <p className="notAvailable">Not available</p>}

        </div>


      )}
    </div>
  
  </div>
  );
};

export default BookingCalendars;
