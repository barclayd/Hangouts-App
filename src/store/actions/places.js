import * as actionTypes from './actionTypes';
import {uiStartLoading, uiStopLoading} from './index';
export const addPlace = (placeName, placeLocation, placeImage) => {
    return dispatch => {
        dispatch(uiStartLoading());
        console.log(placeImage.base64);
        fetch("https://us-central1-places-app-1550271704119.cloudfunctions.net/storeImage", {
            method: "POST",
            body: JSON.stringify({
                image: placeImage.base64
            })
        })
            .catch(err => {
                console.log(err);
                alert("Image upload failed, please try again");
                dispatch(uiStopLoading());
            })
            .then(res => res.json())
            .then(parsedRes => {
                const placeData = {
                    name: placeName,
                    location: placeLocation,
                    image: parsedRes.imageUrl
                };
                return fetch("https://places-app-1550271704119.firebaseio.com/places.json", {
                    method: "POST",
                    body: JSON.stringify(placeData)
                });
            })
            .catch(err => {
                console.log(err);
                alert("Image upload failed, please try again");
                dispatch(uiStopLoading());
            })
            .then(res => res.json())
            .then(parsedRes => {
                console.log(parsedRes);
                dispatch(uiStopLoading());
            })
            .catch(err => {
                console.log('Error occurred at the end', err);
                alert("Image upload failed, please try again");
                dispatch(uiStopLoading());
            });
    }
};

export const deletePlace = (key) => {
    return {
        type: actionTypes.DELETE_PLACE,
        placeKey: key
    }
};
