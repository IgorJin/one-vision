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
        <h2 className="header__title">Выберите дату</h2>

       <Calendar
          onChange={setDate}
          value={date}
      />
    </div>
  )
}

export default CalendarPanel
