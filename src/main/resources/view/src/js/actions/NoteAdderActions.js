'use strict';

import { api } from "../util/server.api.common.js";
import { auth } from "../util/server.api.auth.js";

export function handleAddNoteAdderForm(firstNameRef, lastNameRef, addressRef, phoneRef) {
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
            type: 'HANDLE_ADD_NOTE',
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

export function handleLogout() {
    const callback = async function(dispatch) {
        await auth.logout();

        return dispatch({
            type: 'HANDLE_LOGOUT',
        });
    };

    return callback.bind(this);
}

export function onFieldChangeNoteAdderForm(fieldName, event) {
    const note = [event.target.value.trim()];

    if (event.target.value.trim().length > 0) {
        note[1] = false;

        return {
            type: 'CHANGE_FIELD_NOTE_ADDER_FORM',
            payload: {
                ["" + fieldName]: note,
            },
        }
    } else {
        note[1] = true;

        return {
            type: 'CHANGE_FIELD_NOTE_ADDER_FORM',
            payload: {
                ["" + fieldName]: note,
            },
        }
    }
}