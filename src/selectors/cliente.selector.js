import _ from 'lodash';

const clienteSelector = (clientes, { text, searchBy, sortBy }) => {
    const list = _.map(clientes, (cliente) => {
        return cliente;
    });

    return list.filter((cliente) => {
        if (searchBy === 'razonSocial') {
            const textMatch = cliente.razonSocial.toLowerCase().includes(text.toLowerCase());

            return textMatch;
        }

        if (searchBy === 'codigo') {
            const textMatch = cliente.codigo.toString().includes(text);

            return textMatch;
        }

        if (searchBy === 'cuit') {
            const textMatch = cliente.cuit.toLowerCase().includes(text.toLowerCase());

            return textMatch;
        }
    });
};

export default clienteSelector;