import _ from 'lodash';

const ArticuloCompetenciaReducer = (state = {}, action) => {
    switch (action.type) {
        case 'articulos_competencia_loading':
            return { ...state, loading: true };
        case 'articulos_competencia_adding':
            return { ...state, loading: true };
        case 'articulos_competencia_adding_done':
            return { ...state, loading: false };
        case 'articulos_competencia_editing':
            return { ...state, loading: true };
        case 'articulos_competencia_editing_done':
            return { ...state, loading: false };
        case 'articulos_competencia_list':
            return { ...state, articulos: _.mapKeys(action.payload.articulos, '_id'), pages: action.payload.pages, loading: false };
        default:
            return state;
    }
};

export default ArticuloCompetenciaReducer;