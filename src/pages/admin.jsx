import React, { useState } from "react";
import clientAxios from "../../config/clientAxios";
import Calendar from "react-calendar";
import "react-calendar/dist/Calendar.css";
import { Button } from "@mui/material";
import { format } from "date-fns";
import Turnos from "@/components/Turnos";
import { getSession } from "next-auth/react";
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
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <>
      <div className="bg-pink-500 min-h-screen ">
        <h1 className="text-center text-xl text-white py-5 font-bold">
          Panel de administracíon
        </h1>
        <div className=" flex flex-col justify-center w-full text-center items-center gap-2">
          <div className="flex gap-20">
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

            <div className="flex flex-col gap-5">
              <Button
                className="w-21 h-21 bg-red-200 text-black"
                variant="contained"
                onClick={reset}
              >
                Mostrar todos los turnos
              </Button>
              <Button
                className="w-21 h-21 bg-red-200 text-black"
                variant="contained"
                onClick={reset}
              >
                Dia libre
              </Button>
              <Button
                className="w-21 h-21 bg-red-200 text-black"
                variant="contained"
                onClick={reset}
              >
                Hora libre
              </Button>
            </div>
          </div>
        </div>
        <h1 className="text-center text-2xl text-white my-10">
          Todos los turnos
        </h1>

        {/* <Table /> */}
        <Turnos turnos={turnos} />
      </div>
    </>
  );
};

export default Admin;

export async function getServerSideProps(context) {
  const session = await getSession(context);

  console.log(session);

  if (!session && session.user.email !== "arguellojuan08@gmail.com") {
    return {
      redirect: {
        destination: "/",
        permanent: false,
      },
    };
  }

  const shifts = await clientAxios.get("/api/getTurnos");
  return {
    props: {
      shifts: shifts.data,
    },
  };
}
