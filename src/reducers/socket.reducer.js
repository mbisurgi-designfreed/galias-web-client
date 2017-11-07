const SocketReducer = (state = {}, action) => {
    switch (action.type) {
        case 'socket_connection':
            return { ...state, socket: action.payload };
        default:
            return state;
    }
};

export default SocketReducer;
