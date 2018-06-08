import axios from 'axios';

const API_URL = process.env.REACT_APP_API_URL;

export const list = () => {
    return async (dispatch) => {
        const URL = `${API_URL}/api/talonario/list`;

        dispatch({
            type: 'talonario_loading'
        });

        try {
            const res = await axios.get(URL, { headers: { authorization: localStorage.getItem('token') } });

            if (res) {
                dispatch({
                    type: 'talonario_list',
                    payload: res.data
                });
            }
        } catch (err) {
            console.log(err);
        }
    }
};

export const add = (talonario, history) => {
    return async (dispatch) => {
        const URL = `${API_URL}/api/talonario/new`;

        dispatch({
            type: 'talonarios_adding'
        });

        try {   
            const res = await axios.post(URL, talonario);

            if (res.status === 200) {
                dispatch({
                    type: 'talonarios_adding_done'
                });

                history.push('/talonarios');
            }
        } catch (err) {
            if (err.response.status === 500) {
                
            }

            if (err.response.status === 503) {
                dispatch({
                    type: 'talonarios_adding_done'
                });

                dispatch({
                    type: 'add_alert',
                    payload: err.response.data
                });

                history.push('/talonarios')
            }
        }
    }
};