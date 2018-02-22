export const setTextFilter = (text = '') => ({
    type: 'edit_text_filter',
    payload: text
});

export const searchByCliente = () => ({
    type: 'search_by_cliente'
});

export const searchByEstado = () => ({
    type: 'search_by_estado'
});