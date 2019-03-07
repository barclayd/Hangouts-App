import {AsyncStorage} from 'react-native';

import * as actionTypes from './actionTypes';
import * as actions from './index';
import startMainTabs from '../../screens/MainTabs/startMainTabs';

export const tryAuth  = (authData, authMode) => {
   return dispatch => {
       dispatch(actions.uiStartLoading());
       const apiKey = 'AIzaSyCPS1KNVPhI5IxJv63V-4SVK9G_RhDu4lI';
       let url = `https://www.googleapis.com/identitytoolkit/v3/relyingparty/verifyPassword?key=${apiKey}`;
       if (authMode === 'signup') {
           url = `https://www.googleapis.com/identitytoolkit/v3/relyingparty/signupNewUser?key=${apiKey}`
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
                    dispatch(authStoreToken(parsedRes.idToken));
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

export const authStoreToken = token => {
  return dispatch => {
    dispatch(authSetToken(token));
    AsyncStorage.setItem("auth:token", token);
  };
};

export const authSetToken = token => {
    return {
        type: actionTypes.AUTH_SET_TOKEN,
        token
    }
};

export const authGetToken = () => {
    return async (dispatch, getState) => {
        const token = await getState().auth.token;
        if (!token) {
            const tokenFromStorage = await AsyncStorage.getItem("auth:token");
            if (!tokenFromStorage) {
                return console.log('no token present in storage');
            }
        } else {
            return token;
        }
    }
};

export const authAutoSignIn = () => {
  return dispatch => {
      dispatch(authGetToken())
          .then(token => {
              startMainTabs();
          })
          .catch(err => console.log(err));
  }
};
