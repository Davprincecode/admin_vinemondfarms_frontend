import React, { useState } from "react";

type Availability = {
  date: string; // YYYY-MM-DD
  times: { time: string; booked: boolean }[];
};

interface BookingCalendarProps {
  data?: Availability[];
}

const BookingCalendarrs: React.FC<BookingCalendarProps> = ({ data = [] }) => {
  const today = new Date();
  const [currentMonth, setCurrentMonth] = useState(today.getMonth());
  const [currentYear, setCurrentYear] = useState(today.getFullYear());
  const [selectedDate, setSelectedDate] = useState<string | null>(null);

  const daysOfWeek = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];

  const getDaysInMonth = (month: number, year: number) => {
    return new Date(year, month + 1, 0).getDate();
  };

  const handlePrevMonth = () => {
    setCurrentMonth(prev => {
      if (prev === 0) {
        setCurrentYear(y => y - 1);
        return 11;
      }
      return prev - 1;
    });
  };

  const handleNextMonth = () => {
    setCurrentMonth(prev => {
      if (prev === 11) {
        setCurrentYear(y => y + 1);
        return 0;
      }
      return prev + 1;
    });
  };

  const isPastDate = (date: Date) => {
    return date < new Date(today.getFullYear(), today.getMonth(), today.getDate());
  };

  const renderCalendarDays = () => {
    const daysInMonth = getDaysInMonth(currentMonth, currentYear);
    const firstDayOfMonth = new Date(currentYear, currentMonth, 1).getDay();

    let days: JSX.Element[] = [];

    // Previous month's trailing days
    const prevMonthDays = firstDayOfMonth;
    const prevMonth = currentMonth === 0 ? 11 : currentMonth - 1;
    const prevYear = currentMonth === 0 ? currentYear - 1 : currentYear;
    const prevMonthTotalDays = getDaysInMonth(prevMonth, prevYear);

    for (let i = prevMonthTotalDays - prevMonthDays + 1; i <= prevMonthTotalDays; i++) {
      days.push(
        <div key={`prev-${i}`} className="calendar-day prev-month">
          {i}
        </div>
      );
    }

    // Current month days
    for (let day = 1; day <= daysInMonth; day++) {
      const dateObj = new Date(currentYear, currentMonth, day);
      const dateStr = dateObj.toISOString().split("T")[0];
      const dayData = data.find(d => d.date === dateStr);

      let className = "calendar-day";
      if (isPastDate(dateObj)) {
        className += " past-day";
      } else if (dayData) {
        const allBooked = dayData.times.every(t => t.booked);
        className += allBooked ? " full" : " available";
      }

      days.push(
        <div
          key={day}
          className={className}
          onClick={() => !isPastDate(dateObj) && setSelectedDate(dateStr)}
        >
          {day}
        </div>
      );
    }

    // Next month's leading days to fill row
    const totalCells = days.length;
    const remainingCells = 7 - (totalCells % 7);
    if (remainingCells < 7) {
      for (let i = 1; i <= remainingCells; i++) {
        days.push(
          <div key={`next-${i}`} className="calendar-day next-month">
            {i}
          </div>
        );
      }
    }

    return days;
  };

  const renderTimes = () => {
    if (!selectedDate) return null;
    const selectedData = data.find(d => d.date === selectedDate);
    if (!selectedData) return <p>No available times</p>;

    return (
      <div className="time-list">
        {selectedData.times.map((t, idx) => (
          <div
            key={idx}
            className={`time-slot ${t.booked ? "full" : "available"}`}
          >
            {t.time}
          </div>
        ))}
      </div>
    );
  };

  return (
    <div className="calendar-container">
      <div className="calendar-header">
        <button onClick={handlePrevMonth}>Prev</button>
        <h2>
          {new Date(currentYear, currentMonth).toLocaleString("default", {
            month: "long",
          })}{" "}
          {currentYear}
        </h2>
        <button onClick={handleNextMonth}>Next</button>
      </div>

      {/* Days of Week */}
      <div className="calendar-days-header">
        {daysOfWeek.map(day => (
          <div key={day} className="calendar-day-name">
            {day}
          </div>
        ))}
      </div>

      {/* Calendar grid */}
      <div className="calendar-grid">{renderCalendarDays()}</div>

      {selectedDate && (
        <div className="times-container">
          <h3>Available Times for {selectedDate}</h3>
          {renderTimes()}
        </div>
      )}
    </div>
  );
};

export default BookingCalendarrs;
