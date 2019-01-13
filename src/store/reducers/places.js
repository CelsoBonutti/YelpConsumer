import { ADD_TO_HISTORY } from '../actions/actionTypes'

const initialState = {
    placeHistory =[]
}

const reducer = (state = initialState, action) => {
    switch (action.type) {
        case ADD_TO_HISTORY: {
            return {
                ...state,
                placeHistory: state.placeHistory.concat({
                    name: action.placeName
                })
            }
        }
        default:
            return state
    }
}

export default reducer