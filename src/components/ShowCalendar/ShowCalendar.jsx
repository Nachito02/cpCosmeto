import React, { useContext, useEffect, useState } from "react";
import addMonths from "date-fns/addMonths";
import Calendar from "react-calendar";
import "react-calendar/dist/Calendar.css";
import { useSession } from "next-auth/react";
import turnosContext from "@/context/Turnos/turnosContext";
import clientAxios from "../../../config/clientAxios";
import { ClipLoader } from "react-spinners";
import { useRouter } from "next/router";
import {
  Dialog,
  DialogTitle,
  DialogContentText,
  DialogContent,
  DialogActions,
  Button,
} from "@mui/material";

const ShowCalendar = () => {
  const { data: session } = useSession();

  const router = useRouter();

  const [open, setOpen] = useState(false);
  const [value, setValue] = useState("");
  const [today] = useState(new Date());
  const [number, setNumber] = useState("");
  const [error, setError] = useState(false);
  const [selectHorario, setSelectHorario] = useState(null);
  const [inputHorario, setInputHorario] = useState(null);

  const [horarios, setHorarios] = useState([]);
  const TurnosContext = useContext(turnosContext);

  const [loading, setLoading] = useState(false);
  const { turno } = TurnosContext;

  const handleClose = () => {
    setOpen(false);
  };

  const fetchHorarios = async () => {
    try {
      setLoading(true);
      const response = await clientAxios.get("/api/turno", {
        params: {
          date: value,
        },
      });
      setHorarios(response.data);
      setLoading(false);
    } catch (error) {
      console.log(error);
      setLoading(false);
    }
  };

  useEffect(() => {
    if (value !== "") {
      fetchHorarios();
    }
  }, [value]);

  const handleClickDay = async (e) => {
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

  const handleNumber = async (e) => {
    setNumber(e);
    if (number.length < 6) {
      setError("Por favor ingrese un numero valido");
    } else {
      setError(false);
    }
  };

  const handleReservation = async () => {
    if (number === "") setError("Por favor ingrese un numero válido");

    if (error) return;

    try {
      const response = await clientAxios.post("/api/turno", {
        emailClient: session.user.email,
        nameService: turno.service,
        date: value,
        hours: selectHorario,
        studio: turno.estudio,
        professional : turno.professional.id
      });

      router.push(`/confirm/${response.data}`);
    } catch (error) {
      console.log(error);
    } finally {
    }
  };

  return (
    <div className="my-calendar">
      <p className="text-center my-3">Seleccione fecha y horario</p>
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

      <div className="flex justify-center flex-col items-center ">
        <p className="my-2">Horarios disponibles</p>
        {loading ? (
          <ClipLoader />
        ) : (
          horarios.length && (
            <div className="grid grid-cols-3  justify-center">
              {horarios.map((hora) => (
                <div key={hora._id} className="flex mr-5">
                  <input
                    id={hora._id}
                    name="horario"
                    type="radio"
                    onClick={() => {
                      setSelectHorario(hora._id);
                      setInputHorario(hora.horario);
                    }}
                  />
                  <label htmlFor={hora._id}>{hora.horario}</label>
                </div>
              ))}
            </div>
          )
        )}
      </div>

      {selectHorario && (
        <div className="flex justify-center flex-col my-4">
          <div className="flex gap-2 justify-center flex-col">
            <label htmlFor="numero">Numero de contacto</label>
            <input
              value={number}
              type="text"
              onChange={(e) => handleNumber(e.target.value)}
              className="border-sky-600 border-2"
            />
            {error && <p>{error}</p>}
          </div>

          <button
            onClick={() => setOpen(true)}
            className="text-white bg-pink-500 py-2 px-7 my-2"
          >
            Confirmar turno
          </button>
        </div>
      )}

      <Dialog
        open={open}
        onClose={handleClose}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
      >
        <DialogTitle id="alert-dialog-title">
          {"¿Desea confirmar el turno?"}
        </DialogTitle>
        <DialogContent>
          <DialogContentText id="alert-dialog-description">
            <p>Nombre : {session.user.name}</p>
            <p>Servicio : {turno.service}</p>
            <p>Profesional : {turno.professional.nombre}</p>
            <p>Horario : {inputHorario}</p>
            <p>Estudio : {turno.estudio}</p>
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose}>Cancelar</Button>
          <Button
            onClick={(e) => {
              handleReservation();
            }}
            type="submit"
            autoFocus
          >
            Confirmar
          </Button>
        </DialogActions>
      </Dialog>
    </div>
  );
};

export default ShowCalendar;
