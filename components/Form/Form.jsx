import React, { useState, useEffect } from "react";
import Head from "next/head";
import "react-calendar/dist/Calendar.css";
import Calendar from "react-calendar";
import Image from "next/image";
import categorias from "../../categorias/categorias.json";
import clientAxios from "../../config/clientAxios";

export default function Form({services}) {

  console.log(services)

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
  const [value, setValue] = useState(new Date());
  const [today] = useState(new Date());

  const [service, setService] = useState(null);
  const [date, setDate] = useState(null);
  const [horario, setHorario] = useState(null);
  const [nombre, setNombre] = useState("");
  const [numero, setnumero] = useState("");

  const handleClickDay = (e) => { 
    setDate(e);
  };

  function handleServiceClick(nombre) {
    setService(nombre);
  }

 

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    try {
      const response = await  clientAxios.post('/api/newShift', {
        service,
        nombre,
        horario,
        numero
      })
    }catch(error) {
      console.log(error)
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
          onSubmit={handleSubmit}
        >
          {!service ? (
            <label className="text-white" htmlFor="servicio">
              Selecciona el servicio
            </label>
          ) : (
            <>
              <label className="text-white" htmlFor="servicio">
                Seleccionaste el servicio de :{" "}
                <span className="font-bold">{service}</span>
              </label>
              <button
                className="bg-white px-2 py-2 text-black"
                onClick={() => {
                  setService(null);
                }}
              >
                Cambiar servicio
              </button>
            </>
          )}

          <div className="  md:grid md:grid-cols-3 md:gap-10  py-4">
            {!service &&
              services.map((e, i) => (
                <div
                  key={i}
                  className="mb-2 md:mb-0 relative hover:scale-110 hover:cursor-pointer transition-all ease-in-out"
                  onClick={() => handleServiceClick(e.name)}
                  data-service={e.name}
                >
                  <Image
                    className="brightness-50 w-[300px] h-[300px]"
                    src={e.img_service}
                    width={300}
                    height={300}
                    alt="categoria cejas"
                  />
                  <p className="absolute top-1/2 text-black text-xl left-1/2 transform -translate-x-1/2 -translate-y-1/2 bg-white px-4 py-2 ">
                    {e.name}
                  </p>
                </div>
              ))}
          </div>
          {service && (
            <div>
              <p className="text-center text-white">Selecciona una fecha</p>
              <Calendar
                className={"mb-3"}
                calendarType="US"
                locale="es"
                allowPartialRange={false}
                onClickDay={handleClickDay}
                onChange={(e) => {
                  setValue(e);
                }}
                value={value}
                selectRange={false}
                minDate={today}
              />

              <div>
                <p className="text-center text-white">Seleccione un horario</p>
                <div className="text-white font-bold grid grid-cols-3  place-content-center">

                  {arrayHorarios.map((horario,index) => {
                      return <div key={index} className="flex gap-2 justify-center">
                      <input
                        type="radio"
                        name="horario"
                        value={horario}
                        onClick={(e) => {
                          setHorario(e.target.value);
                        }}
                      />
                      <p>{horario}</p>
                    </div>
                  })}

                </div>
              </div>

              <div className="flex flex-col gap-2 mt-2 mb-3">
                {horario && (
                  <input
                    className="p-2  outline-none"
                    placeholder="Ingrese su nombre"
                    value={nombre}
                    onChange={(e) => setNombre(e.target.value)}
                  />
                )}
                {horario && (
                  <input
                  type="number"
                    className="p-2 outline-none "
                    placeholder="Ingrese su numero de contacto"
                    value={numero}
                    onChange={(e) => setnumero(e.target.value)}
                  />
                )}
              </div>

              {horario && service && nombre.length > 3 && numero.length > 9 && (
                <div className="flex justify-center">
                  <button type="submit" className=" bg-red-800 p-3 text-white">
                    Reserva tu turno
                  </button>
                </div>
              )}
            </div>
          )}
        </form>
      </div>
    </>
  );
};



