import axios from 'axios';

const API_URL = 'http://localhost:4000';

export const signin = ({ email, password }, history) => {
    return async (dispatch) => {
        const URL = `${API_URL}/signin`;

        try {
            const res = await axios.post(URL, { email, password });

            if (res) {
                localStorage.setItem('token', res.data.token);
                history.push('/');
                dispatch({
                    type: 'authenticate'
                });
            }
        } catch (err) {
            dispatch({
                type: 'auth_error',
                payload: 'Mail o contraseña incorrectos'
            });
        }
    }
};

export const signout = () => {
    return (dispatch) => {
        localStorage.removeItem('token');
        dispatch({
            type: 'unauthenticate'
        });
    }
};