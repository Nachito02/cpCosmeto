import { useState, useEffect } from "react";
import clientAxios from "../../config/clientAxios";
const useCliente = (email) => {
  const [cliente, setCliente] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchClienteData = async () => {
      try {
        setLoading(true);
        setError(null);

        // Realizar la petición con Axios
        const response = await clientAxios.get(`/api/cliente`, {
          params: { email },
        });
        // Suponiendo que la API devuelve un objeto con los datos del cliente
        setCliente(response.data);

        console.log(cliente);
        setLoading(false);
      } catch (error) {
        setError("Error al obtener los datos del cliente.");
        setLoading(false);
      }
    };

    fetchClienteData();
  }, [email]);

  return { cliente, loading, error };
};

export default useCliente;
