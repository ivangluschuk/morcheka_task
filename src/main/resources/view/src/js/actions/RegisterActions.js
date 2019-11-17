'use strict';

import { CHANGE_FIELD_REGISTER_FORM } from '../reducers/registerReducer';
import { HANDLE_REGISTER } from '../reducers/registerReducer';

import { auth } from '../util/server.api.auth.js';

export const registerActions = {
	onFieldChange: onFieldChange,
	register: register,
};

function onFieldChange(field, value) {
	if (value.length > 0) {
		field.text = value;
		field.empty = false;

		return {
			type: CHANGE_FIELD_REGISTER_FORM,
			payload: field,
		};
	} else {
		field.text = value;
		field.empty = true;

		return {
			type: CHANGE_FIELD_REGISTER_FORM,
			payload: field,
		};
	}
}

function register(login, password) {
	return async dispatch => {
		const registrationRequest = {
			username: login,
			password: password,
		};

		const response = await auth.register(registrationRequest);

		if (response.status === 400) {
			dispatch({
				type: HANDLE_REGISTER,
				payload: {
					login: {
						text: '',
						empty: true,
					},

					password: {
						text: '',
						empty: true,
					},

					infoMassageText: 'This username is already taken',
				},
			});
		} else {
			window.location.replace('/');
		}

		dispatch({
			type: HANDLE_REGISTER,
			payload: {
				login: {
					text: '',
					empty: true,
				},

				password: {
					text: '',
					empty: true,
				},
			},
		});
	};
}
