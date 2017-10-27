import React from 'react';
import ReactDOM from 'react-dom';
import ReduxThunk from 'redux-thunk';
import { Provider } from 'react-redux';
import { createStore, combineReducers, applyMiddleware } from 'redux';
import registerServiceWorker from './registerServiceWorker';

import AuthReducer from './reducers/auth.reducer';

import App from './components/app.component';

const reducers = combineReducers({ auth: AuthReducer });
const middleware = applyMiddleware(ReduxThunk);
const store = createStore(reducers, {}, middleware);

ReactDOM.render(
    <Provider store={store}>
        <App />
    </Provider>,
    document.getElementById('root'));
registerServiceWorker();
