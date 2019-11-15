'use strict';

export const CHANGE_FIELD_LOGIN_FORM = 'CHANGE_FIELD_LOGIN_FORM';
export const HANDLE_LOGIN = 'HANDLE_LOGIN';

const initialState = {
    loginIsEmpty: true,
    passwordIsEmpty: true,
    infoMassageText: "",
};

export function loginReducer(state = initialState, action) {
    switch(action.type) {
        case CHANGE_FIELD_LOGIN_FORM:
            return Object.assign({}, state, action.payload);

        case HANDLE_LOGIN:
            return Object.assign({}, state, action.payload);
        
        default:
            return state;
    }
}