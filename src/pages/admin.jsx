import React, { useState } from "react";
import clientAxios from "../../config/clientAxios";
import Calendar from "react-calendar";
import "react-calendar/dist/Calendar.css";
import { Button } from "@mui/material";
const Admin = ({ shifts }) => {
  const [value, setValue] = useState(new Date());

  const [turnos, setTurnos] = useState(shifts);

  const filter = (day) => {

    const filtered = shifts.filter(
      (e) => e.date.split("T")[0] == day.toISOString().split("T")[0]
    );

    if (filtered) {
      setTurnos(filtered);
    }
  };

  const reset = async () => {
    try {
      const response = await clientAxios.get("/api/getShifts");
      setTurnos(response.data)
    }catch(error) {

    }
  }

  return (
    <div className="bg-pink-300 min-h-screen ">
      <h1 className="text-center text-xl">Panel de administracíon</h1>
      <div className=" flex justify-center w-full text-center items-center gap-2">
        <Calendar
          className={"mb-3"}
          calendarType="US"
          locale="es"
          allowPartialRange={false}
          onChange={(e) => {
            setValue(e);
          }}
          value={value}
          selectRange={false}
          onClickDay={(e) => filter(e)}
        />

          <Button className="w-21 h-21" variant="contained" onClick={reset}> Mostrar todos los turnos</Button>
      </div>
      <h1 className="text-center">Todos los turnos</h1>

          {/* <Table /> */}
      <div className="flex gap-2">
        {turnos.length ? (
          turnos.map((e) => (
            <div className="bg-white p-3" key={e._id}>
              <p>Nombre:{e.name}</p>
              <p>Estado:{e.phone}</p>
              <p>Fecha:{e.date.split("T")[0]}</p>
              <p>Horario:{e.hour}</p>
              <p>Estado:{e.status}</p>
              <p>Servicio:{e.service.name}</p>
            </div>
          ))
        ) : (
          <p>No hay turnos en el dia</p>
        )}
      </div>
    </div>
  );
};

export default Admin;

export async function getServerSideProps() {
  const response = await clientAxios.get("/api/getShifts");
  return {
    props: {
      shifts: response.data,
    },
  };
}
