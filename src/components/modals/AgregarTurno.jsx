import React, { useEffect, useState } from "react";
import Calendar from "react-calendar";
import { IoMdClose } from "react-icons/io";
import useCategoria from "@/hooks/useCategoria";
import clientAxios from "../../../config/clientAxios";
import { ClipLoader } from "react-spinners";
import useEstudios from "@/hooks/useEstudios";

const AgregarTurno = ({ onClick }) => {
  const { categorias } = useCategoria();
  const { estudios } = useEstudios();
  const [horarios, setHorarios] = useState([]);
  const [value, setValue] = useState("");
  const [selectHorario, setSelectHorario] = useState(null);
  const [inputHorario, setInputHorario] = useState(null);
  const [loading, setLoading] = useState(false);
  const [open, setOpen] = useState(false);

  const [categoria, setCategoria] = useState("");
  const [nombre, setNombre] = useState("");

  const openModal = () => {
    setOpen(!open);
  };

  const handleReservation = async () => {
    try {
      const turno = await clientAxios.post("/AddManualTurno", {});
    } catch (error) {}
  };

  const handleClickDay = (e) => {
    setValue(e);
  };

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

  return (
    <div className="w-3/6 bg-white">
      <div className="flex items-end p-6 rounded-t justify-end relative border-b-[1px]">
        <button onClick={onClick}>
          <IoMdClose />
        </button>
      </div>
      <div className="text-center">
        <h2 className="text-lg">Agrega un turno manualmente</h2>
      </div>
      <div className="flex items-center flex-col gap-2 justify-center p-6">
        <div className="flex flex-col items-center">
          <label htmlFor="nombre">Nombre del cliente</label>
          <input
            type="text"
            id="nombre"
            value={nombre}
            className="border-2"
            onChange={(e) => setNombre(e.value)}
          />
        </div>

        <div className="flex flex-col items-center gap-2">
          <label htmlFor="">Seleccione el servicio</label>
          <select
            className="text-center"
            onChange={(e) => {
              setCategoria(e.target.value);
            }}
          >
            <option value="">selecione una opcion</option>
            {categorias.map((categoria) => (
              <option key={categoria.id} value={categoria.id}>
                {categoria.nombre}
              </option>
            ))}
          </select>
        </div>

        <Calendar
          calendarType="US"
          locale="es"
          onClickDay={(e) => handleClickDay(e)}
        />

        <div>
          <div className="grid grid-cols-3 items-center justify-center">
            {loading ? (
              <ClipLoader />
            ) : (
              horarios &&
              horarios.map((hora) => (
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
              ))
            )}
          </div>
          <div className="flex flex-col items-center">
            <label htmlFor="estado">Seleccione el estado del turno</label>
            <select name="estado" id="">
              <option value="pendiente">Pendiente</option>
              <option value="confirmado">Confirmado</option>
              <option value="confirmado">Completado</option>
              <option value="confirmado">Cancelado</option>
            </select>
          </div>

          <div className="flex flex-col">
            <select name="" id="">
              <option value="">Seleccione una opcion</option>
              {estudios.length &&
                estudios.map((estudio) => (
                  <option key={estudio.id}>{estudio.nombre}</option>
                ))}
            </select>
          </div>
        </div>

        <button
          className="text-white bg-pink-500 py-2 px-7 my-2"
          onClick={handleReservation}
        >
          Reservar turno
        </button>
      </div>
    </div>
  );
};

export default AgregarTurno;
