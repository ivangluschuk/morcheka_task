'use strict';

export const CHANGE_FIELD_TABLE = 'CHANGE_FIELD_TABLE';

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
        case CHANGE_FIELD_TABLE:
            return Object.assign({}, state, action.payload);
        
        default:
            return state;
    }
}