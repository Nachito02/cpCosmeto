import React, { useContext, useEffect, useState } from "react";
import addMonths from "date-fns/addMonths";
import Calendar from "react-calendar";
import "react-calendar/dist/Calendar.css";
import { useSession } from "next-auth/react";
import turnosContext from "@/context/Turnos/turnosContext";
import clientAxios from "../../../config/clientAxios";
import { ClipLoader } from "react-spinners";
const ShowCalendar = () => {

  const { data: session } = useSession();
  
  const [value, setValue] = useState("");
  const [today] = useState(new Date());

  const [selectHorario, setSelectHorario] = useState(null);

  const [horarios, setHorarios] = useState([]);
  const TurnosContext = useContext(turnosContext);

  const [loading, setLoading] = useState(false);
  const { turno } = TurnosContext;

  const handleClickDay = async (e) => {
    try {
      setLoading(true);
      const response = await clientAxios.get("/api/turno", {
        params: {
          date: value,
        },
      });
      setHorarios(response.data);
    } catch (error) {
      console.log(error);
    } finally {
      setLoading(false);
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

  const handleReservation = async () => {

    try {
      console.log(session)
      const response = await clientAxios.post("/api/turno", {
        emailClient : session.user.email,
        nameService : turno.service,
        date : value,
        hours : selectHorario,
        studio : turno.estudio
      });
      console.log(response)
    } catch (error) {
      console.log(error);
    } finally {
    }
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

      <div className="grid grid-cols-3 justify-center">
        {loading ? (
          <ClipLoader />
        ) : (
          horarios &&
          horarios.map((hora) => (
            <div key={hora._id} className="flex gap-2">
              <input
                name="horario"
                type="radio"
                onClick={() => setSelectHorario(hora._id)}
              />
              <p>{hora.horario}</p>
            </div>
          ))
        )}
      </div>

      {selectHorario && (
        <div className="flex justify-center my-2">
          <button
            onClick={handleReservation}
            className="text-white bg-pink-500 py-2 px-7 my-2"
          >
            Confirmar turno
          </button>
        </div>
      )}
    </div>
  );
};

export default ShowCalendar;
