import _ from 'lodash';

const talonarioReducer = (state = {}, action) => {
    switch (action.type) {
        case 'talonario_loading':
            return { ...state, loading: true };
        case 'talonarios_adding':
            return { ...state, loading: true };
        case 'talonarios_adding_done':
            return { ...state, loading: false };
        case 'talonario_list':
            return { ...state, talonarios: _.mapKeys(action.payload, '_id'), loading: false };
        case 'proximo_get':
            return { ...state, proximo: action.payload };
        default:
            return state;
    }
}

export default talonarioReducer;