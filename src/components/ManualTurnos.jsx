import React from 'react'

const ManualTurnos = ({turnos}) => {
    return (
        <div className="grid  md:grid-cols-3 lg:grid-cols-4 items-center gap-2 my-10 p-3">
          {turnos.length ? (
            turnos.map((turno) => (
              <div
                className={` text-black font-bold p-3 text-center  ${statusColor(
                  turno.estado
                )} hover:cursor-pointer`}
                key={turno._id}
              >
                <p>
                  Cliente: {turno.id_cliente.nombre} {turno.id_cliente.apellido}
                </p>
                <p>Fecha: {format(new Date(turno.fecha), "dd/MM/yyyy")}</p>
                <p>Horario: {turno.horario.horario}</p>
                <p>Estado: {turno.estado}</p>
                <p>Servicio: {turno.id_servicio.nombre}</p>
              </div>
            ))
          ) : (
            <p>No hay turnos en el dia</p>
          )}
        </div>
      );
  
}

export default ManualTurnos