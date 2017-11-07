import axios from 'axios';

const API_URL = 'https://galias-app.herokuapp.com/';

export const list = (desde, hasta) => {
    return async (dispatch) => {
        const URL = `${API_URL}/api/info/fecha?desde=${desde}&hasta=${hasta}`;

        dispatch({
            type: 'info_loading'
        });

        try {
            const res = await axios.get(URL, { headers: { authorization: localStorage.getItem('token') } });

            if (res) {
                console.log(res);
                dispatch({
                    type: 'info_list',
                    payload: res.data
                });
            }
        } catch (err) {
            console.log(err);
        }
    }
};

export const listLast = () => {
    return async (dispatch) => {
        const URL = `${API_URL}/api/info/last`;

        dispatch({
            type: 'info_loading'
        });

        try {
            const res = await axios.get(URL, { headers: { authorization: localStorage.getItem('token') } });

            if (res) {
                dispatch({
                    type: 'info_list',
                    payload: res.data
                });
            }
        } catch (err) {
            console.log(err);
        }
    }
}

export const add = (info, history) => {
    return async (dispatch) => {
        const URL = `${API_URL}/api/info`;

        try {
            const res = await axios.post(
                URL, info, { headers: { authorization: localStorage.getItem('token') } }
            );

            if (res.status === 201) {
                history.push('/diaria');
            }
        } catch (err) {
            console.log(err);
        }
    }
};

export const select = (info, checked) => {
    if (checked) {
        return {
            type: 'info_selected',
            payload: info
        }
    }

    return {
        type: 'info_unselected',
        payload: info
    }
};

export const unselectAll = () => {
    return {
        type: 'unselect_all'
    }
};

