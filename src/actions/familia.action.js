import axios from 'axios';

const API_URL = process.env.REACT_APP_API_URL;

export const list = () => {
    return async (dispatch) => {
        const URL = `${API_URL}/api/familia/list`;

        try {
            const res = await axios.get(URL);

            if (res) {
                dispatch({
                    type: 'familias_list',
                    payload: res.data
                })
            }
        } catch (err) {
            console.log(err);
        }
    }
};