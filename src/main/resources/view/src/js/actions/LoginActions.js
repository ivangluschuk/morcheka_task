'use strict';

import { auth } from "../util/server.api.auth.js";

export function onLoginFormFieldChange(fieldName, event) {
    if (event.target.value.trim().length > 0) {
        return {
            type: 'CHANGE_FIELD_LOGIN_FORM',
            payload: {
                ["" + fieldName]: false,
            },
        }
    } else {
        return {
            type: 'CHANGE_FIELD_LOGIN_FORM',
            payload: {
                ["" + fieldName]: true,
            },
        }
    }
}

export function handleLoginFormLogin(login, password) {
    return async dispatch => {
        const authenticationRequest = `username=${this.refs[login].value}&password=${this.refs[password].value}`;

        const response = await auth.login(authenticationRequest);
        const url = response.url;

        this.refs[login].value = "";
        this.refs[password].value = "";

        if (url.indexOf('?') === -1) { 
            window.location.replace('/');
        }

        dispatch({
            type: 'HANDLE_LOGIN',
            payload: {
                loginIsEmpty: true,
                passwordIsEmpty: true,
            }
        });
    }
}