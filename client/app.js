import React from 'react'
import ReactDOM from 'react-dom'
import promise from 'redux-promise'

import { createStore, combineReducers, applyMiddleware, compose } from 'redux'
import { Provider } from 'react-redux'
import { Router, Route, IndexRoute, browserHistory } from 'react-router'
import { syncHistoryWithStore, routerReducer } from 'react-router-redux'

import * as reducers from './reducers'
import HomeContainer from './containers/HomeContainer'
import AppContainer from './containers/AppContainer'
import RecordingContainer from './containers/RecordingContainer'

const reducer = combineReducers({
  ...reducers,
  routing: routerReducer
});

const enhancer = compose(applyMiddleware(promise));
const initialState = {
  recording: {
    allRecordings: window.G_RECORDINGS || null
  }
};
const store = createStore(reducer, initialState, enhancer);
const history = syncHistoryWithStore(browserHistory, store);

ReactDOM.render(
  <Provider store={store}>
    <div>
      <Router history={history}>
        <Route path="/" component={AppContainer}>
          <IndexRoute component={HomeContainer}/>
          <Route path="recording/:recordingId" component={RecordingContainer}/>
        </Route>
      </Router>
    </div>
  </Provider>,
  document.getElementById('mount')
)

