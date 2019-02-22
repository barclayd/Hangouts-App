import * as actionTypes from './actionTypes';

export const uiStartLoading = () => {
    return {
        type: actionTypes.UI_START_LOADING
    }
};

export const uiStopLoading = () => {
    return {
        type: actionTypes.UI_STOP_LOADING
    }
};
