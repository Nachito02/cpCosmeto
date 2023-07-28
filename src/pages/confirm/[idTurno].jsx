import React, { use, useEffect, useState } from "react";
import clientAxios from "../../../config/clientAxios";
import { useSession } from "next-auth/react";
import format from "date-fns/format";
import dynamic from "next/dynamic";
import { ClipLoader } from "react-spinners";

const ConfirmTurno = ({ turno }) => {
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

  const getPreference = async () => {
    try {
      setLoading(true);
      const response = await clientAxios.get("/api/mercadopago");

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
  }, []);

  const initialization = {
    amount: 100,
    preferenceId: preferenceId,
  };
  const customization = {
    paymentMethods: {
      ticket: "all",
      creditCard: "all",
      debitCard: "all",
      mercadoPago: "all",
    },
  };
  const onSubmit = async ({ selectedPaymentMethod, formData }) => {
    // callback llamado al hacer clic en el botón enviar datos
    console.log(formData);
    return new Promise((resolve, reject) => {
      fetch("/process_payment", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      })
        .then((response) => response.json())
        .then((response) => {
          // recibir el resultado del pago
          resolve();
        })
        .catch((error) => {
          // manejar la respuesta de error al intentar crear el pago
          reject();
        });
    });
  };
  const onError = async (error) => {
    // callback llamado para todos los casos de error de Brick
    console.log(error);
  };
  const onReady = async () => {
    /*
      Callback llamado cuando el Brick está listo.
      Aquí puede ocultar cargamentos de su sitio, por ejemplo.
    */
  };

  const { data: session } = useSession();

  console.log(session);
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
            Profesional: {turno.id_profesional.nombre}{" "}
            {turno.id_profesional.apellido}
          </p>
          <p>Fecha: {format(new Date(turno.fecha), "dd/MM/yy")}</p>
          <p>Servicio: {turno.id_servicio.nombre}</p>
        </div>

        <div className="max-w-1/2">
          {loading ? (
            <ClipLoader />
          ) : (
            <div className="w-2/3">
              <Payment
                className="bg-red"
                initialization={initialization}
                customization={customization}
                onSubmit={onSubmit}
                onReady={onReady}
                onError={onError}
              />
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default ConfirmTurno;

export async function getServerSideProps(context) {
  const { idTurno } = context.query;

  try {
    const turno = await clientAxios.get("/api/getTurno", {
      params: { idTurno },
    });

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
