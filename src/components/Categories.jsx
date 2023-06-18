import React from "react";
import Image from "next/image";
import { useRouter } from "next/router";
const Categories = ({ categories, handleCategoryClick }) => {
  const router = useRouter();
  return (
    <>
      <h1 className="text-center text-white text-xl mt-2">Reserva tu turno</h1>
      <div className="grid  md:grid-cols-2 lg:grid-cols-3 place-items-center max-w-[120rem] mx-auto gap-5 my-5">
        {categories.map((category, i) => (
          <div
            key={i}
            className="relative top-0 hover:cursor-pointer hover:scale-105 trasition ease-in duration-200"
            onClick={() => router.push(`/turno/${category.nombre}`)}
          >
            <Image
              className="brightness-50 w-[300px] h-[300px]"
              src={category.imagen}
              width={300}
              height={300}
              alt="categoria cejas"
            />
            <div className="absolute text-center flex justify-center w-full top-1/2 ">
              <p className="bg-white p-2">{category.nombre}</p>
            </div>
          </div>
        ))}
      </div>
    </>
  );
};

export default Categories;
