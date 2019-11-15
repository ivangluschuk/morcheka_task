'use strict';

import { LOAD_NOTES } from "../reducers/crudReducer";

import { api } from "../util/server.api.common.js";

export const crudActions = {
    loadNotes: loadNotes,
};

function loadNotes() {
    const callback = async function(dispatch) {
        const notes = await api.getAllNotes();

        return dispatch({
            type: LOAD_NOTES,
            payload: {
                notes: notes,
            }
        });
    };
    
    return callback.bind(this);
}