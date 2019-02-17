import * as actionTypes from './actionTypes';

export const addPlace = (placeName, placeLocation, placeImage) => {
    return {
        type: actionTypes.ADD_PLACE,
        placeName: placeName,
        placeLocation: placeLocation,
        placeImage: placeImage
    };
};

export const deletePlace = (key) => {
    return {
        type: actionTypes.DELETE_PLACE,
        placeKey: key
    }
};
