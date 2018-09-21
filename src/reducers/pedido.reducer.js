import _ from 'lodash';

const pedidoReducer = (state = {}, action) => {
    switch (action.type) {
        case 'pedido_loading':
            return { ...state, loading: true };
        case 'pedido_add':
            const pedidos = {
                ...state.pedidos
            };

            pedidos[action.payload._id] = action.payload;

            return { ...state,  pedidos};
        case 'pedido_list':
            return { ...state, pedidos: _.mapKeys(action.payload, '_id'), loading: false };
        case 'pedido_pendiente_list':
            return { ...state, pendientes: _.mapKeys(action.payload, '_id'), loading: false };
        default:
            return state;
    }
}

export default pedidoReducer;