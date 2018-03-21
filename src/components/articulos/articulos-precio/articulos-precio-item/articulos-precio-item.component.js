import React, { Component } from 'react';
import numeral from 'numeral';

class ArticulosPrecioItem extends Component {
    state = {
        precio: this.props.articulo.precioVta
    }

    formatNumber = (number) => {
        return numeral(number).format('0,0.00');
    };

    calculateDif = () => {
        const dif = this.state.precio - this.props.vigente;

        return numeral(dif / this.props.vigente).format('0.00%');
    }

    onUpdatePrecio = (e) => {
        const precio = e.target.value;

        this.setState({ precio });

        this.props.actualizar(this.props.articulo._id, precio);
    };

    render() {
        return (
            <tr>
                <td>{`${this.props.articulo.codigo} - ${this.props.articulo.descripcion}`}</td>
                <td className="text-right">{this.formatNumber(this.props.vigente)}</td>
                <td>
                    <input className="form__field-table" id="kilos" type="number" name="kilos" onChange={this.onUpdatePrecio} value={this.state.precio} />
                </td>
                <td className="text-right">{this.calculateDif()}</td>
            </tr>
        )
    }
};

export default ArticulosPrecioItem;