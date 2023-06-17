import React, { useState } from "react";
import Head from "next/head";
import clientAxios from "../../config/clientAxios";
import ClipLoader from "react-spinners/ClipLoader";
import Services from "../Services";
import Categories from "../Categories";
import ShowCalendar from "../ShowCalendar/ShowCalendar";
import {
  Dialog,
  DialogTitle,
  DialogContentText,
  DialogContent,
  DialogActions,
  Button,
} from "@mui/material";
export default function Form({ categories }) {
  const [value, setValue] = useState(new Date());
  const [today] = useState(new Date());
  const [loading, setLoading] = useState(false);
  const [selectCategory, setSelectCategory] = useState(null);
  const [date, setDate] = useState(null);
  const [horario, setHorario] = useState(null);
  const [name, setname] = useState("");
  const [phone, setphone] = useState("");
  const [services, setServices] = useState([]);
  const [showInput, setShowInput] = useState(false);
  const [nameService, setNameService] = useState(null);
  const [price, setPrice] = useState(null);
  const [idService,setIdService] = useState(null)
  const [open, setOpen] = useState(false);



  const handleReservation = (event) => {
    setNameService(event.name);
    setIdService(event._id)
    setPrice(event.price);
    setShowInput(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const arrayHorarios = [
    "9:00",
    "10:00",
    "11:00",
    "12:00",
    "13:00",
    "14:00",
    "15:00",
    "16:00",
    "17:00",
    "18:00",
  ];

  const handleClickDay = (e) => {
    setDate(e);
  };

  async function handleCategoryClick(element) {
    setSelectCategory(element.name);

    if (element) {
      setLoading(true);

      try {
        const response = await clientAxios.post("/api/getService", {
          categoryID: element._id,
        });
       // console.log(response);
        setServices(response.data);
      } catch (error) {
        console.log(error);
      }

      setLoading(false);
    }
  }

  const handleReset = () => {
    setSelectCategory(null);
    setServices([]);
    setShowInput(false);
    setname("");
    setphone("");
    setHorario("");
    setPrice("");
    setNameService("");
    setValue(new Date());
    setIdService(null)
  };

  const handleSubmit = async () => {
    console.table({
      nameService,
      name,
      horario,
      phone,
      price,
    });
    try {
      const response = await clientAxios.post("/api/newShift", {
        price,
        idService,
        name,
        horario,
        phone,
        value
      });
     // console.log(response);
    } catch (error) {
      console.log(error);
    }
  };
  return (
    <>
      <Head>
        <title>CP COSMETO - RESERVA TU TURNO</title>
      </Head>
      <div className="mt-2 py-3">
        <h1 className="text-center text-xl text-white">Reserva tu turno</h1>
        <form
          className="flex flex-col items-center gap-2"
          onSubmit={(e) => (e.preventDefault())}
        >
          {!selectCategory ? (
            <label className="text-white" htmlFor="servicio">
              Selecciona el servicio
            </label>
          ) : (
            <>
              <label className="text-white" htmlFor="servicio">
                Seleccionaste el servicio de :
                <span className="font-bold"> {selectCategory}</span>
              </label>
              <button
                className="bg-white px-2 py-2 text-black"
                onClick={handleReset}
              >
                Cambiar servicio
              </button>
            </>
          )}

          <div className="  md:grid md:grid-cols-3 md:gap-10  py-4">
            {!selectCategory && (
              <Categories
                categories={categories}
                handleCategoryClick={handleCategoryClick}
              />
            )}
          </div>

          {loading ? (
            <ClipLoader />
          ) : services.length > 1 && !showInput ? (
            <div className="px-2 md:px-0 w-full flex justify-center">
              <Services
                handleReservation={handleReservation}
                services={services}
              />
            </div>
          ) : (
            services.length == 0 &&
            selectCategory && <p>No hay servicios actualmente</p>
          )}

          {showInput && (
            <>
              <ShowCalendar
                handleClickDay={handleClickDay}
                today={today}
                value={value}
                setValue={setValue}
                arrayHorarios={arrayHorarios}
                selectCategory={selectCategory}
                name={name}
                horario={horario}
                setHorario={setHorario}
                phone={phone}
                setname={setname}
                setphone={setphone}
                nameService={nameService}
                setOpen={setOpen}
              />
            </>
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
                <p>name : {name}</p>
                <p>Categoria : {selectCategory}</p>

                <p>Servicio : {nameService}</p>
                <p>Fecha : {value.toLocaleDateString()}</p>
                <p>Precio : ${price}</p>
                <p>phone de telefono : {phone}</p>
              </DialogContentText>
            </DialogContent>
            <DialogActions>
              <Button onClick={handleClose}>Cancelar</Button>
              <Button onClick={(e) => {handleClose(); handleSubmit(e)}} type="submit" autoFocus>
                Confirmar
              </Button>
            </DialogActions>
          </Dialog>
        </form>
      </div>
    </>
  );
}
