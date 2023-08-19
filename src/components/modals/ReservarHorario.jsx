import React, { useState, useEffect } from "react";
import Calendar from "react-calendar";
import { IoMdClose } from "react-icons/io";
import clientAxios from "../../../config/clientAxios";
import { ClipLoader } from "react-spinners";
const ReservarHorario = ({ onClick }) => {
  const [value, setValue] = useState("");
  const [loading, setLoading] = useState(false);
  const [horarios, setHorarios] = useState([]);

  const fetchHorarios = async (e) => {
    setLoading(true);
    try {
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
  };

  useEffect(() => {
    if (value !== "") {
      fetchHorarios();
    }
  }, [value]);

  const handleClickDay = (e) => {
    setValue(e);
  };
  return (
    <div className="w-3/6 mt-20 bg-white">
      <div className="flex items-end p-6 rounded-t justify-end relative border-b-[1px]">
        <button onClick={onClick}>
          <IoMdClose />
        </button>
      </div>
      <form action="">
        <div className="text-center">
          <h2 className="text-lg">Reservar un horario</h2>
        </div>
        <div className="flex items-center flex-col gap-2 justify-center p-6">
          <Calendar
            calendarType="US"
            locale="es"
            onClickDay={(e) => handleClickDay(e)}
          />
        </div>
        <div className="grid grid-cols-3 items-center justify-center">
          {loading ? (
            <ClipLoader />
          ) : (
            horarios &&
            horarios.map((hora) => (
              <div key={hora._id} className="flex mr-5">
                <input
                  required
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
            ))
          )}
        </div>
      </form>
    </div>
  );
};

export default ReservarHorario;
