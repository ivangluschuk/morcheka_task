'use strict';

import { createStore, applyMiddleware } from 'redux';
import { rootReducer } from '../reducers/mainReducer.js';
import thunk from 'redux-thunk';

export const store = createStore(rootReducer, applyMiddleware(thunk));
