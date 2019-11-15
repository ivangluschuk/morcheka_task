'use strict';

import { CHANGE_FIELD_REGISTER_FORM } from "../reducers/registerReducer";
import { HANDLE_REGISTER } from "../reducers/registerReducer";

import { auth } from "../util/server.api.auth.js";

export const registerActions = {
    onFieldChange: onFieldChange,
    register: register,
};

function onFieldChange(fieldName, event) {
    if (event.target.value.trim().length > 0) {
        return {
            type: CHANGE_FIELD_REGISTER_FORM,
            payload: {
                ["" + fieldName]: false,
            },
        }
    } else {
        return {
            type: CHANGE_FIELD_REGISTER_FORM,
            payload: {
                ["" + fieldName]: true,
            },
        }
    }
}

function register(loginRef, passwordRef) {
    return async dispatch => {
        const login = this.refs[loginRef].value;
        const password = this.refs[passwordRef].value;

        const registrationRequest = {
            username: login,
            password: password,
        };

        const response = await auth.register(registrationRequest);

        this.refs[loginRef].value = "";
        this.refs[passwordRef].value = "";

        if (response.status === 400) { 
            dispatch({
                type: HANDLE_REGISTER,
                payload: {
                    loginIsEmpty: true,
                    passwordIsEmpty: true,
                    infoMassageText: 'This username is already taken',
                }
            })
        } else {
            window.location.replace('/');
        }

        dispatch({
            type: HANDLE_REGISTER,
            payload: {
                loginIsEmpty: true,
                passwordIsEmpty: true,
            }
        });
    }
}