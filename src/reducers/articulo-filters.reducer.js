const articuloFiltersReducer = (state = { text: '', searchBy: 'descripcion' }, action) => {
    switch (action.type) {
        case 'edit_text_filter':
            return { ...state, text: action.payload };
        case 'search_by_descripcion':
            return { ...state, searchBy: 'descripcion' };
        case 'search_by_codigo':
            return { ...state, searchBy: 'codigo' };
        case 'reset':
            return { text: '', searchBy: 'descripcion' };
        default:
            return state;
    }
};

export default articuloFiltersReducer;