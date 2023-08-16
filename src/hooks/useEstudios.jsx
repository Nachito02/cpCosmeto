import React, { useEffect, useState } from "react";
import clientAxios from "../../config/clientAxios";

const useEstudios = () => {
  const [estudios, setEstudios] = useState([]);

  useEffect(() => {
    const fetching = async () => {
      try {
        const getEstudios = await clientAxios.get("api/getEstudios");
        setEstudios(getEstudios.data);
      } catch (error) {
        console.log(error);
      }
    };

    fetching();
  }, []);

  return { estudios };
};

export default useEstudios;
