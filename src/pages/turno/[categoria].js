import React from "react";
import Layout from "@/components/Layout";
import Services from "@/components/Services";
import clientAxios from "../../../config/clientAxios";
import { useRouter } from "next/router";

import Head from "next/head";
const Turno = ({ services }) => {

  


  // console.log(services)
  const router = useRouter();
  const { categoria } = router.query;

  return (
    <>
      <Head>
        <title>{`CP COSMETO - ${categoria}`}</title>
      </Head>
      <Layout>
        <Services services={services} />
      </Layout>
    </>
  );
};

export default Turno;

export async function getServerSideProps(context) {
  try {
    const { query } = context;

    const services = await clientAxios.get("/api/getService", {
      params: { nombre: query.categoria },
    });

    return {
      props: {
        services: services.data,
      },
    };
  } catch (error) {
    // Manejo del error
    console.error("Error en getServerSideProps:", error);
    return {
      props: {
        services: [], // Puedes proporcionar un valor predeterminado o manejar el error de otra manera.
      },
    };
  }
}
