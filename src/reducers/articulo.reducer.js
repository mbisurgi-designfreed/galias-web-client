import _ from 'lodash';

const ArticuloReducer = (state = {}, action) => {
    switch (action.type) {
        case 'articulos_loading':
            return { ...state, loading: true };
        case 'articulos_adding':
            return { ...state, loading: true };
        case 'articulos_adding_done':
            return { ...state, loading: false };
        case 'articulos_editing':
            return { ...state, loading: true };
        case 'articulos_editing_done':
            return { ...state, loading: false };
        case 'articulos_list':
            return { ...state, articulos: _.mapKeys(action.payload.articulos, '_id'), pages: action.payload.pages, loading: false };
        default:
            return state;
    }
};

export default ArticuloReducer;