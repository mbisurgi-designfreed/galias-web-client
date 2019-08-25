import { createStore, combineReducers, applyMiddleware, compose } from 'redux';
import { reducer as notificationsReducer } from 'react-notification-system-redux';
import thunk from 'redux-thunk';

import authReducer from '../reducers/auth.reducer';
import alertReducer from '../reducers/alert.reducer';
import infoReducer from '../reducers/info.reducer';
import infoSelectedReducer from '../reducers/info-selected.reducer';
import unidadReducer from '../reducers/unidad.reducer';
import canalReducer from '../reducers/canal.reducer';
import subcanalReducer from '../reducers/subcanal.reducer';
import familiaReducer from '../reducers/familia.reducer';
import grupoReducer from '../reducers/grupo.reducer';
import subgrupoReducer from '../reducers/subgrupo.reducer';
import clienteReducer from '../reducers/cliente.reducer';
import clienteFiltersReducer from '../reducers/cliente-filters.reducer';
import articuloReducer from '../reducers/articulo.reducer';
import articuloFiltersReducer from '../reducers/articulo-filters.reducer';
import pedidoReducer from '../reducers/pedido.reducer';
import pedidoSelectedReducer from '../reducers/pedido-selected.reducer';
import pedidoFiltersReducer from '../reducers/pedido-filters.reducer';
import remitoReducer from '../reducers/remito.reducer';
import remitoSelectedReducer from '../reducers/remito-selected.reducer';
import talonarioReducer from '../reducers/talonario.reducer';
import articuloCompetenciaReducer from '../reducers/articuloCompetencia.reducer';

const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;

export default () => {
    const store = createStore(
        combineReducers({
            auth: authReducer,
            alerts: alertReducer,
            info: infoReducer,
            selectedInfo: infoSelectedReducer,
            cliente: clienteReducer,
            clienteFilters: clienteFiltersReducer,
            articulo: articuloReducer,
            articuloFilters: articuloFiltersReducer,
            pedido: pedidoReducer,
            selectedPedido: pedidoSelectedReducer,
            pedidoFilters: pedidoFiltersReducer,
            remito: remitoReducer,
            selectedRemito: remitoSelectedReducer,
            talonario: talonarioReducer,
            canal: canalReducer,
            subcanal: subcanalReducer,
            familia: familiaReducer,
            grupo: grupoReducer,
            subgrupo: subgrupoReducer,
            unidad: unidadReducer,
            notifications: notificationsReducer,
                articuloCompetencia: articuloCompetenciaReducer,
        }),
        composeEnhancers(applyMiddleware(thunk))
    );

    return store;
}