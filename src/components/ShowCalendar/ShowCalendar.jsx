import React, { useContext, useState } from "react";
import addMonths from "date-fns/addMonths";
import Calendar from "react-calendar";
import "react-calendar/dist/Calendar.css";

import turnosContext from "@/context/Turnos/turnosContext";
const ShowCalendar = () => {
  const [value, setValue] = useState("");
  const [today] = useState(new Date());

  const TurnosContext = useContext(turnosContext);

  const { turno } = TurnosContext;

  console.log(turno.estudio);
  const handleClickDay = (e) => {
    setValue(e);
  };
  const maxDate = addMonths(today, 4);


  const tileDisabled = ({ date }) => {
    // Verificar el estudio actual y deshabilitar los días no correspondientes
    if (turno.estudio === "@colomba.ok") {
      return ![1, 3, 5, 6].includes(date.getDay());
    } else if (turno.estudio === "@solsilmanstudio") {
      return ![2, 4, 6].includes(date.getDay());
    }
    return false;
  };

  return (
    <div className="my-calendar">
      <Calendar
        maxDate={maxDate}
        className={"mb-3 "}
        calendarType="US"
        locale="es"
        onClickDay={handleClickDay}
        selectRange={false}
        minDate={today}
        tileDisabled={tileDisabled}
      />
    </div>
  );
};

export default ShowCalendar;
