'use strict';

import SERVER_ADDRESS from '../config/server.config.js';

const SERVER_API_URL = SERVER_ADDRESS;

export const auth = {

    async login(authenticationRequest) {
        return await fetch(`${SERVER_API_URL}/login`, {
            headers: {
                'Content-type': 'application/x-www-form-urlencoded',
            },
            method: 'POST',
            body: authenticationRequest,
        });
    },

    async register(registrationRequest) {
        return await fetch(`${SERVER_API_URL}/register`, {
            headers: {
                'Content-type': 'application/json',
            },
            method: 'POST',
            body: JSON.stringify(registrationRequest),
        });
    },

    async logout() {
        await fetch(`${SERVER_API_URL}/logout`);
        location.replace('/login');
    }
};