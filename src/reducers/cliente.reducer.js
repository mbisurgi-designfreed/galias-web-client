import _ from 'lodash';

const ClienteReducer = (state = {}, action) => {
    switch (action.type) {
        case 'clientes_loading':
            return { ...state, loading: true };
        case 'clientes_list':
            return { ...state, clientes: _.mapKeys(action.payload.clientes, '_id'), pages: action.payload.pages, loading: false };
        default:
            return state;
    }
};

export default ClienteReducer;