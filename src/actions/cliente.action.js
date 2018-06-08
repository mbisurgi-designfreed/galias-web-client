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

export const pendiente = (id) => {
    return async (dispatch) => {
        const URL = `${API_URL}/api/cliente/${id}/pendiente`;

        dispatch({
            type: 'clientes_loading'
        });

        try {
            const res = await axios.get(URL);

            if (res) {
                dispatch({
                    type: 'clientes_ped_pendiente_list',
                    payload: res.data
                })
            }
        } catch (err) {
            console.log(err);
        }
    }
};

export const reset = () => {
    return {
        type: 'clientes_pendiente_reset'
    }
}

export const add = (cliente, history) => {
    return async (dispatch) => {
        const URL = `${API_URL}/api/cliente/new`;

        dispatch({
            type: 'clientes_adding'
        });

        try {   
            const res = await axios.post(URL, cliente);

            if (res.status === 201) {
                dispatch({
                    type: 'clientes_adding_done'
                });

                history.push('/clientes');
            }
        } catch (err) {
            if (err.response.status === 500) {
                
            }

            if (err.response.status === 503) {
                dispatch({
                    type: 'clientes_adding_done'
                });

                dispatch({
                    type: 'add_alert',
                    payload: err.response.data
                });

                history.push('/clientes')
            }
        }
    }
};

export const edit = (cliente, id, history) => {
    return async (dispatch) => {
        const URL = `${API_URL}/api/cliente/${id}`;

        dispatch({
            type: 'clientes_editing'
        });

        try {   
            const res = await axios.put(URL, cliente);

            if (res.status === 201) {
                dispatch({
                    type: 'clientes_editing_done'
                });

                history.push('/clientes');
            }
        } catch (err) {
            if (err.response.status === 500) {

            }

            if (err.response.status === 503) {
                dispatch({
                    type: 'clientes_editing_done'
                });

                dispatch({
                    type: 'add_alert',
                    payload: err.response.data
                });

                history.push('/clientes')
            }
        }
    }
}
