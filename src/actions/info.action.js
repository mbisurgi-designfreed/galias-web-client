import axios from 'axios';

const API_URL = process.env.REACT_APP_API_URL;

export const list = (desde, hasta) => {
    return async (dispatch) => {
        const URL = `${API_URL}/api/info/fecha?desde=${desde}&hasta=${hasta}`;

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

export const add = (info, history, id) => {
    return async (dispatch) => {
        const URL = `${API_URL}/api/info`;

        try {
            const res = await axios.post(
                URL, info, { headers: { authorization: localStorage.getItem('token'), socket: id } }
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

export const receiveNotification = (notifications) => {
    return {
        type: 'info_notification',
        payload: notifications
    }
};

export const resetNotification = () => {
    return {
        type: 'info_notification_reset'
    }
};

