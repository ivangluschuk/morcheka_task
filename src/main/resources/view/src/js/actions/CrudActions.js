'use strict';

import { LOAD_NOTES } from '../reducers/crudReducer';

import { api } from '../util/server.api.common.js';

export const crudActions = {
	loadNotes: loadNotes,
};

function loadNotes() {
	const callback = async function(dispatch) {
		const notes = await api.getAllNotes();

		const newNotes = notes.map(note => {
			return {
				firstName: {
					type: 'firstName',
					text: note.firstName,
				},

				lastName: {
					type: 'lastName',
					text: note.lastName,
				},

				address: {
					type: 'address',
					text: note.address,
				},

				phone: {
					type: 'phone',
					text: note.phone,
				},

				id: note.id,
			};
		});

		return dispatch({
			type: LOAD_NOTES,
			payload: {
				notes: newNotes,
			},
		});
	};

	return callback.bind(this);
}
