import * as actionTypes from './actionTypes';

export const addPlace = (placeName, placeLocation) => {
    return {
        type: actionTypes.ADD_PLACE,
        placeName: placeName,
        placeLocation: placeLocation
    };
};

export const deletePlace = (key) => {
    return {
        type: actionTypes.DELETE_PLACE,
        placeKey: key
    }
};
