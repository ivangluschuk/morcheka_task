'use strict';

const initialState = {
    editDisable: true,
    buttonMode: 0,
    nameIsEmpty: true,
    lastNameIsEmpty: true,
    addressIsEmpty: true,
    phone: true,
};

export function tableReducer(state = initialState, action) {
    switch(action.type) {
        case 'HANDLE_ADD_NOTE':
            return Object.assign({}, state, action.payload);
        
        default:
            return state;
    }
}