import React, { useState, useEffect } from "react";
import clientAxios from "../../config/clientAxios";
const useTurnoManual = () => {
  const [loading, setIsLoading] = useState(false);
  const [manualTurnos, setManualTurnos] = useState();
  useEffect(() => {
    const getManualTurnos = async () => {
      try {
        setIsLoading(true);
        const response = await clientAxios.get("/api/turnoManual");
        setManualTurnos(response.data);
      } catch (error) {
        console.error(error);
      } finally {
        setIsLoading(false);
      }
    };

    getManualTurnos();
  }, []);

  return { manualTurnos };
};

export default useTurnoManual;
