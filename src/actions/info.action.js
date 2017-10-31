import axios from 'axios';

const API_URL = 'http://localhost:4000';

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
                    type: 'info_list_last',
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

            console.log(res);
        } catch (err) {
            console.log(err);
        }
    }
};

