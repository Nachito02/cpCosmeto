import { useRouter } from "next/router";
import React, { useEffect } from "react";
import Swal from "sweetalert2";
import { useContext } from "react";
import turnosContext from "@/context/Turnos/turnosContext";
import { signIn, useSession } from "next-auth/react";
import SelectProfessional from "./SelectProfessional";
const Services = ({ services }) => {
  const TurnosContext = useContext(turnosContext);

  const { selectService, turno } = TurnosContext;

  const router = useRouter();
  const { categoria } = router.query;
  const { data: session } = useSession();

  const handleReservation = (service) => {
    if (!session) {
      Swal.fire({
        icon: "error",
        title: "Oops...",
        text: "Debes iniciar session para reservar un turno",
        confirmButtonText: "Iniciar Session",
        confirmButtonColor: "#fca5a5",
      }).then((result) => {
        if (result.isConfirmed) {
          signIn("google");
        }
      });
      return
    }

   
    selectService(service);
    console.log(turno)
  };
  if (services.length === 0) {
    return (
      <div>
        <h1 className="text-center my-6 text-white">Sin coincidencias</h1>;
      </div>
    );
  }

  return (
    <div className="min-h-screen">
      <h1 className="text-center my-6 text-white">
        Selecciona el servicio para {categoria}
      </h1>

      {!turno.service && (
        <div className="my-5 w-full px-1 md:w-1/2 md:mx-auto bg-white">
          <ul>
            {services.map((element) => (
              <div className="p-3" key={element._id}>
                <li className="flex justify-around items-center bg-sky-200 border border-black-500">
                  <p
                    className="hover:cursor-pointer w-1/2"
                    onClick={() => handleToggleDescription(element._id)}
                  >
                    {element.nombre}
                  </p>
                  <span>Precio ${element.precio}</span>
                  <button
                    type="button"
                    className="bg-red-300 py-2 px-2 my-2"
                    onClick={() => {
                      handleReservation(element.nombre);
                    }}
                  >
                    Reservar
                  </button>
                </li>
                <div className={`description bg-slate-200`}>
                  <p className="p-2">{element.descripcion}</p>
                </div>
              </div>
            ))}
          </ul>
        </div>
      )}

      {turno.service && <SelectProfessional />}
    </div>
  );
};

export default Services;
