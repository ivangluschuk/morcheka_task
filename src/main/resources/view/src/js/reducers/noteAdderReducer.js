'use strict';

const initialState = {
    firstName: ["", true],
    lastName: ["", true],
    address: ["", true],
    phone: ["", true],
};

export function noteAdderReducer(state = initialState, action) {
    switch(action.type) {
        case 'HANDLE_ADD_NOTE':
            return Object.assign({}, state, action.payload);

        case 'HANDLE_LOGOUT':
            return state;

        case 'CHANGE_FIELD_NOTE_ADDER_FORM':
            return Object.assign({}, state, action.payload);
        
        default:
            return state;
    }
}