export default (state, action) => {

    switch (action.type) {
        case 'SET_LOADING_TRUE':
        case 'SET_LOADING_FALSE':
            return {
                ...state, loading: action.payload
            }

        case 'SELECT_SERVICE':
            return {
                ...state, turno: {
                    ...state.turno, service: action.payload
                }
            }

        case 'CLEAR_SERVICE':
            return {
                ...state,turno: {
                    ...state.turno, service: null, professional:null
                }
            }

        case 'CLEAR_TURNO':
                return {
                    ...state,turno: {
                        ...state, service:null, professional:null, estudio:null
                    }
                }

            case 'SELECT_PROFESSIONAL':
                return {
                    ...state,turno: {
                        ...state.turno, professional: action.payload
                    }
                }

            case 'SELECT_ESTUDIO': 
            return {
                ...state, turno : {
                    ...state.turno, estudio: action.payload
                }
            }

            case 'CLEAR_PROFESSIONAL':
                return {
                    ...state,turno: {
                        ...state.turno, professional: null
                    }
                }

            case 'CLEAR_ESTUDIO': 
            return {
                ...state, turno : {
                    ...state.turno, estudio: null
                }
            }

        default:
            return {
                ...state
            }
    }

}