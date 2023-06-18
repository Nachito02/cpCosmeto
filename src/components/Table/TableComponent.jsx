import React, { useState } from "react";
import { TableHead, Table, TableRow, TableCell } from "@mui/material";

const TableComponent = () => {
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

  const [año, setAño] = useState(new Date().getFullYear());
  const [mes, setMes] = useState(new Date().getMonth());

  const generarDiasMes = (año, mes) => {
    const diasEnMes = new Date(año, mes + 1, 0).getDate();
    const dias = [];

    for (let i = 1; i <= diasEnMes; i++) {
      dias.push(i);
    }

    return dias;
  };

  const cambiarMes = (nuevoMes) => {
    setMes(nuevoMes);
  };

  const cambiarAño = (nuevoAño) => {
    setAño(nuevoAño);
  };

  const diasDelMes = generarDiasMes(año, mes);

  return (
    <div className="max-w-screen">
      <div>
        <button onClick={() => cambiarMes(mes - 1)}>Mes anterior</button>
        <span>
          {mes + 1}/{año}
        </span>
        <button onClick={() => cambiarMes(mes + 1)}>Mes siguiente</button>
      </div>
      <div style={{ maxWidth: "800px" }}>

      <Table style={{ maxWidth: "100%" }} >
        <TableHead>
          <TableRow>
            <TableCell>Horarios</TableCell>
            {diasDelMes.map((dia) => (
              <TableCell key={dia}>{dia}</TableCell>
            ))}
          </TableRow>
        </TableHead>
        <tbody>
          {arrayHorarios.map((horario) => (
            <TableRow key={horario}>
              <TableCell>{horario}</TableCell>
              {diasDelMes.map((dia) => (
                <TableCell key={dia}>Contenido</TableCell>
              ))}
            </TableRow>
          ))}
        </tbody>
      </Table>
      </div>

    </div>
  );
};

export default TableComponent;
