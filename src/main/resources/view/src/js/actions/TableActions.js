'use strict';

import { CHANGE_FIELD_TABLE } from "../reducers/tableReducer";
import { LOAD_NOTES } from "../reducers/crudReducer";

import { api } from "../util/server.api.common.js";

export const tableActions = {
    editNote: editNote,
    onFieldChange: onFieldChange,
    deleteNote: deleteNote,
};

function editNote(note) {
    const callback = async function(dispatch) {
        this.refs[`${note.id}:firstName`].disabled = !this.refs[`${note.id}:firstName`].disabled;
        this.refs[`${note.id}:lastName`].disabled = !this.refs[`${note.id}:lastName`].disabled;
        this.refs[`${note.id}:address`].disabled = !this.refs[`${note.id}:address`].disabled;
        this.refs[`${note.id}:phone`].disabled = !this.refs[`${note.id}:phone`].disabled;

        let notes = [];

        if (parseInt(this.refs[`${note.id}:edit`].buttonMode) === 0) {
            this.refs[`${note.id}:edit`].className = "button button_enable button_table";
            this.refs[`${note.id}:edit`].buttonMode = "1";
            this.refs[`${note.id}:edit`].innerHTML = "edit";

            const firstName = this.refs[`${note.id}:firstName`].value;
            const lastName = this.refs[`${note.id}:lastName`].value;
            const address = this.refs[`${note.id}:address`].value;
            const phone = this.refs[`${note.id}:phone`].value;

            const newNote = {
                firstName: firstName,
                lastName: lastName,
                address: address,
                phone: phone,
                id: note.id
            };

            await api.saveNote(newNote);
            notes = await api.getAllNotes()
        } else {
            this.refs[`${note.id}:edit`].className = "button button_enable button_table_edit";
            this.refs[`${note.id}:edit`].buttonMode = "0";
            this.refs[`${note.id}:edit`].innerHTML = "ok";
        }

        dispatch({
            type: LOAD_NOTES,
            payload: notes,
        });
    };

    return callback.bind(this);
}

function onFieldChange(note) {
    const firstName = this.refs[`${note.id}:firstName`].value.length > 0;
    const lastName = this.refs[`${note.id}:lastName`].value.length > 0;
    const address = this.refs[`${note.id}:address`].value.length > 0;
    const phone = this.refs[`${note.id}:phone`].value.length > 0;

    const buttonMode = (firstName && lastName && address && phone);

    if (buttonMode) {
        this.refs[`${note.id}:edit`].disabled = false;
        this.refs[`${note.id}:edit`].className = "button button_enable button_table_edit";
    } else {
        this.refs[`${note.id}:edit`].disabled = true;
        this.refs[`${note.id}:edit`].className = "button button_table_disable";
    }

    return {
        type: CHANGE_FIELD_TABLE,
    }
}

function deleteNote(note) {
    const callback = async function(dispatch) {
        await api.deleteNoteById(note.id);
        this.props.loadNotes();

        return dispatch({
            type: LOAD_NOTES,
        });
    };

    return callback.bind(this);
}