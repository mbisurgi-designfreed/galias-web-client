import _ from 'lodash';

const articuloSelector = (articulos, { text, searchBy, sortBy }) => {
    const list = _.map(articulos, (articulo) => {
        return articulo;
    });

    return list.filter((articulo) => {
        if (searchBy === 'descripcion') {
            const textMatch = cliente.razonSocial.toLowerCase().includes(text.toLowerCase());

            return textMatch;
        }

        if (searchBy === 'codigo') {
            const textMatch = cliente.codigo.toString().includes(text);

            return textMatch;
        }
    });
};

export default articuloSelector;