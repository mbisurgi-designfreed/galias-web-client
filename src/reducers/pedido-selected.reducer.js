import _ from 'lodash';

const pedidoSelectedReducer = (state = {}, action) => {
    switch (action.type) {
        case 'pedido_selected':
            return action.payload;
        case 'pedido_unselected':
            return {};
        case 'unselect':
            return {};
        default:
            return state;
    }
};

export default pedidoSelectedReducer;