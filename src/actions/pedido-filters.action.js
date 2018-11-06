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

export const searchByVendedor = () => ({
    type: 'search_by_vendedor'
});