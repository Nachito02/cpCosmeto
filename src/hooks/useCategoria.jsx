import { useEffect, useState } from "react";
import clientAxios from "../../config/clientAxios";
const useCategoria = () => {
  const [data, setData] = useState([]);
  const [categorias, setCategorias] = useState([]);
  const [servicios, setServicios] = useState([]);
  useEffect(() => {
    const fetchCategorias = async () => {
      try {
        const response = await clientAxios.get("/api/getAllCategories");

        setData(response.data);

        if (response.data) {
          setCategorias(response.data);
        }
      } catch (error) {
        // Manejo del error
        console.error("Error en getServerSideProps:", error);
      }
    };

    fetchCategorias();
  }, []);

  return { categorias, servicios };
};

export default useCategoria;
