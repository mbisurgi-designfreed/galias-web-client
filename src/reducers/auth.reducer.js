const AuthReducer = (state = {}, action) => {
    switch (action.type) {
        case 'authenticate':
            return { ...state, authenticate: true, error: '' };
        case 'unauthenticate':
            return { ...state, authenticate: false, error: '' };
        case 'auth_error':
            return { ...state, error: action.payload };
        default:
            return state;
    }
}

export default AuthReducer;