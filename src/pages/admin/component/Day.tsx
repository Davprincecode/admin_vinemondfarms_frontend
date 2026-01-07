import React from 'react';
import { FaBell } from 'react-icons/fa';
import { RxCross2 } from 'react-icons/rx';

interface scheduleIntern {
  dayOfMonth: string;
  weekDayName: string;
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
    }); // e.g. "1 AM", "2 PM"
    return { value: `${i.toString().padStart(2, '0')}:00`, label };
  });
};

const Day = ({
  dayOfMonth,
  weekDayName,
  currentMonth,
  currentYear,
  booking,
  handleDeleteClick,
  viewOrder,
}: scheduleIntern) => {
  const newMonth = currentMonth + 1;
  const currentDate = `${currentYear}-${String(newMonth).padStart(2, '0')}-${String(dayOfMonth).padStart(2, '0')}`;
  const currentBooking = booking.filter(item => item.bookingDate === currentDate);

  const bookingsByHour = generateHourlySlots().map(({ value, label }) => {
    const matchingBookings = currentBooking.filter(booking => {
      const bookingHour = new Date(`1970-01-01T${convertTo24Hour(booking.bookingStartTime)}`).getHours();
      return bookingHour === parseInt(value);
    });

    return {
      label,
      bookings: matchingBookings,
    };
  });

  return (
    <div className="daily-schedule">
      <div className="scheduled-wrapper">
        <div className="scheduled-header flex-center justification-between">
          <div className="scheduled-date">
            <p>{weekDayName}</p>
            <h2>{dayOfMonth}</h2>
          </div>

          {/* <div className="scheduled-cancelled flex-center justification-center gap-10">
            <p>Cancelled all for today</p>
            <RxCross2 className="delete" />
          </div> */}

        </div>

        <div className="scheduled-body">
          <div className="scheduled-date-time">
            {bookingsByHour.map(({ label, bookings }) => (
              <div className="scheduled-booked-con" key={label}>
                <div className="scheduled-booked-details-wrap flex">
                  <p>{label}</p>

                  {bookings.length > 0 ? (
                    bookings.map((booking, index) => (
                      <div className="schedule-border" key={index}>
                        <div
                          className={`scheduled-booked-details flex-center justification-between ${
                            index % 2 === 0 ? 'even' : 'odd'
                          }`}
                        >
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
                    <div className="schedule-border">
                      <div className="scheduled-booked-details empty">No bookings</div>
                    </div>
                  )}
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Day;
