const ClienteSelectedReducer = (state = {}, action) => {
    switch (action.type) {
        case 'cliente_selected':
            return action.payload;
        default:
            return state;
    }
};

export default ClienteSelectedReducer;