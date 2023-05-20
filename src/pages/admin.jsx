import React from "react";
import clientAxios from "../../config/clientAxios";
import Calendar from "react-calendar";
const Admin = ({ shifts }) => {

  console.log(shifts);

    const filter = () => {

    }

  return (
    <div className="bg-pink-300 min-h-screen ">
      <h1>Panel de administracíon</h1>
        <div className=" flex justify-center w-full text-center">
        <Calendar
        className="bg-red-200 "
        calendarType="US"
        locale="es"
        onClickDay={(e) => console.log(e.toISOString().split('T')[0])}
      />
        </div>
      {shifts.map((e) => (
        <div>
            <p>{e.name}</p>  
        <p>{e.date.split('T')[0]}</p>
        <p>{e.hour}</p>
        </div>
        
      ))}
    </div>
  );
};

export default Admin;

export async function getServerSideProps() {
  const response = await clientAxios.get("/api/getShifts");
  return {
    props: {
      shifts: response.data,
    },
  };
}
