const AuthReducer = (state = {}, action) => {
    switch (action.type) {
        case 'authenticate':
            return { ...state, authenticate: true };
        default:
            return state;
    }
}

export default AuthReducer;