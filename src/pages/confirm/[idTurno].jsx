import React, { use, useEffect, useState } from "react";
import clientAxios from "../../../config/clientAxios";
import { useSession } from "next-auth/react";
import format from "date-fns/format";
import dynamic from "next/dynamic";
import { ClipLoader } from "react-spinners";
import { BsWhatsapp } from "react-icons/bs";
import { BiSolidHandLeft } from "react-icons/bi";
const ConfirmTurno = ({ turno, paymentId }) => {
  const { data: session } = useSession();
  const [loading, setLoading] = useState(false);
  const [preferenceId, setPreferenceId] = useState("");
  const [isMercadoPagoInitialized, setIsMercadoPagoInitialized] =
    useState(false);

  const initMercadoPago = () =>
    import("@mercadopago/sdk-react").then((mod) => {
      mod.initMercadoPago(process.env.NEXT_PUBLIC_MP_PUBLIC_KEY, {
        locale: "es-AR",
      });

      setIsMercadoPagoInitialized(true);
    });

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
    if (!isMercadoPagoInitialized) {
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
        console.log(response.data);
      } catch (error) {
        console.log(error);
      } finally {
        setLoading(false);
      }
    }
  };

  useEffect(() => {
    initMercadoPago();

    getPreference();
    return;
  }, []);

  return (
    <>
      <div>
        <p className="text-center text-white text-xl my-5">
          Hola {session?.user.name}
        </p>
        <p className="text-center text-white text-xl  my-5">
          Tu turno esta {turno.estado}
        </p>
      </div>

      <div className="flex flex-col lg:flex-row">
        <div className={`${turno.estado != "confirmado" ? "flex-[2]" : ""}`}>
          {turno.estado === "pendiente" && (
            <div className="bg-white mx-auto">
              <p className="text-black text-xl  my-5 text-center py-2">
                El turno se encuentra pendiente, para confirmar el turno te
                pedimos que abones una seña, que es el 50% del costo del
                servicio
              </p>

              <div className="flex gap-2 items-center justify-center">
                <p className="text-lg">
                  Cualquier consulta puedes escribirme aca!{" "}
                </p>
                <BsWhatsapp color="green" />
                <BiSolidHandLeft />
              </div>
            </div>
          )}
        </div>

        <div className="flex-[2] flex flex-col items-center bg-[#F31559]">
          <div className="p-10 border-2 text-2xl my-10 bg-white">
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
              turno.estado !== "confirmado" &&
              isMercadoPagoInitialized && (
                <div className="w-2/3">
                  <Wallet initialization={{ preferenceId }} />
                </div>
              )
            )}
          </div>
          {paymentId && (
            <StatusScreen initialization={{ paymentId: Number(paymentId) }} />
          )}
        </div>
      </div>
    </>
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
