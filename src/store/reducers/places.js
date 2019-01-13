import { ADD_TO_HISTORY } from '../actions/actionTypes'

const initialState = {
    placeHistory: []
}

const reducer = (state = initialState, action) => {
    switch (action.type) {
        case ADD_TO_HISTORY: {
            return {
                ...state,
                placeHistory: state.placeHistory.filter((place) => place.id !== action.place.id).concat({
                    name: action.place.name,
                    id: action.place.id,
                    time: new Date().toLocaleString()
                })
            }
        }
        default:
            return state
    }
}

export default reducer