import axios from 'axios';

const API_URL = process.env.REACT_APP_API_URL;

export const list = () => {
    return async (dispatch) => {
        const URL = `${API_URL}/api/grupo/list`;

        try {
            const res = await axios.get(URL);

            if (res) {
                dispatch({
                    type: 'grupos_list',
                    payload: res.data
                })
            }
        } catch (err) {
            console.log(err);
        }
    }
};