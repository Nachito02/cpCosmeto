import { useEffect, useReducer } from "react";

import turnosContext from "./turnosContext";
import turnosReducer from "./turnosReducer";
import { useSession } from "next-auth/react";
const TurnosState = ({children}) => { 

    const initialState = {
        turno: null,
        loading: true
    }

    const [state,dispatch] = useReducer(turnosReducer, initialState)

    const {status} = useSession()
    useEffect(() => { 
        if(status === 'loading') {
            dispatch({
                type: 'SET_LOADING_TRUE',
                payload: true
            })
        }else {
            dispatch({
                type: 'SET_LOADING_FALSE',
                payload: false
            })
        }

    },[status])
    return(
        <turnosContext.Provider value={{
            turno: state.turno,
            loading: state.loading
        }}>

            {children}

        </turnosContext.Provider>

    )

 }

 export default TurnosState