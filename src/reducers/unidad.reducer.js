const UnidadReducer = (state = [], action) => {
    switch(action.type) {
        case 'unidades_list':
            return action.payload.unidades;
        default:
            return state;
    }
};

export default UnidadReducer;