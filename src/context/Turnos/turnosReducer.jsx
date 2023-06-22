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
                    ...state.turno, service: null
                }
            }


        default:
            return {
                ...state
            }
    }

}