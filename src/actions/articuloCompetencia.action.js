import axios from 'axios';

const API_URL = process.env.REACT_APP_API_URL;

export const list = (page) => {
    return async (dispatch) => {
        const URL = `${API_URL}/api/articulo-competencia/list?page=${page}`;

        dispatch({
            type: 'articulos_competencia_loading'
        });

        try {
            const res = await axios.get(URL);

            if (res) {
                dispatch({
                    type: 'articulos_competencia_list',
                    payload: res.data
                })
            }
        } catch (err) {
            console.log(err);
        }
    }
};

export const add = (articulo, history) => {
    return async (dispatch) => {
        const URL = `${API_URL}/api/articulo-competencia/new`;

        dispatch({
            type: 'articulos_competencia_adding'
        });

        try {
            const res = await axios.post(URL, articulo);

            if (res.status === 201) {
                history.push('/articulos-competencia');

                dispatch({
                    type: 'articulos_competencia_adding_done'
                });

            }
        } catch (err) {
            console.log(err.response);

            if (err.response.status === 500) {

            }

            if (err.response.status === 503) {
                history.push('/articulos-competencia');

                dispatch({
                    type: 'articulos_competencia_adding_done'
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
        const URL = `${API_URL}/api/articulo-competencia/${id}`;

        dispatch({
            type: 'articulos_competencia_editing'
        });

        try {
            const res = await axios.put(URL, articulo);

            if (res.status === 201) {
                history.push('/articulos-competencia');

                dispatch({
                    type: 'articulos_competencia_editing_done'
                });
            }
        } catch (err) {
            if (err.response.status === 500) {

            }

            if (err.response.status === 503) {
                history.push('/articulos-competencia');

                dispatch({
                    type: 'articulos_competencia_editing_done'
                });

                dispatch({
                    type: 'add_alert',
                    payload: err.response.data
                });
            }
        }
    }
};


