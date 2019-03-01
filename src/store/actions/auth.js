import * as actions from './index';
import startMainTabs from '../../screens/MainTabs/startMainTabs';

export const tryAuth  = (authData, authMode) => {
   return dispatch => {
       if (authMode === 'login') {
           dispatch(authLogin(authData));
       } else {
           dispatch(authSignUp(authData));
       }
   };
};

export const authSignUp = (authData) => {
    return dispatch => {
        dispatch(actions.uiStartLoading());
        fetch(`https://www.googleapis.com/identitytoolkit/v3/relyingparty/signupNewUser?key=AIzaSyCPS1KNVPhI5IxJv63V-4SVK9G_RhDu4lI`, {
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
                if (parsedRes.error) {
                    alert(`Authentication failed due to ${parsedRes.error.message}. Please try again`);
                } else {
                    console.log('new account created');
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

export const authLogin = (authData) => {
    return dispatch => {
        dispatch(actions.uiStartLoading());
        fetch(`https://www.googleapis.com/identitytoolkit/v3/relyingparty/verifyPassword?key=AIzaSyCPS1KNVPhI5IxJv63V-4SVK9G_RhDu4lI`, {
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
                if (parsedRes.error) {
                    alert(`Authentication failed due to ${parsedRes.error.message}. Please try again`);
                } else {
                    console.log('logged in');
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
