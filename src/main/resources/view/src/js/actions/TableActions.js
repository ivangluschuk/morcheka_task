'use strict';

import { CHANGE_FIELD_TABLE } from '../reducers/tableReducer';
import { LOAD_NOTES } from '../reducers/crudReducer';
import { LOAD_TABLE } from '../reducers/tableReducer';

import { api } from '../util/server.api.common.js';

export const tableActions = {
	editNote: editNote,
	onFieldChange: onFieldChange,
	deleteNote: deleteNote,
	loadTable: loadTable,
};

function editNote(row, index) {
	const callback = async function(dispatch) {
		row.editFiedlDisable = !row.editFieldDisable;

		let rows = [];

		if (row.buttonMode === 1) {
			row.className = 'button button_enable button_table';
			row.editFieldDisable = true;
			row.buttonMode = 0;
			row.innerHTML = 'edit';

			const newNote = {
				id: row.note.id,
				firstName: row.note.firstName.text,
				lastName: row.note.lastName.text,
				address: row.note.address.text,
				phone: row.note.phone.text,
			};

			await api.saveNote(newNote);
		} else {
			row.className = 'button button_enable button_table_edit';
			row.buttonMode = 1;
			row.editFieldDisable = false;
			row.innerHTML = 'ok';
		}

		rows[index] = row;

		dispatch({
			type: CHANGE_FIELD_TABLE,
			payload: rows,
		});
	};

	return callback.bind(this);
}

function onFieldChange(event, rows, field, index) {
	rows[index].note[field.type].text = event.target.value;

	const firstName = rows[index].note.firstName.text.length > 0;
	const lastName = rows[index].note.lastName.text.length > 0;
	const address = rows[index].note.address.text.length > 0;
	const phone = rows[index].note.phone.text.length > 0;

	const buttonMode = firstName && lastName && address && phone;

	if (buttonMode) {
		rows[index].editButtonDisable = false;
		rows[index].className = 'button button_enable button_table_edit';
	} else {
		rows[index].editButtonDisable = true;
		rows[index].className = 'button button_table_disable';
	}

	return {
		type: LOAD_TABLE,
		payload: rows,
	};
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

function loadTable(notes) {
	const newRows = notes.map(note => {
		return {
			note: note,
			editFieldDisable: true,
			editButtonDisable: false,
			buttonMode: 0,
			innerHTML: 'edit',
			className: 'button button_enable button_table',
		};
	});

	return {
		type: LOAD_TABLE,
		payload: {
			rows: newRows,
		},
	};
}
