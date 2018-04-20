import _ from 'lodash';

const entregaReducer = (state = {}, action) => {
    switch (action.type) {
        case 'entrega_loading':
            return { ...state, loading: true };
        case 'entregas_adding':
            return { ...state, loading: true };
        case 'entregas_adding_done':
            return { ...state, loading: false };
        case 'entrega_list':
            return { ...state, entregas: _.mapKeys(action.payload, '_id'), loading: false };
        default:
            return state;
    }
}

export default entregaReducer;