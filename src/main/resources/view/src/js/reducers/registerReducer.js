'use strict';

export const CHANGE_FIELD_REGISTER_FORM = 'CHANGE_FIELD_REGISTER_FORM';
export const HANDLE_REGISTER = 'HANDLE_REGISTER';

const initialState = {
    loginIsEmpty: true,
    passwordIsEmpty: true,
    buttonMode: false,
    infoMassageText: "",
};

export function registerReducer(state = initialState, action) {
    switch(action.type) {
        case CHANGE_FIELD_REGISTER_FORM:
            return Object.assign({}, state, action.payload);

        case HANDLE_REGISTER:
            return Object.assign({}, state, action.payload);
        
        default:
            return state;
    }
}