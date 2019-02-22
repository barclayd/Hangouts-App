import * as actionTypes from '../actions/actionTypes';

const initialState = {
    isLoading: false
};

const reducer = (state=initialState, action) => {
    switch (action.type) {
        case actionTypes.UI_START_LOADING:
            return {
                ...state,
                isLoading: true
            };
        case actionTypes.UI_STOP_LOADING:
            return {
                ...state,
                isLoading: false
            };
        default:
            return state;
    }
};

export default reducer;
