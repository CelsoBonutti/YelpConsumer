import { ADD_TO_HISTORY } from './actionTypes'

export const addPlace = (place) => {
    return {
        type: ADD_TO_HISTORY,
        place: place
    }
}