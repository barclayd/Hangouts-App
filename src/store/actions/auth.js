import * as actionTypes from './actionTypes';

export const tryAuth  = (authData) => {
    return {
      type: actionTypes.TRY_AUTH,
      authData: authData
    };
};
