import _ from 'lodash';

const pedidoSelectedReducer = (state = {}, action) => {
    switch (action.type) {
        case 'pedido_selected':
            return { ...state, [action.payload._id]: action.payload };
        case 'pedido_unselected':
            return _.omit(state, action.payload._id);
        case 'unselect':
            return {};
        default:
            return state;
    }
};

export default pedidoSelectedReducer;