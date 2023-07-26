import React, { useContext, useEffect, useState } from "react";
import addMonths from "date-fns/addMonths";
import Calendar from "react-calendar";
import "react-calendar/dist/Calendar.css";

import turnosContext from "@/context/Turnos/turnosContext";
import clientAxios from "../../../config/clientAxios";
const ShowCalendar = () => {
  const [value, setValue] = useState("");
  const [today] = useState(new Date());

  const [horarios, setHorarios] = useState([]);
  const TurnosContext = useContext(turnosContext);

  const { turno } = TurnosContext;

  const handleClickDay = async (e) => {
    try {
      const response = await clientAxios.get("/api/turno");

      setHorarios(response.data);
    } catch (error) {
      console.log(error);
    }
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

      {console.log(horarios)}

      <div className="grid grid-cols-3 justify-center">
        {horarios &&
          horarios.map((hora) => (
            <div className="flex gap-2">
              <input type="radio" />
              <p>{hora.horario}</p>
            </div>
          ))}
      </div>
    </div>
  );
};

export default ShowCalendar;
