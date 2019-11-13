'use strict';

const initialState = {
    notes: [],
};

export function crudReducer(state = initialState, action) {
    switch(action.type) {
        case 'LOAD_NOTES':
            return Object.assign({}, state, action.payload);
        
        default:
            return state;
    }
}