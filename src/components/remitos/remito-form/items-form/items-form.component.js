import React, { Component } from 'react';
import Collapsible from 'react-collapsible';
import moment from 'moment';
import numeral from 'numeral';
import _ from 'lodash';

import AsignarItem from './asignar-item.component';

class ItemsForm extends Component {
    state = {
        asignados: {}
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
                <col style={{ width: '50%' }} />
                <col style={{ width: '20%' }} />
                <col style={{ width: '20%' }} />
                <col style={{ width: '10%' }} />
                <thead>
                    <tr>
                        <th>Articulo</th>
                        <th>Pendiente</th>
                        <th>Asignar</th>
                        <th></th>
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

        asignados[item._id] = item;
        asignados[item._id].asignar = cantidad;

        this.setState(() => ({ asignados }), this.props.onAgregar(asignados[item._id]));
    }

    onEliminarItem = (item) => {
        const asignados = _.omit(this.state.asignados, item._id);

        this.setState(() => ({ asignados }), this.props.onEliminar(item));
    }

    renderItemsPendiente(pendientes) {
        return pendientes.map((item) => {
            return (
                <AsignarItem item={item} key={item._id} onAsignar={this.onAsignarItem} onEliminar={this.onEliminarItem} />
            )
        });
    }

    render() {
        return (
            <div>
                {this.renderItems()}
            </div>
        )
    }
}

export default ItemsForm;