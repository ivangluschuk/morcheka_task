'use strict';

import { SET_MODE_REGISTER } from '../reducers/appReducer';
import { SET_MODE_LOGIN } from '../reducers/appReducer';
import { SET_MODE_CRUD } from '../reducers/appReducer';

export const appActions = {
	toLoginPage: toLoginPage,
	toCrudPage: toCrudPage,
	toRegisterPage: toRegisterPage,
};

function toLoginPage() {
	if (ifToCrudPage()) {
		return {
			type: SET_MODE_CRUD,
			payload: {
				mode: 2,
			},
		};
	} else {
		return {
			type: SET_MODE_LOGIN,
			payload: {
				mode: 0,
			},
		};
	}
}

function toRegisterPage() {
	if (ifToCrudPage()) {
		return {
			type: SET_MODE_CRUD,
			payload: {
				mode: 2,
			},
		};
	} else {
		return {
			type: SET_MODE_REGISTER,
			payload: {
				mode: 1,
			},
		};
	}
}

function toCrudPage(mode) {
	if (ifToCrudPage()) {
		return {
			type: SET_MODE_CRUD,
			payload: {
				mode: 2,
			},
		};
	} else if (mode === 0) {
		return {
			type: SET_MODE_LOGIN,
			payload: {
				mode: 0,
			},
		};
	} else {
		return {
			type: SET_MODE_REGISTER,
			payload: {
				mode: 1,
			},
		};
	}
}

function ifToCrudPage() {
	const href = document.location.href.split('/');

	return href[href.length - 1] === 'notes';
}
