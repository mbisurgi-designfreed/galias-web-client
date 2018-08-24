import axios from 'axios';

const API_URL = process.env.REACT_APP_API_URL;

export const list = (desde, hasta) => {
    return async (dispatch) => {
        const URL = `${API_URL}/api/pedido/fecha?desde=${desde}&hasta=${hasta}`;

        dispatch({
            type: 'pedido_loading'
        });

        try {
            const res = await axios.get(URL, { headers: { authorization: localStorage.getItem('token') } });

            if (res) {
                dispatch({
                    type: 'pedido_list',
                    payload: res.data
                });
            }
        } catch (err) {
            console.log(err);
        }
    }
};

export const listToday = () => {
    return async (dispatch) => {
        const URL = `${API_URL}/api/pedido/today`;

        dispatch({
            type: 'pedido_loading'
        });

        try {
            const res = await axios.get(URL, { headers: { authorization: localStorage.getItem('token') } });

            if (res) {
                dispatch({
                    type: 'pedido_list',
                    payload: res.data
                });
            }
        } catch (err) {
            console.log(err);
        }
    }
};

export const pendienteCliente = (cliente) => {
    return async (dispatch) => {
        const URL = `${API_URL}/api/pedido/pendiente/${cliente}`;

        dispatch({
            type: 'pedido_loading'
        });

        try {
            const res = await axios.get(URL, { headers: { authorization: localStorage.getItem('token') } });

            if (res) {
                dispatch({
                    type: 'pedido_pendiente_list',
                    payload: res.data
                });
            }
        } catch (err) {
            console.log(err);
        }
    }
};

export const select = (pedido, checked) => {
    if (checked) {
        return {
            type: 'pedido_selected',
            payload: pedido
        }
    }

    return {
        type: 'pedido_unselected'
    }
};

export const anular = (id, history) => {
    return async (dispatch) => {
        const URL = `${API_URL}/api/pedido/anular`;

        dispatch({
            type: 'pedido_loading'
        });

        try {
            const res = await axios.post(URL, { id });

            if (res.status === 201) {
                history.push('/pedidos');
            }
        } catch (err) {
            console.log(err);
        }
    }
}