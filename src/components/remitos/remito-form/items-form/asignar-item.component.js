import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import numeral from 'numeral';

class AsignarItem extends Component {
    formatNumber = (number) => {
        return numeral(number).format('0,0.00');
    };

    onAceptar = () => {
        const cantidad = ReactDOM.findDOMNode(this).childNodes[2].childNodes[0].value;

        this.props.onAsignar(this.props.item, cantidad);
    }

    onCancelar = () => {
        this.props.onEliminar(this.props.item);
    }

    render() {
        return (
            <tr>
                <td>{`${this.props.item.articulo.descripcion}`}</td>
                <td className="text-right">{this.formatNumber(this.props.item.pendiente)}</td>
                <td>
                    <input className="form__field-table" id="cantidad" type="number" name="cantidad" />
                </td>
                <td><button className="mr-sm btn-link btn-link--success" onClick={this.onAceptar}><i className="fa fa-check"></i></button><button className="btn-link btn-link--danger" onClick={this.onCancelar}><i className="fa fa-times"></i></button></td>
            </tr >
        )
    }
};

export default AsignarItem;
