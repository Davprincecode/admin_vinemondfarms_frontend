import React, { useMemo, useState } from "react";

export type Availability = {
  date: string;
  times: string[];
};

export type BookingCalendarProps = {
  data?: Availability[]; // made optional to avoid crash
  onSelect?: (payload: { date: string; time: string }) => void;
  weekStartsOn?: 0 | 1;
};

const fmt = new Intl.DateTimeFormat(undefined, { month: "long", year: "numeric" });
function pad(n: number) { return n.toString().padStart(2, "0"); }
function toKey(date: Date): string { return `${date.getFullYear()}-${pad(date.getMonth() + 1)}-${pad(date.getDate())}`; }
function daysInMonth(year: number, monthIndex: number) { return new Date(year, monthIndex + 1, 0).getDate(); }
function startOfMonth(date: Date) { return new Date(date.getFullYear(), date.getMonth(), 1); }
function addMonths(date: Date, delta: number) { return new Date(date.getFullYear(), date.getMonth() + delta, 1); }
function shiftToWeekStart(dayIndex: number, weekStartsOn: 0 | 1) { if (weekStartsOn === 1) return dayIndex === 0 ? 6 : dayIndex - 1; return dayIndex; }
const WEEKDAY_LABELS = (weekStartsOn: 0 | 1) => weekStartsOn === 1 ? ["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"] : ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];

export default function BookingCalendar({ data = [], onSelect, weekStartsOn = 0 }: BookingCalendarProps) {
  const [viewDate, setViewDate] = useState<Date>(() => startOfMonth(new Date()));
  const [selectedDate, setSelectedDate] = useState<string | null>(null);
  const [selectedTime, setSelectedTime] = useState<string | null>(null);

  const availabilityMap = useMemo(() => {
    const m = new Map<string, string[]>();
    for (const d of data) m.set(d.date, d.times);
    return m;
  }, [data]);

  const grid = useMemo(() => {
    const year = viewDate.getFullYear();
    const month = viewDate.getMonth();
    const first = startOfMonth(viewDate);
    const firstDay = shiftToWeekStart(first.getDay(), weekStartsOn);
    const daysCurr = daysInMonth(year, month);
    const prevMonth = new Date(year, month - 1, 1);
    const daysPrev = daysInMonth(prevMonth.getFullYear(), prevMonth.getMonth());

    const cells: { date: Date; inMonth: boolean }[] = [];
    for (let i = firstDay - 1; i >= 0; i--) cells.push({ date: new Date(year, month - 1, daysPrev - i), inMonth: false });
    for (let d = 1; d <= daysCurr; d++) cells.push({ date: new Date(year, month, d), inMonth: true });
    while (cells.length % 7 !== 0) {
      const nextIndex = cells.length - (firstDay + daysCurr) + 1;
      cells.push({ date: new Date(year, month + 1, nextIndex), inMonth: false });
    }
    while (cells.length < 42) {
      const last = cells[cells.length - 1].date;
      cells.push({ date: new Date(last.getFullYear(), last.getMonth(), last.getDate() + 1), inMonth: false });
    }
    return cells;
  }, [viewDate, weekStartsOn]);

  const weekdayLabels = WEEKDAY_LABELS(weekStartsOn);

  function handleDayClick(key: string, inMonth: boolean) {
    if (!inMonth) return;
    if (availabilityMap.has(key)) {
      setSelectedDate(key);
      setSelectedTime(null);
    }
  }
  function pickTime(t: string) {
    if (!selectedDate) return;
    setSelectedTime(t);
    onSelect?.({ date: selectedDate, time: t });
  }

  return (
    <div className="w-full max-w-4xl mx-auto p-4">
      <div className="flex items-center justify-between mb-4">
        <button onClick={() => setViewDate((d) => addMonths(d, -1))}>Prev</button>
        <div>{fmt.format(viewDate)}</div>
        <button onClick={() => setViewDate((d) => addMonths(d, 1))}>Next</button>
      </div>

      <div className="grid grid-cols-7 text-center font-semibold mb-2">
        {weekdayLabels.map((w) => <div key={w}>{w}</div>)}
      </div>

      <div className="grid grid-cols-7 gap-1">
        {grid.map(({ date, inMonth }) => {
          const key = toKey(date);
          const times = availabilityMap.get(key);
          const isFullyBooked = times && times.length === 0;
          const isAvailable = times && times.length > 0;
          let classes = "p-2 border rounded ";
          if (!inMonth) classes += "opacity-40";
          else if (isFullyBooked) classes += "bg-red-500 text-white";
          else if (isAvailable) classes += "bg-gray-300";

          return (
            <button key={key} onClick={() => handleDayClick(key, inMonth)} className={classes}>
              {date.getDate()}
            </button>
          );
        })}
      </div>

      <div className="mt-4">
        {selectedDate && availabilityMap.get(selectedDate) ? (
          availabilityMap.get(selectedDate)!.length > 0 ? (
            availabilityMap.get(selectedDate)!.map((t) => (
              <button key={t} onClick={() => pickTime(t)} className="m-1 p-2 border rounded">
                {t}
              </button>
            ))
          ) : (
            <div>This date is fully booked.</div>
          )
        ) : (
          <div>Select a date to see times</div>
        )}
      </div>
    </div>
  );
}
