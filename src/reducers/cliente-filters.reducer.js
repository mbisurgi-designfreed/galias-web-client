const clienteFiltersReducer = (state = { text: '', searchBy: 'razonSocial' }, action) => {
    switch (action.type) {
        case 'edit_text_filter':
            return { ...state, text: action.payload };
        case 'search_by_razon_social':
            return { ...state, searchBy: 'razonSocial' };
        case 'search_by_codigo':
            return { ...state, searchBy: 'codigo' };
        case 'search_by_cuit':
            return { ...state, searchBy: 'cuit' };
        case 'reset':
            return { text: '', searchBy: 'razonSocial' };
        default:
            return state;
    }
};

export default clienteFiltersReducer;