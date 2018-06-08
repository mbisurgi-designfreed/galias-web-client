import React from 'react';
import ReactDOM from 'react-dom';
import ReduxThunk from 'redux-thunk';
import { Provider } from 'react-redux';

import 'react-select/dist/react-select.css';
import 'react-responsive-carousel/lib/styles/carousel.min.css';
import 'react-accessible-accordion/dist/minimal-example.css';
import 'react-accessible-accordion/dist/fancy-example.css';
import './scss/styles.scss';

import configureStore from './store/configureStore';

import AppRouter from './routers/app.router';

const store = configureStore();
const token = localStorage.getItem('token');

if (token) {
    store.dispatch({
        type: 'authenticate'
    });
}

const app = (
    <Provider store={store}>
        <AppRouter />
    </Provider>
);

ReactDOM.render(app, document.getElementById('app'));

