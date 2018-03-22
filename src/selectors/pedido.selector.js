const pedidoSelector = (pedidos, { text, searchBy, sortBy }) => {
    const list = _.map(pedidos, (pedido) => {
        return pedido;
    });

    return list.filter((pedido) => {
        if (searchBy === 'cliente') {
            const textMatch = pedido.cliente.razonSocial.toLowerCase().includes(text.toLowerCase());

            return textMatch;
        }

        if (searchBy === 'estado') {
            const textMatch = pedido.estado.toLowerCase().includes(text.toLowerCase());

            return textMatch;
        }
    });
};

export default pedidoSelector;