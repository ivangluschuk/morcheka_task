'use strict';

export const CHANGE_FIELD_TABLE = 'CHANGE_FIELD_TABLE';
export const LOAD_TABLE = 'LOAD_TABLE';

const initialState = {
	rows: [],
};

export function tableReducer(state = initialState, action) {
	switch (action.type) {
		case CHANGE_FIELD_TABLE:
			return Object.assign({}, state, action.payload);

		case LOAD_TABLE:
			return Object.assign({}, state, action.payload);

		default:
			return state;
	}
}
