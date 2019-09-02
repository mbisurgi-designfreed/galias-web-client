import _ from 'lodash';

const proveedorSelector = (proveedores) => {
    const list = _.map(proveedores, (articulo) => {
        return articulo;
    });

    return list;
};

export default proveedorSelector;