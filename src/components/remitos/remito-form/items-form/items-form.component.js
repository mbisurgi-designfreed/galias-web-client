import React, { Component } from 'react';
import Collapsible from 'react-collapsible';
import moment from 'moment';
import numeral from 'numeral';
import _ from 'lodash';

import AsignarItem from './asignar-item.component';

class ItemsForm extends Component {
    state = {
        asignados: {},
        cantidad: 0
    };

    formatDate = (fecha) => {
        return moment(fecha).format('DD/MM/YYYY');
    }

    formatNumber = (number) => {
        return numeral(number).format('0,0.00');
    };

    renderItems() {
        return (
            <table>
                <thead>
                    <tr>
                        <th style={{ width: '50%' }}>Articulo</th>
                        <th style={{ width: '20%' }}>Pendiente</th>
                        <th style={{ width: '20%' }}>Asignar</th>
                        <th style={{ width: '10%' }}></th>
                    </tr>
                </thead>
                <tbody>
                    {this.renderItemsPendiente(this.props.pedido.items)}
                </tbody>
            </table>
        )
    }

    onAsignarItem = (item, cantidad) => {
        const asignados = this.state.asignados;
        let cant = this.state.cantidad;
        cant++;

        asignados[item._id] = item;
        asignados[item._id].asignar = cantidad;

        this.setState(() => ({ asignados, cantidad: cant }), this.props.onAgregar(asignados[item._id]));
    }

    onEliminarItem = (item) => {
        const asignados = _.omit(this.state.asignados, item._id);
        let cant = this.state.cantidad;
        cant--;

        this.setState(() => ({ asignados, cantidad: cant }), this.props.onEliminar(item));
    }

    renderItemsPendiente(pendientes) {
        return pendientes.map((item) => {
            return (
                <AsignarItem item={item} key={item._id} onAsignar={this.onAsignarItem} onEliminar={this.onEliminarItem} cantidad={this.state.cantidad} />
            )
        });
    }

    render() {
        return (
            <div style={{ maxHeight: '80vh', overflowY: 'scroll' }}>
                {this.renderItems()}
            </div>
        )
    }
}

export default ItemsForm;