export default (state, action) => {

    switch (action.type) {
        case 'SET_LOADING_TRUE':
        case 'SET_LOADING_FALSE':
            return {
                ...state, loading: action.payload
            }

        default:
            return {
                ...state
            }
    }

}