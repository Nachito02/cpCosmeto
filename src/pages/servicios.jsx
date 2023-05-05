import React from "react";
import Layout from "../../components/Layout/Layout";
import Image from "next/image";
import Head from "next/head";
const Servicios = () => {
  return (
    <Layout>
        <Head>
            <title>CP COSMETO - Servicios</title>
        </Head>
      <div className=" max-w-[800px] md:max-w-[1200px] mx-auto text-white mt-4  md:p-0">
        <h1 className="text-center font-bold text-4xl">Conoce los servicios</h1>

        <div className="md:flex items-center mt-2 gap-5 min-h-[100vh] ">
          <div className="md:flex flex-col items-center flex-[2] gap-2">
            <h1 className="font-bold text-lg  md:w-full text-center">
              Cosmetologia
            </h1>
            <p className="text-xl text-center md:text-left">
              La cosmetología es un servicio que se enfoca en la aplicación de
              tratamientos para mejorar el aspecto y la salud de la piel, el
              cabello y las uñas. Los profesionales de la cosmetología están
              capacitados para ofrecer una amplia variedad de servicios, desde
              tratamientos faciales y corporales, hasta manicuras y pedicuras,
              depilación y maquillaje. Además, los cosmetólogos también pueden
              brindar asesoramiento sobre cuidado personal, ayudando a sus
              clientes a identificar y abordar problemas específicos de la piel
              y el cabello. La cosmetología se ha convertido en un servicio muy
              popular en todo el mundo, ya que cada vez más personas buscan
              mejorar su apariencia y sentirse mejor consigo mismas. Con los
              avances tecnológicos y las innovaciones en la industria de la
              belleza, la cosmetología continúa evolucionando y ofreciendo
              nuevas opciones para satisfacer las necesidades de sus clientes.
            </p>
          </div>
          <div className="flex justify-center flex-[1]">
            <Image
            className="mb-5 mt-5 md:mb-0 mt:m-0"
              src={"/assets/categorias/cosmeto.jpg"}
              width={400}
              height={300}
            />
          </div>
        </div>

        <div className="flex flex-col-reverse md:flex-row items-center mt-2 gap-5 min-h-[100vh]">
          <div className="flex justify-center flex-[1]">
            <Image
            className="mb-5 mt-5 md:mb-0 mt:m-0"
              src={"/assets/categorias/lifting.jpg"}
              width={400}
              height={300}
            />
          </div>
          <div className="md:flex flex-col items-center flex-[2]  gap-2 ">
            <h1 className="font-bold text-lg  md:w-full text-center">
              Lifting de pestañas
            </h1>
            <p className="text-xl text-center md:text-left">
              El lifting de pestañas es un tratamiento de belleza que ayuda a
              realzar y darle un aspecto más despierto a los ojos. Se trata de
              un procedimiento que consiste en aplicar un producto químico suave
              en las pestañas para levantarlas desde la raíz y hacerlas más
              curvadas y definidas. Este procedimiento es una alternativa no
              invasiva y temporal a las extensiones de pestañas, ya que no se
              utilizan extensiones adicionales. El lifting de pestañas puede
              durar de cuatro a seis semanas, dependiendo del ciclo de
              crecimiento natural de las pestañas, y no requiere ningún cuidado
              especial después del tratamiento. Además, el lifting de pestañas
              es un tratamiento seguro y no causa daño a las pestañas naturales.
              En resumen, el lifting de pestañas es una excelente opción para
              aquellos que buscan un cambio temporal en su apariencia,
              resaltando la belleza natural de sus ojos y pestañas.
            </p>
          </div>
        </div>

        <div className="md:flex items-center mt-2 gap-5 min-h-[100vh]">
          <div className=" md:flex flex-col items-center flex-[2] gap-2">
            <h1 className="font-bold text-lg  md:w-full text-center">
              Cejas
            </h1>
            <p className="text-xl text-center md:text-left">
            El servicio de cejas es un tratamiento estético que se enfoca en dar forma y definición a las cejas para realzar su belleza natural y enmarcar los ojos. Este servicio puede incluir diferentes técnicas, como el depilado con cera, pinzas o hilo, el tintado para dar color y profundidad a las cejas, y el maquillaje para rellenar y dar forma. El objetivo es crear unas cejas simétricas y equilibradas que complementen el rostro y mejoren la expresión facial.
            </p>
          </div>
          <div className=" flex justify-center flex-[1]">
            <Image
            className="mb-5 mt-5 md:mb-0 mt:m-0"
              src={"/assets/categorias/cejas.jpg"}
              width={400}
              height={300}
            />
          </div>
        </div>

        <div className="flex flex-col-reverse md:flex-row items-center mt-2 gap-5 min-h-[100vh]">
          <div className=" flex justify-center flex-[1]">
            <Image
            className="mb-5 mt-5 md:mb-0 mt:m-0"
              src={"/assets/categorias/pedicuria.jpg"}
              width={400}
              height={300}
            />
          </div>
          <div className="md:flex flex-col items-center flex-[2]  gap-2 ">
            <h1 className="font-bold text-lg  md:w-full text-center">
             Pedicuria
            </h1>
            <p className="text-xl text-center md:text-left">
            La pedicura es un tratamiento de cuidado y embellecimiento de los pies. Este servicio se enfoca en eliminar la piel muerta y las callosidades, limpiar y suavizar las uñas, hidratar la piel y masajear los pies para mejorar la circulación y relajación muscular. Además, también puede incluir la aplicación de esmalte de uñas y/o decoraciones para embellecer las uñas y darles un aspecto más atractivo. La pedicura no solo tiene un efecto estético, sino que también ayuda a mantener los pies saludables, evita la acumulación de bacterias y previene problemas como las uñas encarnadas.
            </p>
          </div>
        </div>

        <div className="md:flex items-center mt-2 gap-5 min-h-[100vh] md:mb-0">
          <div className="md:flex flex-col items-center flex-[2] gap-2">
            <h1 className="font-bold text-lg  md:w-full text-center">
              Cosmetologia
            </h1>
            <p className="text-xl text-center md:text-left">
              La cosmetología es un servicio que se enfoca en la aplicación de
              tratamientos para mejorar el aspecto y la salud de la piel, el
              cabello y las uñas. Los profesionales de la cosmetología están
              capacitados para ofrecer una amplia variedad de servicios, desde
              tratamientos faciales y corporales, hasta manicuras y pedicuras,
              depilación y maquillaje. Además, los cosmetólogos también pueden
              brindar asesoramiento sobre cuidado personal, ayudando a sus
              clientes a identificar y abordar problemas específicos de la piel
              y el cabello. La cosmetología se ha convertido en un servicio muy
              popular en todo el mundo, ya que cada vez más personas buscan
              mejorar su apariencia y sentirse mejor consigo mismas. Con los
              avances tecnológicos y las innovaciones en la industria de la
              belleza, la cosmetología continúa evolucionando y ofreciendo
              nuevas opciones para satisfacer las necesidades de sus clientes.
            </p>
          </div>
          <div className=" flex justify-center flex-[1]">
            <Image
            className="mb-5 mt-5 md:mb-0 mt:m-0"
              src={"/assets/categorias/cosmeto.jpg"}
              width={400}
              height={300}
            />
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default Servicios;
