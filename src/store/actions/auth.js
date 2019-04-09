import {AsyncStorage} from 'react-native';

import * as actionTypes from './actionTypes';
import * as actions from './index';
import startMainTabs from '../../screens/MainTabs/startMainTabs';
import App from '../../../App';

const API_KEY = 'AIzaSyCPS1KNVPhI5IxJv63V-4SVK9G_RhDu4lI';

export const tryAuth  = (authData, authMode) => {
   return dispatch => {
       dispatch(actions.uiStartLoading());
       let url = `https://www.googleapis.com/identitytoolkit/v3/relyingparty/verifyPassword?key=${API_KEY}`;
       if (authMode === 'signup') {
           url = `https://www.googleapis.com/identitytoolkit/v3/relyingparty/signupNewUser?key=${API_KEY}`;
       }
       dispatch(authUser(url, authData));
   };
};

export const authUser = (url, authData) => {
    return dispatch => {
        fetch(url, {
            method: "POST",
            body: JSON.stringify({
                email: authData.email,
                password: authData.password,
                returnSecureToken: true
            }),
            headers: {
                "Content-Type": "application/json"
            }
        })
            .catch(err => {
                console.log(err);
                alert('Authentication failed. Please try again');
                dispatch(actions.uiStopLoading());
            })
            .then(res => res.json())
            .then(parsedRes => {
                dispatch(actions.uiStopLoading());
                if (!parsedRes.idToken) {
                    alert(`Authentication failed due to ${parsedRes.error.message}. Please try again`);
                } else {
                    dispatch(authStoreToken(parsedRes.idToken, parsedRes.expiresIn, parsedRes.refreshToken));
                    startMainTabs();
                }
            })
            .catch(err => {
                console.log(err);
                alert('Authentication connection failed. Please try again');
                dispatch(actions.uiStopLoading());
            });
    };
};

export const authStoreToken = (token, expiresIn, refreshToken) => {
  return dispatch => {
    const now = new Date();
    const expiryDate = now.getTime() + (expiresIn * 1000);
    dispatch(authSetToken(token, expiryDate));
    AsyncStorage.setItem("auth:token", token);
    AsyncStorage.setItem("auth:expiryDate", expiryDate.toString());
    AsyncStorage.setItem("auth:refreshToken", refreshToken);
  };
};

export const authSetToken = (token, expiryDate) => {
    return {
        type: actionTypes.AUTH_SET_TOKEN,
        token,
        expiryDate
    }
};

export const authGetToken = () => {
    return async (dispatch, getState) => {
        const token = await getState().auth.token;
        const expiryDate = await getState().auth.expiryDate;
        if (!token || new Date(expiryDate) <= new Date()) {
            const tokenFromStorage = await AsyncStorage.getItem("auth:token");
            if (!tokenFromStorage) {
                return console.log('no token present in storage');
            } else {
                const expiryDate = await AsyncStorage.getItem("auth:expiryDate");
                const parsedDate = new Date(parseInt(expiryDate));
                const now = new Date();
                if (parsedDate > now) {
                    return tokenFromStorage;
                } else {
                    if (!expiryDate) {
                        return tokenFromStorage;
                    } else {
                        // check if refreshToken exists
                        const refreshToken = await AsyncStorage.getItem("auth:refreshToken");
                        if (refreshToken) {
                            const url = `https://securetoken.googleapis.com/v1/token?key=${API_KEY}`;
                            fetch(url, {
                                method: 'POST',
                                headers: {
                                    'Content-Type': 'application/x-www-form-urlencoded'
                                },
                                body: "grant_type=refresh_token&refresh_token" + refreshToken
                            })
                                .then(res => res.json())
                                .then(parsedRes => {
                                    if (parsedRes.id_token) {
                                        dispatch(authStoreToken(parsedRes.id_token, parsedRes.expires_in, parsedRes.refresh_token));
                                        return parsedRes.id_token;
                                    } else {
                                        dispatch(authClearStorage());
                                    }
                                })
                                .catch(err => {
                                    console.log(err);
                                })

                        } else {
                            await dispatch(authLogout());
                            throw new Error('Token has expired');
                        }
                    }
                }
            }
        }
    }
};

export const authAutoSignIn = () => {
  return dispatch => {
      dispatch(authGetToken())
          .then(token => {
              if (token) {
                  startMainTabs();
              }
          })
          .catch(err => console.log(err));
  }
};

export const authClearStorage = () => {
    return () => {
        AsyncStorage.removeItem("auth:expiryDate");
        AsyncStorage.removeItem("auth:token");
        return AsyncStorage.removeItem("auth:refreshToken");
    }
};

export const authLogout = () => {
    return async dispatch => {
        const cleanedStorage = await dispatch(authClearStorage());
        if(!cleanedStorage) {
            await dispatch(authRemoveToken());
            await App();
        }
    };
};

export const authRemoveToken = () => {
    return {
        type: actionTypes.AUTH_REMOVE_TOKEN
    };
};
