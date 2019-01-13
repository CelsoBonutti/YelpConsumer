import { ADD_TO_HISTORY } from './actionTypes'

export const addPlace = (placeName) => {
    return {
        type: ADD_TO_HISTORY,
        placeName: placeName
    }
}