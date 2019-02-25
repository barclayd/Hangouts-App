import * as actionTypes from '../actions/actionTypes';
import {updateObject} from '../utility';

const initialState = {
    places: []
};

const reducer = (state = initialState, action) => {
    switch (action.type) {
        case actionTypes.SET_PLACES:
            return updateObject(state, {
                places: action.places
            });
        default:
            return state;
    }
};

export default reducer;
