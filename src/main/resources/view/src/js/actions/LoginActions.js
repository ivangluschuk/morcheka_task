'use strict';

import { CHANGE_FIELD_LOGIN_FORM } from "../reducers/loginReducer";
import { HANDLE_LOGIN } from "../reducers/loginReducer";

import { auth } from "../util/server.api.auth.js";

export const loginActions = { 
    onFieldChange: onFieldChange,
    login: login,
};

function onFieldChange(fieldName, event) {
    if (event.target.value.trim().length > 0) {
        return {
            type: CHANGE_FIELD_LOGIN_FORM,
            payload: {
                ["" + fieldName]: false,
            },
        }
    } else {
        return {
            type: CHANGE_FIELD_LOGIN_FORM,
            payload: {
                ["" + fieldName]: true,
            },
        }
    }
}

function login(login, password) {
    return async dispatch => {
        const authenticationRequest = `username=${this.refs[login].value}&password=${this.refs[password].value}`;

        const response = await auth.login(authenticationRequest);
        const url = response.url;

        this.refs[login].value = "";
        this.refs[password].value = "";

        if(url.includes('/crud')) {
            window.location.replace('/');
        } else if (url.includes('?error')) {
            dispatch({
                type: HANDLE_LOGIN,
                payload: {
                    loginIsEmpty: true,
                    passwordIsEmpty: true,
                    infoMassageText: 'Credentials are bad',
                }
            });
        }

        dispatch({
            type: HANDLE_LOGIN,
            payload: {
                loginIsEmpty: true,
                passwordIsEmpty: true,
            }
        });
    }
}