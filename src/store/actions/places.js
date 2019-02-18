import * as actionTypes from './actionTypes';

export const addPlace = (placeName, placeLocation, placeImage) => {

    const placeData = {
      name: placeName,
      location: placeLocation
    };

    return dispatch => {
        fetch("https://places-app-1550271704119.firebaseio.com/places.json", {
            method: "POST",
            body: JSON.stringify(placeData)
        })
            .catch(err => console.log(err))
            .then(res => res.json())
            .then(parsedResp => {
                console.log(parsedResp);
            })
    };
};

export const deletePlace = (key) => {
    return {
        type: actionTypes.DELETE_PLACE,
        placeKey: key
    }
};
