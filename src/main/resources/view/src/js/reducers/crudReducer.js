'use strict';

export const RELOAD_CRUD = 'RELOAD_CRUD';
export const LOAD_NOTES = 'LOAD_NOTES';

const initialState = {
    notes: [],
};

export function crudReducer(state = initialState, action) {
    switch(action.type) {
        case LOAD_NOTES:
            return Object.assign({}, state, action.payload);

        case RELOAD_CRUD:
            return state;
        
        default:
            return state;
    }
}