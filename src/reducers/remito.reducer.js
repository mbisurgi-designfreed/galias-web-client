import _ from 'lodash';

const remitoReducer = (state = {}, action) => {
    switch (action.type) {
        case 'remito_loading':
            return { ...state, loading: true };
        case 'remitos_adding':
            return { ...state, loading: true };
        case 'remitos_adding_done':
            return { ...state, loading: false };
        case 'remito_list':
            return { ...state, remitos: _.mapKeys(action.payload, '_id'), loading: false };
        default:
            return state;
    }
}

export default remitoReducer;