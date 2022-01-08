import React, { FC, useState } from 'react'
import Calendar from 'react-calendar';
import 'react-calendar/dist/Calendar.css';

interface CalendarChoosePanelProps {
  setDate(date: Date): void; 
  date: Date;
}

const CalendarPanel: FC<CalendarChoosePanelProps> = (props) => {
  const { date, setDate } = props

  return (
    <div>
       <Calendar
          onChange={setDate}
          value={date}
      />
    </div>
  )
}

export default CalendarPanel
