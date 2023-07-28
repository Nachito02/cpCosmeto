import React from "react";
import clientAxios from "../../../config/clientAxios";
import { useSession } from "next-auth/react";
import format from "date-fns/format";
const ConfirmTurno = ({ turno }) => {

    
    console.log(turno);
  const { data: session } = useSession();

    console.log(session);
  return (
    <div className="">
      <p className="text-center text-white text-xl my-5">Hola {session?.user.name}</p>
                <p className="text-center text-white text-xl my-5">Tu turno esta {turno.estado}</p>

      <div className="bg-white w-1/2 mx-auto">
        <div className="p-2">
            <p>Estudio: {turno.estudio}</p>
            <p>Profesional: {turno.id_profesional.nombre}</p>
            <p>Fecha: {format(new Date(turno.fecha), "dd/MM/yy")}</p>
            <p>Servicio: {turno.id_servicio.nombre}</p>
            
        </div>
      </div>
    </div>
  );
};

export default ConfirmTurno;

export async function getServerSideProps(context) {
  const { idTurno } = context.query;

  try {
    const turno = await clientAxios.get("/api/getTurno", {
      params: { idTurno },
    });

    return {
      props: {
        turno: turno.data,
      },
    };
  } catch (error) {
    console.log(error.message);
  }

  return {
    props: {
      turno: null,
    },
  };
}
