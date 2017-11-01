import React from 'react';
import ReactDOM from 'react-dom';
import ReduxThunk from 'redux-thunk';
import { Provider } from 'react-redux';
import { createStore, combineReducers, applyMiddleware } from 'redux';
import { reducer as FormReducer } from 'redux-form';
import registerServiceWorker from './registerServiceWorker';

import AuthReducer from './reducers/auth.reducer';
import InfoReducer from './reducers/info.reducer';
import InfoSelectedReducer from './reducers/info-selected.reducer';

import App from './components/app.component';

const reducers = combineReducers({ form: FormReducer, auth: AuthReducer, info: InfoReducer, selectedInfo: InfoSelectedReducer });
const middleware = applyMiddleware(ReduxThunk);
const store = createStore(reducers, {}, middleware);
const token = localStorage.getItem('token');

if (token) {
    store.dispatch({
      type: 'authenticate'
    });
  }

ReactDOM.render(
    <Provider store={store}>
        <App />
    </Provider>,
    document.getElementById('root'));
registerServiceWorker();
