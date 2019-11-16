'use strict';

export const HANDLE_LOGOUT = 'HANDLE_LOGOUT';
export const HANDLE_ADD_NOTE_NOTE_ADDER_FORM = 'HANDLE_ADD_NOTE';
export const CHANGE_FIELD_NOTE_ADDER_FORM = 'CHANGE_FIELD_NOTE_ADDER_FORM';

const initialState = {

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
};

export function noteAdderReducer(state = initialState, action) {
    switch(action.type) {
        case HANDLE_LOGOUT:
            return state;

        case HANDLE_ADD_NOTE_NOTE_ADDER_FORM:
            return Object.assign({}, state, action.payload);

        case CHANGE_FIELD_NOTE_ADDER_FORM:
            return Object.assign({}, state, action.payload);
        
        default:
            return state;
    }
}