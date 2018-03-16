import React from 'react';

const ArticulosPrecioItem = (props) => {
    return (
        <tr>
            <td>1001 - Levadura</td>
            <td className="text-right">100.50</td>
            <td>
                <input className="form__field-table" id="kilos" type="number" name="kilos" />
            </td>
            <td className="text-right">10%</td>
        </tr>
    )
};

export default ArticulosPrecioItem;