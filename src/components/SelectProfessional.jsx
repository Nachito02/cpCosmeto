import React, { useContext, useEffect, useState } from "react";
import turnosContext from "@/context/Turnos/turnosContext";
import { useRouter } from "next/router";
import clientAxios from "../../config/clientAxios";
import { ClipLoader } from "react-spinners";
import Image from "next/image";
const SelectProfessional = () => {
  const router = useRouter();

  const TurnoContext = useContext(turnosContext);

  const [isLoading, setIsLoading] = useState()
  const [profesionals,setProfesionals] = useState()

  const { turno, clearService} = TurnoContext;

  const { categoria } = router.query;

  useEffect(() => {
    const getProfessional = async () => {
      try {
        setIsLoading(true)
        const response = await clientAxios.get("/api/getProfessional", {
          params: {categoria:categoria},
        });
  
        setProfesionals(response.data)
        console.log(response);
      } catch (error) {
        console.error(error);
      }finally{
        setIsLoading(false)
      }

    };
  
    getProfessional();

    
  }, []);

  return (
    <div className="bg-white flex flex-col items-center gap-2 p-2">
      <p>{`Selecciona el profesional para el servicio de : ${turno?.service}`}</p>


      {isLoading && (
        <ClipLoader />
      )}
      {profesionals && (
        profesionals.map((profesional) => (

            <div key={profesional._id} className="flex items-center gap-2">
              <Image src={profesional.foto_perfil} width={100} height={100} alt={profesional.nombre} />
              <p>{`${profesional.nombre} ${profesional.apellido}`}</p>
            </div>
        ))
      )} 
    </div>
  );
};

export default SelectProfessional;
