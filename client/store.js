import { createStore, applyMiddleware, compose } from 'redux';
import { syncHistoryWithStore } from 'react-router-redux';
import { browserHistory } from 'react-router'
import rootReducer from './reducers/index';

import React from 'react';
import Bin from './components/Bin';

/*
  Store

  Redux apps have a single store which takes
  1. All Reducers which we combined into `rootReducer`
  2. An optional starting state - similar to React's getInitialState
*/
const enhancers = compose(
  window.devToolsExtension ? window.devToolsExtension() : f => f
);

const bins = {defaultSwapTime: 40, swapBinTime: 40, bins:["binRed", "binGreen", "binBlue"]};
const bombs = {bombsPlaced: 0, spawnBombTime: 5, score: 0};

const configStore = function configureStore(initialState) {
  return createStore(
      rootReducer,
      {
        bombs,
        bins
      }
  );
}

const store = configStore();

/*
  Enable Hot Reloading for the reducers
  We re-require() the reducers whenever any new code has been written.
  Webpack will handle the rest
*/

if(module.hot) {
  module.hot.accept('./reducers/', () => {
    const nextRootReducer = require('./reducers/index').default;
    store.replaceReducer(nextRootReducer);
  });
}

export const history = syncHistoryWithStore(browserHistory, store);
export default store;
