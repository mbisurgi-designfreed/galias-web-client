import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import numeral from 'numeral';

class AsignarItem extends Component {
    state = {
        disabled: false
    }

    formatNumber = (number) => {
        return numeral(number).format('0,0.00');
    };

    onChange = (e) => {
        const asignar = e.target.value;

        if (asignar > this.props.item.pendiente) {
            this.setState(() => ({ disabled: true }));
        } else {
            this.setState(() => ({ disabled: false }));
        }
    }

    onAceptar = () => {
        const cantidad = ReactDOM.findDOMNode(this).childNodes[2].childNodes[0].value;

        this.props.onAsignar(this.props.item, cantidad);
    }

    onCancelar = () => {
        this.props.onEliminar(this.props.item);
    }

    isDisabled = () => {
        if (this.state.disabled) {
            return 'btn-link--disabled'
        } 
    }

    render() {
        return (
            <tr>
                <td>{`${this.props.item.articulo.descripcion}`}</td>
                <td className="text-right">{this.formatNumber(this.props.item.pendiente)}</td>
                <td>
                    <input className="form__field-table" id="cantidad" type="number" name="cantidad" onChange={this.onChange} />
                </td>
                <td><button className={`mr-sm btn-link btn-link--success ${this.isDisabled()}`} onClick={this.onAceptar} disabled={this.state.disabled}><i className="fa fa-check"></i></button><button className="btn-link btn-link--danger" onClick={this.onCancelar}><i className="fa fa-times"></i></button></td>
            </tr >
        )
    }
};

export default AsignarItem;
