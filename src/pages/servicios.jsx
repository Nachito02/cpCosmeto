import React from "react";
import Layout from '@/components/Layout';

import Image from "next/image";
import Head from "next/head";
import clientAxios from "../../config/clientAxios";

const Servicios = ({ categories }) => {
  return (
    <>
      <Head>
        <title>{`CP COSMETO - Servicios`}</title>
      </Head>
    <Layout>
    
      <div className="max-w-[800px] md:max-w-[1200px] mx-auto text-white mt-4 md:p-0">
        <h1 className="text-center font-bold text-4xl mb-8">Conoce los servicios</h1>

        {categories.map((category, i) => (
          <div
            key={i}
            className={`md:flex items-center mt-8 gap-5 min-h-[50vh] border-t border-white pt-8 ${
              i % 2 === 0 ? "flex-row-reverse" : ""
            }`}
          >
            <div className="flex justify-center flex-[1]">
              <Image
                className="mb-5 mt-5 md:mb-0 md:mt-0 h-full w-full"
                src={category.imagen}
                width={400}
                height={300}
                alt="Imagen de servicio"
              />
            </div>
            <div className="md:flex flex-col items-center flex-[2] gap-2">
              <h1 className="font-bold text-lg md:w-full text-center">{category.nombre}</h1>
              <p className="text-xl text-center md:text-left">{category.descripcion}</p>
            </div>
          </div>
        ))}
      </div>
    </Layout>
    </>
  );
};

export default Servicios;

export async function getServerSideProps() {
  
  try {
    const response = await clientAxios.get("/api/getCategories");
    return {
      props: {
        categories: response.data,
      },
    };
  } catch (error) {
    return {
      props: {
        categories:[]
      },
    };
  }
}
