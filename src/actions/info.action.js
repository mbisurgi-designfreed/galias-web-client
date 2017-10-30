import axios from 'axios';

const API_URL = 'http://localhost:4000';

export const add = ({ caja, banco, cheques, creditoTotal, creditoVencido, deudaTotal, deudaVencido }, history) => {
    return async (dispatch) => {
        const URL = `${API_URL}/api/info`;

        try {
            const res = await axios.post(
                URL,
                { caja, banco, cheques, creditoTotal, creditoVencido, deudaTotal, deudaVencido },
                { headers: { authorization: localStorage.getItem('token') } }
            );

            console.log(res);
        } catch (err) {
            console.log(err);
        }
    }
};

