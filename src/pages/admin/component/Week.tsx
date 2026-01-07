import React, { useState } from 'react';
import { FaBell } from 'react-icons/fa';
import { RxCross2 } from 'react-icons/rx';

interface scheduleIntern {
  currentMonth: number;
  currentYear: number;
  booking: BookingInterface[];
  viewOrder: (id: string) => void;
  handleDeleteClick: (id: string) => void;
}

interface BookingInterface {
  bookingDate: string;
  bookingDateFormat: string;
  bookingEndTime: string;
  bookingId: string;
  bookingStartTime: string;
  customerId: string;
  customerName: string;
  customerEmail: string;
  customerPhoneNumber: string;
  customerOrderNote: string;
  id: string;
  orderDate: string;
  orderStatus: string;
  paymentMethod: string;
  timeLeft: string;
  total: number;
}

const convertTo24Hour = (time: string): string => {
  const [hour, minutePart] = time.split(':');
  const [minute, period] = minutePart.split(' ');
  let hr = parseInt(hour);
  if (period === 'PM' && hr !== 12) hr += 12;
  if (period === 'AM' && hr === 12) hr = 0;
  return `${hr.toString().padStart(2, '0')}:${minute}`;
};

const generateHourlySlots = () => {
  return Array.from({ length: 24 }, (_, i) => {
    const date = new Date(1970, 0, 1, i);
    const label = date.toLocaleTimeString('en-US', {
      hour: 'numeric',
      hour12: true,
    });
    return { value: `${i.toString().padStart(2, '0')}:00`, label };
  });
};

const getWeekDates = (year: number, month: number, baseDay: number) => {
  const baseDate = new Date(year, month, baseDay);
  const startOfWeek = new Date(baseDate);
  startOfWeek.setDate(baseDate.getDate() - baseDate.getDay()); // Sunday

  return Array.from({ length: 7 }, (_, i) => {
    const date = new Date(startOfWeek);
    date.setDate(startOfWeek.getDate() + i);
    return {
      dayOfMonth: date.getDate().toString().padStart(2, '0'),
      weekDayName: date.toLocaleDateString('en-US', { weekday: 'short' }),
      fullDate: `${date.getFullYear()}-${String(date.getMonth() + 1).padStart(2, '0')}-${date
        .getDate()
        .toString()
        .padStart(2, '0')}`,
    };
  });
};

const Week = ({ currentMonth, currentYear, booking, handleDeleteClick, viewOrder }: scheduleIntern) => {
  const today = new Date();
  const newMonth = currentMonth + 1;
  const isCurrentMonth = newMonth === today.getMonth() && currentYear === today.getFullYear();
  const [weekOffset, setWeekOffset] = useState(0);

  const baseDay = isCurrentMonth ? today.getDate() + weekOffset * 7 : 1 + weekOffset * 7;
  const weekDates = getWeekDates(currentYear, newMonth, baseDay);
  const hourlySlots = generateHourlySlots();

  return (
    <div className="weekly-schedule">
      {/* Navigation */}
      <div className="week-nav flex-center justification-between">
        <button onClick={() => setWeekOffset(weekOffset - 1)}>← Prev Week</button>
        <div className="week-header-grid">
          <div className="time-column-header">Time</div>
          {weekDates.map(({ weekDayName, dayOfMonth }) => (
            <div key={weekDayName} className="day-header">
              <p>{weekDayName}</p>
              <h4>{dayOfMonth}</h4>
            </div>
          ))}
        </div>
        <button onClick={() => setWeekOffset(weekOffset + 1)}>Next Week →</button>
      </div>

      {/* Calendar Grid */}
      <div className="calendar-grid">
        {/* Time column */}
        <div className="time-column">
          {hourlySlots.map(({ label }) => (
            <div key={label} className="time-slot">{label}</div>
          ))}
        </div>

        {/* Booking columns */}
        {weekDates.map(({ fullDate }) => {
          const currentBooking = booking.filter(item => item.bookingDate === fullDate);

          return (
            <div key={fullDate} className="day-column">
              {hourlySlots.map(({ value }, hourIndex) => {
                const hourBookings = currentBooking.filter(booking => {
                  const bookingHour = new Date(`1970-01-01T${convertTo24Hour(booking.bookingStartTime)}`).getHours();
                  return bookingHour === parseInt(value);
                });

                return (
                  <div key={value} className="booking-cell">
                    {hourBookings.length > 0 ? (
                      hourBookings.map((booking, index) => (
                        <div key={index} className={`schedule-border-weekly ${index % 2 === 0 ? 'even' : 'odd'}`}>
                          <div className="scheduled-booked-details flex-center justification-between">
                            <div className="scheduled-start">
                              <FaBell />
                              <p>{booking.customerName}</p>
                            </div>
                            <div className="scheduled-end flex-center justification-center">
                              <p>{booking.timeLeft}</p>
                              <RxCross2 className="delete" onClick={() => handleDeleteClick(booking.id)} />
                            </div>
                          </div>
                        </div>
                      ))
                    ) : (
                      <div className="schedule-border empty"></div>
                    )}
                  </div>
                );
              })}
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default Week;
