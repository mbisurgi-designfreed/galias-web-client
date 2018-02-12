export const setTextFilter = (text = '') => ({
    type: 'edit_text_filter',
    payload: text
});

export const searchByDescripcion = () => ({
    type: 'search_by_descripcion'
});

export const searchByCodigo = () => ({
    type: 'search_by_codigo'
});
