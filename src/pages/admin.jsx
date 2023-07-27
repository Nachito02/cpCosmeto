import React, { useState } from "react";
import clientAxios from "../../config/clientAxios";
import Calendar from "react-calendar";
import "react-calendar/dist/Calendar.css";
import { Button } from "@mui/material";
import { format } from "date-fns";
import Nav from "@/components/Nav";
const Admin = ({ shifts }) => {
  const [value, setValue] = useState(new Date());

  const [turnos, setTurnos] = useState(shifts);

  const filter = (day) => {
    const filtered = shifts.filter(
      (e) =>
        format(new Date(e.fecha), "dd/MM/yyyy") ==
        format(new Date(day), "dd/MM/yyyy")
    );

    if (filtered) {
      setTurnos(filtered);
    }
  };
  const reset = async () => {
    try {
      const response = await clientAxios.get("/api/getTurnos");
      setTurnos(response.data);
    } catch (error) {}
  };

  return (
    <>
      <Nav />
      <div className="bg-pink-500 min-h-screen ">
        <h1 className="text-center text-xl text-white py-5 font-bold">
          Panel de administracíon
        </h1>
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

          <Button className="w-21 h-21" variant="contained" onClick={reset}>
            Mostrar todos los turnos
          </Button>
        </div>
        <h1 className="text-center">Todos los turnos</h1>

        {/* <Table /> */}
        <div className="flex gap-2">
          {turnos.length ? (
            turnos.map((turno) => (
              <div className="bg-white p-3" key={turno._id}>
                <p>
                  Cliente:{turno.id_cliente.nombre} {turno.id_cliente.apellido}
                </p>
                <p>Fecha:{format(new Date(turno.fecha), "dd/MM/yyyy")}</p>
                <p>Horario:{turno.horario.horario}</p>
                <p>Estado:{turno.estado}</p>
                <p>Servicio:{turno.id_servicio.nombre}</p>
              </div>
            ))
          ) : (
            <p>No hay turnos en el dia</p>
          )}
        </div>
      </div>
    </>
  );
};

export default Admin;

export async function getServerSideProps() {
  const shifts = await clientAxios.get("/api/getTurnos");
  return {
    props: {
      shifts: shifts.data,
    },
  };
}
