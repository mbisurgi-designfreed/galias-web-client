import { createStore, combineReducers, applyMiddleware, compose } from 'redux';
import thunk from 'redux-thunk';

import authReducer from '../reducers/auth.reducer';
import infoReducer from '../reducers/info.reducer';
import infoSelectedReducer from '../reducers/info-selected.reducer';
import canalReducer from '../reducers/canal.reducer';
import subcanalReducer from '../reducers/subcanal.reducer';
import clienteReducer from '../reducers/cliente.reducer';
import clienteFiltersReducer from '../reducers/cliente-filters.reducer';

const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;

export default () => {
    const store = createStore(
        combineReducers({
            auth: authReducer, 
            info: infoReducer, 
            selectedInfo: infoSelectedReducer, 
            cliente: clienteReducer, 
            clienteFilters: clienteFiltersReducer,
            canal: canalReducer, 
            subcanal: subcanalReducer
        }),
        composeEnhancers(applyMiddleware(thunk))
    );

    return store;
}