import { combineReducers } from 'redux';

import { routerReducer } from 'react-router-redux'; // we need this for react-router
import {circles, bins, bombs} from './figures';

// Combine all our reducers togeher
const rootReducer = combineReducers({ circles, bins, bombs, routing: routerReducer });

export default rootReducer;
