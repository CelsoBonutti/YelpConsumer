import { ADD_TO_HISTORY, DELETE_HISTORY, DELETE_ITEM_FROM_HISTORY } from "./actionTypes";

export const addPlace = place => {
  return {
    type: ADD_TO_HISTORY,
    place: place
  };
};

export const deleteHistory = () => {
  return {
    type: DELETE_HISTORY
  };
};

export const deleteItemFromHistory = id => {
  return {
    type: DELETE_ITEM_FROM_HISTORY,
    placeId: id
  }
}
