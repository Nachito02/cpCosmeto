import React, { useEffect, useState } from "react";
import clientAxios from "../../config/clientAxios";
const useProfesional = () => {
  const [isLoading, setIsLoading] = useState();
  const [professionals, setProfessionals] = useState();
  useEffect(() => {
    const getProfessional = async () => {
      try {
        setIsLoading(true);
        const response = await clientAxios.get("/api/getProfessional");
        setProfessionals(response.data);
      } catch (error) {
        console.error(error);
      } finally {
        setIsLoading(false);
      }
    };

    getProfessional();
  }, []);

  return { professionals };
};

export default useProfesional;
