import { combineReducers } from 'redux';

import { routerReducer } from 'react-router-redux'; // we need this for react-router
import {liveBombs, bins, bombs} from './bombs';

// Combine all our reducers togeher
const rootReducer = combineReducers({ liveBombs, bins, bombs, routing: routerReducer });

export default rootReducer;
