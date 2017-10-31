import axios from 'axios';

const API_URL = 'http://localhost:4000';

export const add = ({ fecha, caja, bancos, cheques, creditoTotal, creditoVencido, deudaTotal, deudaVencido }, history) => {
    return async (dispatch) => {
        const URL = `${API_URL}/api/info`;

        const info = {
            fecha,
            caja,
            bancos,
            cheques,
            debito: {
                total: deudaTotal,
                vencido: deudaVencido
            },
            credito: {
                total: creditoTotal,
                vencido: creditoVencido
            }
        }

        try {
            const res = await axios.post(
                URL, info, { headers: { authorization: localStorage.getItem('token') } }
            );

            console.log(res);
        } catch (err) {
            console.log(err);
        }
    }
};

