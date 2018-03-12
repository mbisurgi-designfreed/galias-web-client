const grupoReducer = (state = [], action) => {
    switch(action.type) {
        case 'grupos_list':
            return action.payload.grupos;
        default:
            return state;
    }
};

export default grupoReducer;