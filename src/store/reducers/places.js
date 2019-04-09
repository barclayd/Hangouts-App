import * as actionTypes from '../actions/actionTypes';
import {updateObject} from '../utility';

const initialState = {
    places: [],
    placeAdded: false
};

const reducer = (state = initialState, action) => {
    switch (action.type) {
        case actionTypes.SET_PLACES:
            return updateObject(state, {
                places: action.places
            });
        case actionTypes.START_ADD_PLACE:
            return updateObject(state, {
                placeAdded: false
            });
        case actionTypes.PLACE_ADDED:
            return updateObject(state, {
                placeAdded: true
            });
        default:
            return state;
    }
};

export default reducer;
