'use strict';

export const SET_MODE_REGISTER = 'SET_MODE_REGISTER';
export const SET_MODE_LOGIN = 'SET_MODE_LOGIN';
export const SET_MODE_CRUD = 'SET_MODE_CRUD';

const initialState = {
    inputRegisterLoginValue: "",
    inputRegisterPasswordValue: "",
    mode: 0,
};

export function appReducer(state = initialState, action) {
    switch(action.type) {
        case SET_MODE_REGISTER:
            return Object.assign({}, state, action.payload);

        case SET_MODE_LOGIN:
            return Object.assign({}, state, action.payload);

        case SET_MODE_CRUD:
            return Object.assign({}, state, action.payload);
        
        default:
            return state;
    }
}