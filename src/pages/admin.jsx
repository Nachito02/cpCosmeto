import React, { useState } from "react";
import clientAxios from "../../config/clientAxios";
import Calendar from "react-calendar";
import "react-calendar/dist/Calendar.css";
import { Button } from "@mui/material";
import { format } from "date-fns";
import Turnos from "@/components/Turnos";
import Modal from "@/components/modals/Modal";
import { getSession } from "next-auth/react";
import useTurnoManual from "@/hooks/useTurnoManual";
import AgregarTurno from "@/components/modals/AgregarTurno";
import ReservarHorario from "@/components/modals/ReservarHorario";
const Admin = ({ shifts }) => {
  const [value, setValue] = useState(new Date());

  const [turnos, setTurnos] = useState(shifts);

  const [isOpen, setIsOpen] = useState(false);
  const [isOpenHorarioModal, setIsHorarioModal] = useState(false);

  const { manualTurnos } = useTurnoManual();

  const openModal = () => {
    setIsOpen(!isOpen);
  };

  const openModalHorario = () => {
    setIsHorarioModal(!isOpenHorarioModal);
  };

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
      <div className="bg-pink-500 min-h-screen  ">
        <h1 className="text-center text-xl text-white py-5 font-bold">
          Panel de administracíon
        </h1>
        <div className=" flex justify-center w-full text-center items-center gap-2">
          <div className="flex lg:flex-row flex-col lg:gap-20">
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
                onClick={openModalHorario}
              >
                Hora libre
              </Button>

              <Button
                className="w-21 h-21 bg-red-200 text-black"
                variant="contained"
                onClick={openModal}
              >
                Agregar turno
              </Button>
            </div>
          </div>
        </div>
        <h1 className="text-center text-2xl text-white my-5">
          Todos los turnos
        </h1>

        {/* <Table /> */}
        <Turnos turnos={turnos} />

        <h1 className="text-center text-2xl text-white my-5">
          Turnos Manuales
        </h1>
        <Turnos turnos={manualTurnos} />

        <Modal
          isOpen={isOpen}
          setIsOpen={setIsOpen}
          Children={<AgregarTurno onClick={openModal} />}
        />

        <Modal
          isOpen={isOpenHorarioModal}
          setIsOpen={setIsHorarioModal}
          Children={<ReservarHorario onClick={openModalHorario} />}
        />
      </div>
    </>
  );
};

export default Admin;

export async function getServerSideProps(context) {
  const session = await getSession(context);

  if (!session && session.user.email !== process.env.NEXT_PUCLIC_OWNER_EMAIL) {
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
