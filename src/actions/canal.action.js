import axios from 'axios';

const API_URL = process.env.BASE_SERVICE_URL;

export const list = () => {
    return async (dispatch) => {
        const URL = `${API_URL}/api/canal/list`;

        try {
            const res = await axios.get(URL);

            if (res) {
                dispatch({
                    type: 'canales_list',
                    payload: res.data
                })
            }
        } catch (err) {
            console.log(err);
        }
    }
};
