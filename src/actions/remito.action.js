import axios from 'axios';

const API_URL = process.env.BASE_SERVICE_URL;

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

export const listToday = () => {
    return async (dispatch) => {
        const URL = `${API_URL}/api/remito/today`;

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

export const proximo = () => {
    return async (dispatch) => {
        const URL = `${API_URL}/api/talonario/proximo`;

        try {
            const res = await axios.get(URL);

            if (res.status === 200) {
                dispatch({
                    type: 'proximo_get',
                    payload: res.data.proximo
                });
            }
        } catch (err) {

        }
    }
}

export const sync = (remito, history) => {
    return async (dispatch) => {
        const URL = `${API_URL}/api/remito/sync`;

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

export const syncAll = (remitos, history) => {
    return async (dispatch) => {
        const URL = `${API_URL}/api/remito/syncAll`;

        dispatch({
            type: 'remitos_adding'
        });

        try {
            const res = await axios.post(URL, remitos);

            if (res.status === 200) {
                dispatch({
                    type: 'unselect'
                });

                dispatch({
                    type: 'remitos_adding_done'
                });
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
            }
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

export const select = (remito, checked) => {
    if (checked) {
        return {
            type: 'remito_selected',
            payload: remito
        }
    }

    return {
        type: 'remito_unselected',
        payload: remito
    }
};

export const unselectAll = () => {
    return {
        type: 'unselect_all'
    }
};
