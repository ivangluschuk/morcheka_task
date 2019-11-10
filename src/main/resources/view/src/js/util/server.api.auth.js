'use strict';

import SERVER_ADDRESS from '../config/server.config.js';

const SERVER_API_URL = SERVER_ADDRESS;

export const auth = {

    login(authenticationRequest) {
        return fetch(`${SERVER_API_URL}/login`, {
            headers: {
                'Content-type': 'application/x-www-form-urlencoded',
            },
            method: 'POST',
            body: authenticationRequest,
        });
    },

    register(registrationRequest) {
        return fetch(`${SERVER_API_URL}/register`, {
            headers: {
                'Content-type': 'application/json',
            },
            method: 'POST',
            body: JSON.stringify(registrationRequest),
        });
    },

    logout() {
        fetch(`${SERVER_API_URL}/logout`);
        location.replace('/login');
    }
};