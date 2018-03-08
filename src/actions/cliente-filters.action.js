export const setTextFilter = (text = '') => ({
    type: 'edit_text_filter_cliente',
    payload: text
});

export const searchByRazonSocial = () => ({
    type: 'search_by_razon_social'
});

export const searchByCodigo = () => ({
    type: 'search_by_codigo_cliente'
});

export const searchByCuit = () => ({
    type: 'search_by_cuit'
});