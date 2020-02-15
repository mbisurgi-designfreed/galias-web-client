import axios from 'axios';

const API_URL = process.env.BASE_SERVICE_URL;

export const list = (page) => {
    return async (dispatch) => {
        const URL = `${API_URL}/api/competencia/list?page=${page}`;

        dispatch({
            type: 'competencia_loading'
        });

        try {
            const res = await axios.get(URL);

            if (res) {
                dispatch({
                    type: 'competencia_list',
                    payload: res.data
                })
            }
        } catch (err) {
            console.log(err);
        }
    }
};

export const add = (competencia, history) => {
    return async (dispatch) => {
        const URL = `${API_URL}/api/competencia/new`;

        dispatch({
            type: 'competencia_adding'
        });

        try {
            const res = await axios.post(URL, competencia);

            if (res.status === 201) {
                history.push('/articulos-competencia');

                dispatch({
                    type: 'competencia_adding_done'
                });

            }
        } catch (err) {
            console.log(err.response);

            if (err.response.status === 500) {

            }

            if (err.response.status === 503) {
                history.push('/competencia');

                dispatch({
                    type: 'competencia_adding_done'
                });

                dispatch({
                    type: 'add_alert',
                    payload: err.response.data
                });
            }
        }
    }
};

export const edit = (articulo, id, history) => {
    return async (dispatch) => {
        const URL = `${API_URL}/api/competencia/${id}`;

        dispatch({
            type: 'competencia_editing'
        });

        try {
            const res = await axios.put(URL, articulo);

            if (res.status === 201) {
                history.push('/competencia');

                dispatch({
                    type: 'competencia_editing_done'
                });
            }
        } catch (err) {
            if (err.response.status === 500) {

            }

            if (err.response.status === 503) {
                history.push('/competencia');

                dispatch({
                    type: 'competencia_editing_done'
                });

                dispatch({
                    type: 'add_alert',
                    payload: err.response.data
                });
            }
        }
    }
};


