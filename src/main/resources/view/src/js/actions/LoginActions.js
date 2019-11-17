'use strict';

import { CHANGE_FIELD_LOGIN_FORM } from '../reducers/loginReducer';
import { HANDLE_LOGIN } from '../reducers/loginReducer';

import { auth } from '../util/server.api.auth.js';

export const loginActions = {
	onFieldChange: onFieldChange,
	login: login,
};

function onFieldChange(field, value) {
	if (value.length > 0) {
		field.empty = false;
		field.text = value;

		return {
			type: CHANGE_FIELD_LOGIN_FORM,
			payload: field,
		};
	} else {
		field.empty = true;
		field.text = value;

		return {
			type: CHANGE_FIELD_LOGIN_FORM,
			payload: field,
		};
	}
}

function login(login, password) {
	return async dispatch => {
		const authenticationRequest = `username=${login}&password=${password}`;

		const response = await auth.login(authenticationRequest);
		const url = response.url;

		if (url.includes('/notes')) {
			window.location.replace('/');
		} else if (url.includes('?error')) {
			dispatch({
				type: HANDLE_LOGIN,
				payload: {
					login: {
						text: '',
						empty: true,
					},

					password: {
						text: '',
						empty: true,
					},

					infoMassageText: 'Credentials are bad',
				},
			});
		}

		dispatch({
			type: HANDLE_LOGIN,
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
