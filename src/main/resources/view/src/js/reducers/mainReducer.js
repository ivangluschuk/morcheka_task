'use strict';

import { combineReducers } from 'redux';
import { crudReducer } from './crudReducer.js';
import { loginReducer } from './loginReducer.js';
import { noteAdderReducer } from './noteAdderReducer.js';
import { registerReducer } from './registerReducer.js';
import { tableReducer } from './tableReducer.js';
import { appReducer } from './appReducer';

export const rootReducer = combineReducers({
	crud: crudReducer,
	login: loginReducer,
	noteAdder: noteAdderReducer,
	register: registerReducer,
	table: tableReducer,
	app: appReducer,
});
