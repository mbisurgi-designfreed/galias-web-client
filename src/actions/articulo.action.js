import axios from 'axios';

const API_URL = process.env.REACT_APP_API_URL;

export const list = (page) => {
    return async (dispatch) => {
        const URL = `${API_URL}/api/articulo/list?page=${page}`;

        dispatch({
            type: 'articulos_loading'
        });

        try {
            const res = await axios.get(URL);

            if (res) {
                dispatch({
                    type: 'articulos_list',
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
        const URL = `${API_URL}/api/articulo/new`;

        dispatch({
            type: 'articulos_adding'
        });

        try {   
            const res = await axios.post(URL, articulo);

            if (res.status === 201) {
                dispatch({
                    type: 'articulo_adding_done'
                });

                history.push('/articulos');
            }
        } catch (err) {
            console.log(err);
        }
    }
};

export const edit = (articulo, id, history) => {
    return async (dispatch) => {
        const URL = `${API_URL}/api/articulo/${id}`;

        dispatch({
            type: 'articulos_editing'
        });

        try {   
            const res = await axios.put(URL, articulo);

            if (res.status === 201) {
                dispatch({
                    type: 'articulos_editing_done'
                });

                history.push('/articulos');
            }
        } catch (err) {
            console.log(err);
        }
    }
}
