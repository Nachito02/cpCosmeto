import { useEffect, useReducer } from "react";

import turnosContext from "./turnosContext";
import turnosReducer from "./turnosReducer";
import { useSession } from "next-auth/react";
const TurnosState = ({ children }) => {
  const initialState = {
    turno: {
      service: null,
      professional: null,
      estudio: null,
    },
    loading: true,
  };

  const [state, dispatch] = useReducer(turnosReducer, initialState);

  const { status } = useSession();
  useEffect(() => {
    if (status === "loading") {
      dispatch({
        type: "SET_LOADING_TRUE",
        payload: true,
      });
    } else {
      dispatch({
        type: "SET_LOADING_FALSE",
        payload: false,
      });
    }
  }, [status]);

  const selectService = (service) => {
    dispatch({
      type: "SELECT_SERVICE",
      payload: service,
    });
  };

  const clearService = () => {
    dispatch({
      type: "CLEAR_SERVICE",
    });
  };

  
  const clearTurno = () => {
    dispatch({
      type: "CLEAR_TURNO",
    });
  };

  const selectProfessional = (profesional) => {
    dispatch({
      type: "SELECT_PROFESSIONAL",
      payload: profesional,
    });
  };

  const selectEstudio = (estudio) => {
    dispatch({
      type: "SELECT_ESTUDIO",
      payload: estudio,
    });
  };

  return (
    <turnosContext.Provider
      value={{
        turno: state.turno,
        loading: state.loading,
        selectService,
        clearService,
        selectProfessional,
        selectEstudio,
        clearTurno
      }}
    >
      {children}
    </turnosContext.Provider>
  );
};

export default TurnosState;
