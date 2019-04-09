import * as actionTypes from './actionTypes';
import {uiStartLoading, uiStopLoading, authGetToken} from './index';
export const addPlace = (placeName, placeLocation, placeImage) => {
    return (dispatch) => {
        dispatch(uiStartLoading());
        dispatch(authGetToken())
            .then(token => {
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
                        console.log(parsedRes);
                        const placeData = {
                            name: placeName,
                            location: placeLocation,
                            image: parsedRes.imageUrl
                        };
                        console.log(token);
                        return fetch(`https://places-app-1550271704119.firebaseio.com/places.json?auth=${token}`, {
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
                        // redirect to new tab
                        dispatch(placeAdded());
                    })
                    .catch(err => {
                        console.log('Error occurred at the end', err);
                        alert("Image upload failed, please try again");
                        dispatch(uiStopLoading());
                    });
            });
    }
};

export const startAddPlace = () => {
    return {
        type: actionTypes.START_ADD_PLACE
    }
};

export const placeAdded = () => {
    console.log('called place added');
    return {
        type: actionTypes.PLACE_ADDED
    }
};

export const getPlaces = () => {
    return dispatch => {
        dispatch(authGetToken())
            .then(token => {
                return fetch(`https://places-app-1550271704119.firebaseio.com/places.json?auth=${token}`)
            })
            .catch(() => {
                console.log('No valid token found');
            })
            .then(res => res.json())
            .then(parsedRes => {
                const places = [];
                for (let key in parsedRes) {
                    places.push({
                        ...parsedRes[key],
                        image: {
                            uri: parsedRes[key].image
                        },
                        key: key
                    })
                }
                dispatch(setPlaces(places));
            })
            .catch(err => {
                alert('Something went wrong');
                console.log(err);
            });
    }
};

export const setPlaces = places => {
    return {
        type: actionTypes.SET_PLACES,
        places: places
    }
};

export const deletePlaces = (placeId) => {
    return dispatch => {
        dispatch(authGetToken())
            .then(token => {
                fetch(`https://places-app-1550271704119.firebaseio.com/places/${placeId}.json?auth=${token}`, {
                    method: 'DELETE'
                })
                    .catch(err => {
                        alert('Something went wrong');
                        console.log(err);
                    })
                    .then(res => res.json())
                    .then(dispatch(getPlaces()))
                    .catch(err => {
                        alert('Something went wrong');
                        console.log(err);
                    });
            });
    }
};
