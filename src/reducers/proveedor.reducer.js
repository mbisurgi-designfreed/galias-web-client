import _ from 'lodash';

const ProveedorReducer = (state = {}, action) => {
    switch (action.type) {
        case 'proveedores_loading':
            return { ...state, loading: true };
        case 'proveedores_adding':
            return { ...state, loading: true };
        case 'proveedores_adding_done':
            return { ...state, loading: false };
        case 'proveedores_editing':
            return { ...state, loading: true };
        case 'proveedores_editing_done':
            return { ...state, loading: false };
        case 'proveedores_list':
            return { ...state, proveedores: _.mapKeys(action.payload.proveedores, '_id'), pages: action.payload.pages, loading: false };
        default:
            return state;
    }
};

export default ProveedorReducer;