'use strict';

import SERVER_ADDRESS from '../config/server.config.js';

const SERVER_API_URL = SERVER_ADDRESS + '/api';

export const api = {

    async request(options) {
        const headers = new Headers({
            'Content-type': 'application/json',
        });

        const defaults = { headers: headers };
        options = Object.assign({}, defaults, options);

        return await fetch(options.url, options)
            .then(response => response.json())
            .then(json => json);
    },

    getAllNotes() {
        return this.request({
            url: `${SERVER_API_URL}/all`,
        });
    },
    
    deleteNoteById(id) {
        return fetch(`${SERVER_API_URL}/delete?id=${id}`);
    },

    saveNote(note) {
        return fetch(`${SERVER_API_URL}/save`, {
            headers: {
                'Content-type': 'application/json',
            },
            method: 'POST',
            body: JSON.stringify({
                id: note.id, 
                firstName: note.firstName, 
                lastName: note.lastName,
                address: note.address,
                phone: note.phone})
        });
    },
};