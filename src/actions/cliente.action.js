import axios from 'axios';

const API_URL = process.env.REACT_APP_API_URL;

export const list = (page) => {
    return async (dispatch) => {
        const URL = `${API_URL}/api/cliente/list?page=${page}`;

        dispatch({
            type: 'clientes_loading'
        });

        try {
            const res = await axios.get(URL);

            if (res) {
                dispatch({
                    type: 'clientes_list',
                    payload: res.data
                })
            }
        } catch (err) {
            console.log(err);
        }
    }
};
