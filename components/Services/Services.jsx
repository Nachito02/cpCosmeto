import React from 'react'
import { useState } from 'react';
const Services = ({services,handleReservation}) => {

    const [expandedElement, setExpandedElement] = useState(null);

    const handleToggleDescription = (elementId) => {
      if (expandedElement === elementId) {
        setExpandedElement(null);
      } else {
        setExpandedElement(elementId);
      }
    };

  return (
    <div className=" w-full px-1 md:w-1/2 bg-white">
    <ul>
      {services.map((element) => (
        <div className="p-3" key={element._id}>
          <li className="flex justify-between items-center">
            <p
              className="hover:cursor-pointer w-1/2"
              onClick={() => handleToggleDescription(element._id)}
            >
              {element.name}
            </p>
            <span>Precio ${element.price}</span>
            <button type='button' className="bg-red-300 py-2 px-2" onClick={() => handleReservation(element)}>
              Reservar
            </button>
          </li>
          <div
            className={` description  bg-slate-200 `}
          >
            {element.description}
          </div>
        </div>
      ))}
    </ul>
  </div>
  )
}

export default Services