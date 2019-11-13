'use strict';

import { api } from "../util/server.api.common.js";

export function handleAddNote() {
    return dispatch => dispatch(loadNotes());
}

export function handleDeleteNote(note) {
    const callback = async function(dispatch) {
        await api.deleteNoteById(note.id);

        return dispatch(loadNotes());
    };

    return callback.bind(this);
}

export function handleEditNote(note) {
    const callback = async function(dispatch) {
        await api.saveNote(note);

        return dispatch(loadNotes());
    };

    return callback.bind(this);
}

export function loadNotes() {
    const callback = async function(dispatch) {
        const notes = await api.getAllNotes();

        return dispatch({
            type: 'LOAD_NOTES',
            payload: {
                notes: notes,
            }
        });
    };

    return callback.bind(this);
}