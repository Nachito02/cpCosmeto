import React, { use, useEffect, useState } from "react";
import clientAxios from "../../../config/clientAxios";
import { useSession } from "next-auth/react";
import format from "date-fns/format";
import dynamic from "next/dynamic";
import { ClipLoader } from "react-spinners";

const ConfirmTurno = ({ turno, paymentId }) => {
  const initMercadoPago = () =>
    import("@mercadopago/sdk-react").then((mod) =>
      mod.initMercadoPago(process.env.NEXT_PUBLIC_MP_PUBLIC_KEY, {
        locale: "es-AR",
      })
    );

  const [loading, setLoading] = useState(false);

  const [preferenceId, setPreferenceId] = useState("");

  const Payment = dynamic(
    () => import("@mercadopago/sdk-react").then((mod) => mod.Payment),
    {
      ssr: false, // Establece ssr en false para evitar problemas con el renderizado del lado del servidor
    }
  );

  const StatusScreen = dynamic(
    () => import("@mercadopago/sdk-react").then((mod) => mod.StatusScreen),
    {
      ssr: false, // Establece ssr en false para evitar problemas con el renderizado del lado del servidor
    }
  );

  const Wallet = dynamic(
    () => import("@mercadopago/sdk-react").then((mod) => mod.Wallet),
    {
      ssr: false, // Establece ssr en false para evitar problemas con el renderizado del lado del servidor
    }
  );

  const getPreference = async () => {
    try {
      setLoading(true);
      const response = await clientAxios.get("/api/mercadopago", {
        params: {
          id: turno._id,
          precio: turno.id_servicio.precio / 2,
          nombre: turno.id_servicio.nombre,
        },
      });

      setPreferenceId(response.data);
    } catch (error) {
      console.log(error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    initMercadoPago();
    getPreference();

    return;
  }, []);

  const { data: session } = useSession();

  return (
    <div className="">
      <p className="text-center text-white text-xl my-5">
        Hola {session?.user.name}
      </p>
      <p className="text-center text-white text-xl my-5">
        Tu turno esta {turno.estado}
      </p>
      <div className="bg-white">
        <div className="p-2 ">
          <p>Estudio: {turno.estudio}</p>
          <p>
            Profesional: {turno.id_profesional.nombre}
            {turno.id_profesional.apellido}
          </p>
          <p>Fecha: {format(new Date(turno.fecha), "dd/MM/yy")}</p>
          <p>Servicio: {turno.id_servicio.nombre}</p>
          <p>Precio: $ {turno.id_servicio.precio}</p>
        </div>

        <div className="max-w-1/2">
          {loading ? (
            <ClipLoader />
          ) : (
            <div className="w-2/3">
              <Wallet initialization={{ preferenceId }} />
            </div>
          )}
        </div>
        <StatusScreen initialization={{ paymentId: Number(paymentId) }} />
      </div>
    </div>
  );
};

export default ConfirmTurno;

export async function getServerSideProps(context) {
  const { idTurno, paymentId } = context.query;

  try {
    const turno = await clientAxios.get("/api/getTurno", {
      params: { idTurno },
    });

    if (paymentId) {
      return {
        props: {
          turno: turno.data,
          paymentId: paymentId,
        },
      };
    }

    return {
      props: {
        turno: turno.data,
      },
    };
  } catch (error) {
    console.log(error.message);
  }

  return {
    props: {
      turno: null,
    },
  };
}
