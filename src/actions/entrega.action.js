import axios from 'axios';

const API_URL = process.env.REACT_APP_API_URL;

// export const list = (desde, hasta) => {
//     return async (dispatch) => {
//         const URL = `${API_URL}/api/remito/fecha?desde=${desde}&hasta=${hasta}`;

//         dispatch({
//             type: 'remito_loading'
//         });

//         try {
//             const res = await axios.get(URL, { headers: { authorization: localStorage.getItem('token') } });

//             if (res) {
//                 dispatch({
//                     type: 'remito_list',
//                     payload: res.data
//                 });
//             }
//         } catch (err) {
//             console.log(err);
//         }
//     }
// };

// export const listToday = () => {
//     return async (dispatch) => {
//         const URL = `${API_URL}/api/remito/today`;

//         dispatch({
//             type: 'remito_loading'
//         });

//         try {
//             const res = await axios.get(URL, { headers: { authorization: localStorage.getItem('token') } });

//             if (res) {
//                 dispatch({
//                     type: 'remito_list',
//                     payload: res.data
//                 });
//             }
//         } catch (err) {
//             console.log(err);
//         }
//     }
// };

export const add = (entrega, talonario, history) => {
    return async (dispatch) => {
        const URL = `${API_URL}/api/entrega/new`;

        dispatch({
            type: 'entregas_adding'
        });

        try {
            const res = await axios.post(URL, { entrega, talonario });

            if (res.status === 200) {
                dispatch({
                    type: 'entregas_adding_done'
                });

                dispatch({
                    type: 'unselect_all'
                });

                history.push('/entregas');
            }
        } catch (err) {
            if (err.response.status === 500) {

            }

            if (err.response.status === 503) {
                dispatch({
                    type: 'entregas_adding_done'
                });

                dispatch({
                    type: 'add_alert',
                    payload: err.response.data
                });

                history.push('/entregas')
            }
        }
    }
};
