import * as actionTypes from '../actions/actionTypes';
import {updateObject} from '../utility';

const initialState = {
    places: [],
    selectedPlace: null
};

const reducer = (state = initialState, action) => {
    switch (action.type) {
        case actionTypes.ADD_PLACE:
            return updateObject(state, {
                places: state.places.concat({
                    key: Math.random(),
                    name: action.placeName,
                    image: {
                        uri: 'https://www.visitbritain.com/sites/default/files/consumer_destinations/teaser_images/manchester_town_hall.jpg'
                    }
                })
            });
        case actionTypes.DELETE_PLACE:
            return updateObject(state, {
                places: state.places.filter((place) => place.key !== state.selectedPlace.key),
                selectedPlace: null
            });
        case actionTypes.SELECT_PLACE:
            return updateObject(state, {
                selectedPlace: state.places.find(place => place.key === action.placeKey)
            });
        case actionTypes.DESELECT_PLACE:
            return updateObject(state, {
                selectedPlace: null
            });
        default:
            return state;
    }
};

export default reducer;
