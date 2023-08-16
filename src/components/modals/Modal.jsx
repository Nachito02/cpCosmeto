import React from "react";
import AgregarTurno from "./AgregarTurno";
import { IoMdClose } from "react-icons/io";

const Modal = ({ isOpen, onClick }) => {
  return (
    <div
      className={`
    
  justify-center items-center flex overflow-x-hidden overflow-y-auto fixed inset-0 z-50 outline-none focus:outline-none
  bg-neutral-800/70 
  ${isOpen ? "translate-y-0" : "translate-y-full"}
  ${isOpen ? "opacity-100" : "opacity-0"}
  `}
    >
      
      <AgregarTurno onClick={onClick} />
    </div>
  );
};

export default Modal;
