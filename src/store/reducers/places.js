import * as actionTypes from '../actions/actionTypes';
import {updateObject} from '../utility';

const initialState = {
    places: []
};

const reducer = (state = initialState, action) => {
    switch (action.type) {
        case actionTypes.ADD_PLACE:
            return updateObject(state, {
                places: state.places.concat({
                    key: Math.random(),
                    name: action.placeName,
                    location: action.placeLocation,
                    image: {
                        uri: action.placeImage.uri
                    }
                })
            });
        case actionTypes.DELETE_PLACE:
            return updateObject(state, {
                places: state.places.filter((place) => place.key !== action.placeKey)
            });
        default:
            return state;
    }
};

export default reducer;
