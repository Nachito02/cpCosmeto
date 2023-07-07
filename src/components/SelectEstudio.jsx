import React, { useContext, useEffect, useState } from "react";
import clientAxios from "../../config/clientAxios";
import Image from "next/image";
import turnosContext from "@/context/Turnos/turnosContext";
import ShowCalendar from "./ShowCalendar/ShowCalendar";
import { ClipLoader } from "react-spinners";
const SelectEstudio = () => {
  const [estudios, setEstudios] = useState();
  const [isLoading, setIsLoading] = useState();

  const TurnosContext = useContext(turnosContext)

  const {selectEstudio, turno} = TurnosContext
  useEffect(() => {
    const getStudios = async () => {
      try {
        setIsLoading(true);
        const response = await clientAxios.get("/api/getEstudios");

        setEstudios(response.data);
        //console.log(estudios);
      } catch (error) {
        console.log(error);
      } finally {
        setIsLoading(false);
      }
    };
    getStudios();
  }, []);


  return (
    <div>
      {!turno.estudio &&
       <p className="text-center">Selecciona tu estudio</p>}
     
      {isLoading && <ClipLoader />}

        {!isLoading && !estudios && (
          <p>No hay estudios disponibles</p>
        )} 

      {estudios && !turno.estudio && (
        <div className="flex flex-col gap-5">
          {estudios.map((estudio) => (
            <div
            onClick={() => { selectEstudio(estudio.nombre) }}
              key={estudio._id}
              className="flex items-center gap-2 hover:cursor-pointer"
            >
              <Image
                className="rounded-full"
                src={estudio.foto}
                width={100}
                height={100}
                alt={estudio.nombre}
              />
              <div>
                <p>{`${estudio.nombre} `}</p>
                <p>{`${estudio.direccion} `}</p>
              </div>
            </div>
          ))}
        </div>
      )}

            {turno.estudio && turno.professional && turno.service && (
              <ShowCalendar />
            )}
    </div>
  );
};

export default SelectEstudio;
