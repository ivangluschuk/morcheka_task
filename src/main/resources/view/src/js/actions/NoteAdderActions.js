'use strict';

import { HANDLE_ADD_NOTE_NOTE_ADDER_FORM } from "../reducers/noteAdderReducer";
import { CHANGE_FIELD_NOTE_ADDER_FORM } from "../reducers/noteAdderReducer";
import { HANDLE_LOGOUT } from "../reducers/noteAdderReducer";

import { api } from "../util/server.api.common.js";
import { auth } from "../util/server.api.auth.js";

export const noteAdderActions = {
    addNote: addNote,
    logout: logout,
    onFieldChange: onFieldChange,
};

function addNote(firstNameRef, lastNameRef, addressRef, phoneRef) {
    const callback = async function(dispatch) {
        const firstName = this.props.state.firstName[0];
        const lastName = this.props.state.lastName[0];
        const address = this.props.state.address[0];
        const phone = this.props.state.phone[0];

        const note = {
            firstName: firstName,
            lastName: lastName,
            address: address,
            phone: phone,
        };

        this.refs[firstNameRef].value = "";
        this.refs[lastNameRef].value = "";
        this.refs[addressRef].value = "";
        this.refs[phoneRef].value = "";

        await api.saveNote(note);
        this.props.loadNotes();

        return dispatch({
            type: HANDLE_ADD_NOTE_NOTE_ADDER_FORM,
            payload: {
                firstName: ["", true],
                lastName: ["", true],
                address: ["", true],
                phone: ["", true],
            }
        });
    };

    return callback.bind(this);
}

function logout() {
    const callback = async function(dispatch) {
        await auth.logout();

        return dispatch({
            type: HANDLE_LOGOUT,
        });
    };

    return callback.bind(this);
}

function onFieldChange(fieldName) {
    const note = [this.refs[fieldName].value.trim()];

    if (this.refs[fieldName].value.trim().length > 0) {
        note[1] = false;

        return {
            type: CHANGE_FIELD_NOTE_ADDER_FORM,
            payload: {
                ["" + fieldName]: note,
            },
        }
    } else {
        note[1] = true;

        return {
            type: CHANGE_FIELD_NOTE_ADDER_FORM,
            payload: {
                ["" + fieldName]: note,
            },
        }
    }
}