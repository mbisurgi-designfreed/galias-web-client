import React from 'react';
import ReactDOM from 'react-dom';
import ReduxThunk from 'redux-thunk';
import { Provider } from 'react-redux';
// import { createStore, combineReducers, applyMiddleware } from 'redux';
// import { reducer as FormReducer } from 'redux-form';
import { SocketProvider } from 'socket.io-react';
import io from 'socket.io-client';
// import registerServiceWorker from './registerServiceWorker';

import 'react-select/dist/react-select.css';
import './scss/styles.scss';

import configureStore from './store/configureStore';

// import AuthReducer from './reducers/auth.reducer';
// import InfoReducer from './reducers/info.reducer';
// import InfoSelectedReducer from './reducers/info-selected.reducer';
// import CanalReducer from './reducers/canal.reducer';
// import SubcanalReducer from './reducers/subcanal.reducer';
// import ClienteReducer from './reducers/cliente.reducer';

// import App from './components/app.component';
import AppRouter from './routers/app.router';

// const reducers = combineReducers({ form: FormReducer, auth: AuthReducer, info: InfoReducer, selectedInfo: InfoSelectedReducer, cliente: ClienteReducer, canal: CanalReducer, subcanal: SubcanalReducer });
// const middleware = applyMiddleware(ReduxThunk);
const store = configureStore();
const token = localStorage.getItem('token');

const socket = io.connect(process.env.REACT_APP_API_URL);

if (token) {
    store.dispatch({
        type: 'authenticate'
    });
}

const app = (
    <Provider store={store}>
        <SocketProvider socket={socket} >
            <AppRouter />
        </SocketProvider>
    </Provider>
);

ReactDOM.render(app, document.getElementById('app'));

// ReactDOM.render(
//     <Provider store={store}>
//         <SocketProvider socket={socket} >
//             <AppRouter />
//         </SocketProvider>
//     </Provider>,
//     document.getElementById('root'));
// registerServiceWorker();
