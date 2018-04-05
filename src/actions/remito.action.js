import axios from 'axios';

const API_URL = process.env.REACT_APP_API_URL;

export const list = (desde, hasta) => {
    return async (dispatch) => {
        const URL = `${API_URL}/api/remito/fecha?desde=${desde}&hasta=${hasta}`;

        dispatch({
            type: 'remito_loading'
        });

        try {
            const res = await axios.get(URL, { headers: { authorization: localStorage.getItem('token') } });

            if (res) {
                dispatch({
                    type: 'remito_list',
                    payload: res.data
                });
            }
        } catch (err) {
            console.log(err);
        }
    }
};

export const add = (remito, history) => {
    return async (dispatch) => {
        const URL = `${API_URL}/api/remito/new`;

        dispatch({
            type: 'remitos_adding'
        });

        try {   
            const res = await axios.post(URL, remito);

            if (res.status === 200) {
                dispatch({
                    type: 'remitos_adding_done'
                });

                history.push('/remitos');
            }
        } catch (err) {
            if (err.response.status === 500) {
                
            }

            if (err.response.status === 503) {
                dispatch({
                    type: 'remitos_adding_done'
                });

                dispatch({
                    type: 'add_alert',
                    payload: err.response.data
                });

                history.push('/remitos')
            }
        }
    }
};