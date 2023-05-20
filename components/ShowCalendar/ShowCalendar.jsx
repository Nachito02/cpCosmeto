import React from 'react'
import Calendar from 'react-calendar';
import "react-calendar/dist/Calendar.css";

const ShowCalendar = ({setOpen,nameService,setname, setphone,phone,handleClickDay, value, setValue, today,arrayHorarios, name, selectCategory,horario,setHorario}) => {
  return (
    <div>
              <p className="text-center text-white">Selecciona una fecha para {nameService}</p>
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
                    placeholder="Ingrese su name"
                    value={name}
                    onChange={(e) => setname(e.target.value)}
                  />
                )}
                {horario && (
                  <input
                  type="number"
                    className="p-2 outline-none "
                    placeholder="Ingrese su phone de contacto"
                    value={phone}
                    onChange={(e) => setphone(e.target.value)}
                  />
                )}
              </div>

              {horario && selectCategory && name.length > 3 && phone.length > 9 && (
                <div className="flex justify-center">
                  <button type="button" className=" bg-red-800 p-3 text-white" onClick={() => setOpen(true)}>
                    Reserva tu turno
                  </button>
                </div>
              )}
            </div>
  )
}

export default ShowCalendar