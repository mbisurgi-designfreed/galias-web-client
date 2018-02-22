import { createStore, combineReducers, applyMiddleware, compose } from 'redux';
import { reducer as notificationsReducer } from 'react-notification-system-redux';
import thunk from 'redux-thunk';

import authReducer from '../reducers/auth.reducer';
import infoReducer from '../reducers/info.reducer';
import infoSelectedReducer from '../reducers/info-selected.reducer';
import canalReducer from '../reducers/canal.reducer';
import subcanalReducer from '../reducers/subcanal.reducer';
import clienteReducer from '../reducers/cliente.reducer';
import clienteFiltersReducer from '../reducers/cliente-filters.reducer';
import articuloReducer from '../reducers/articulo.reducer';
import articuloFiltersReducer from '../reducers/articulo-filters.reducer';
import pedidoReducer from '../reducers/pedido.reducer';
import pedidoFiltersReducer from '../reducers/pedido-filters.reducer';

const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;

export default () => {
    const store = createStore(
        combineReducers({
            auth: authReducer,
            info: infoReducer,
            selectedInfo: infoSelectedReducer,
            cliente: clienteReducer,
            clienteFilters: clienteFiltersReducer,
            articulo: articuloReducer,
            articuloFilters: articuloFiltersReducer,
            pedidos: pedidoReducer,
            pedidoFilters: pedidoFiltersReducer,
            canal: canalReducer,
            subcanal: subcanalReducer,
            notifications: notificationsReducer
        }),
        composeEnhancers(applyMiddleware(thunk))
    );

    return store;
}