import React, { useContext, useEffect, useState } from "react";
import turnosContext from "@/context/Turnos/turnosContext";
import { useRouter } from "next/router";
import clientAxios from "../../config/clientAxios";
import { ClipLoader } from "react-spinners";
import Image from "next/image";
import SelectEstudio from "./SelectEstudio";
const SelectProfessional = () => {
  const router = useRouter();

  const TurnoContext = useContext(turnosContext);

  const [isLoading, setIsLoading] = useState();
  const [professionals, setProfessionals] = useState();

  const { turno, selectProfessional } = TurnoContext;

  const { categoria } = router.query;

  useEffect(() => {
    const getProfessional = async () => {
      try {
        setIsLoading(true);
        const response = await clientAxios.get("/api/getProfessional", {
          params: { categoria: categoria },
        });

        setProfessionals(response.data);
        //console.log(response);
      } catch (error) {
        console.error(error);
      } finally {
        setIsLoading(false);
      }
    };

    getProfessional();
  }, []);

  return (
    <div className="my-5 w-full px-1 md:w-1/2 md:mx-auto bg-white">
      <div className="bg-white flex flex-col items-center gap-2 p-2">
        {!turno.professional && (
          <p className="text-center">Selecciona el profesional</p>
        )}

        {isLoading ? (
          <ClipLoader />
        ) : professionals && !turno.professional ? (
          professionals.map((professional) => (
            <div
              onClick={() =>
                selectProfessional({
                  id: professional._id,
                  nombre: professional.nombre,
                })
              }
              key={professional._id}
              className="flex items-center gap-2 hover:cursor-pointer"
            >
              <Image
                src={professional.foto_perfil}
                width={100}
                height={100}
                alt={professional.nombre}
              />
              <p>{`${professional.nombre} ${professional.apellido}`}</p>
            </div>
          ))
        ) : (
          <SelectEstudio />
        )}
      </div>
    </div>
  );
};

export default SelectProfessional;
