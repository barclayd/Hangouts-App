import * as actionTypes from '../actions/actionTypes';
import {updateObject} from '../utility';

const initialState = {
    token: null
};

const reducer = (state = initialState, action) => {
    switch (action.type) {
        case actionTypes.AUTH_SET_TOKEN:
            return updateObject(state, {
                token: action.token
            });
        default:
            return state;
    }
};

export default reducer;
