'use strict';

import { HANDLE_ADD_NOTE_NOTE_ADDER_FORM } from '../reducers/noteAdderReducer';
import { CHANGE_FIELD_NOTE_ADDER_FORM } from '../reducers/noteAdderReducer';
import { HANDLE_LOGOUT } from '../reducers/noteAdderReducer';

import { api } from '../util/server.api.common.js';
import { auth } from '../util/server.api.auth.js';

export const noteAdderActions = {
	addNote: addNote,
	logout: logout,
	onFieldChange: onFieldChange,
};

function addNote() {
	const callback = async function(dispatch) {
		const firstName = this.props.state.firstName.text;
		const lastName = this.props.state.lastName.text;
		const address = this.props.state.address.text;
		const phone = this.props.state.phone.text;

		const note = {
			firstName: firstName,
			lastName: lastName,
			address: address,
			phone: phone,
		};

		await api.saveNote(note);
		this.props.loadNotes();

		return dispatch({
			type: HANDLE_ADD_NOTE_NOTE_ADDER_FORM,
			payload: {
				firstName: {
					text: '',
					empty: true,
				},

				lastName: {
					text: '',
					empty: true,
				},

				address: {
					text: '',
					empty: true,
				},

				phone: {
					text: '',
					empty: true,
				},
			},
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

function onFieldChange(field, value) {
	if (value.length > 0) {
		field.text = value;
		field.empty = false;

		return {
			type: CHANGE_FIELD_NOTE_ADDER_FORM,
			payload: field,
		};
	} else {
		field.text = value;
		field.empty = true;

		return {
			type: CHANGE_FIELD_NOTE_ADDER_FORM,
			payload: field,
		};
	}
}
