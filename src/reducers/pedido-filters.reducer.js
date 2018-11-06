const pedidoFiltersReducer = (state = { text: '', searchBy: 'cliente' }, action) => {
    switch (action.type) {
        case 'edit_text_filter':
            return { ...state, text: action.payload };
        case 'search_by_cliente':
            return { ...state, searchBy: 'cliente' };
        case 'search_by_estado':
            return { ...state, searchBy: 'estado' };
            case 'search_by_vendedor':
            return { ...state, searchBy: 'vendedor' };
        case 'reset':
            return { text: '', searchBy: 'cliente' };
        default:
            return state;
    }
};

export default pedidoFiltersReducer;