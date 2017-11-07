import React from 'react';
import ReactDOM from 'react-dom';
import ReduxThunk from 'redux-thunk';
import { Provider } from 'react-redux';
import { createStore, combineReducers, applyMiddleware } from 'redux';
import { reducer as FormReducer } from 'redux-form';
import io from 'socket.io-client';
import registerServiceWorker from './registerServiceWorker';

import AuthReducer from './reducers/auth.reducer';
import InfoReducer from './reducers/info.reducer';
import SocketReducer from './reducers/socket.reducer';
import InfoSelectedReducer from './reducers/info-selected.reducer';

import App from './components/app.component';

const reducers = combineReducers({ form: FormReducer, auth: AuthReducer, info: InfoReducer, socket: SocketReducer, selectedInfo: InfoSelectedReducer });
const middleware = applyMiddleware(ReduxThunk);
const store = createStore(reducers, {}, middleware);
const token = localStorage.getItem('token');

if (token) {
    store.dispatch({
        type: 'authenticate'
    });
}

store.dispatch({
    type: 'socket_connection',
    payload: io.connect("http://localhost:4000")
});

ReactDOM.render(
    <Provider store={store}>
        <App />
    </Provider>,
    document.getElementById('root'));
registerServiceWorker();
