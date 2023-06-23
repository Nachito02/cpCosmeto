import React,{useState} from "react";
import addMonths from "date-fns/addMonths";
import Calendar from "react-calendar";
import "react-calendar/dist/Calendar.css";

const ShowCalendar = () => {
  const [value, setValue] = useState(new Date());
  const [today] = useState(new Date());
  const handleClickDay = (e) => {
   
  };
  const maxDate = addMonths(today, 3)
  return (
    <div>
      
      <Calendar
        maxDate={maxDate}
        className={"mb-3"}
        calendarType="US"
        locale="es"
        onClickDay={handleClickDay}
        onChange={(e) => {
          setValue(e);
        }}
        value={value}
        selectRange={false}
        minDate={today}
   
      />
    </div>
  );
};

export default ShowCalendar;
