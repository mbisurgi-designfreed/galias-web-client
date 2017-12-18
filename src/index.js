import React from 'react';
import ReactDOM from 'react-dom';
import ReduxThunk from 'redux-thunk';
import { Provider } from 'react-redux';
import { createStore, combineReducers, applyMiddleware } from 'redux';
import { reducer as FormReducer } from 'redux-form';
import { SocketProvider } from 'socket.io-react';
import io from 'socket.io-client';
import registerServiceWorker from './registerServiceWorker';

import AuthReducer from './reducers/auth.reducer';
import InfoReducer from './reducers/info.reducer';
import InfoSelectedReducer from './reducers/info-selected.reducer';
import ClienteReducer from './reducers/cliente.reducer';

import App from './components/app.component';

const reducers = combineReducers({ form: FormReducer, auth: AuthReducer, info: InfoReducer, selectedInfo: InfoSelectedReducer, cliente: ClienteReducer });
const middleware = applyMiddleware(ReduxThunk);
const store = createStore(reducers, {}, middleware);
const token = localStorage.getItem('token');

const socket = io.connect(process.env.REACT_APP_API_URL);

if (token) {
    store.dispatch({
        type: 'authenticate'
    });
}

ReactDOM.render(
    <Provider store={store}>
        <SocketProvider socket={socket} >
            <App />
        </SocketProvider>
    </Provider>,
    document.getElementById('root'));
registerServiceWorker();
