import React, { Component } from 'react';
import { withFormik, Form, Field } from 'formik';
import Collapsible from 'react-collapsible';
import moment from 'moment';
import numeral from 'numeral';

class ItemsForm extends Component {
    pendientes = this.props.pendientes;

    formatDate = (fecha) => {
        return moment(fecha).format('DD/MM/YYYY');
    }

    formatNumber = (number) => {
        return numeral(number).format('0,0.00');
    };

    renderItems() {
        return _.map(this.pendientes, (pendiente) => {
            return (
                <Collapsible trigger={`${this.formatDate(pendiente.fecha)} - ${pendiente._id}`} key={pendiente._id}>
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
                        {this.renderItemsPendiente(pendiente.items)}
                        </tbody>
                    </table> 
                </Collapsible>
            )
        });
    }

    renderItemsPendiente(pendientes) {
        return pendientes.map((item) => {
            return (
                <tr>
                    <td>{`${item.articulo.descripcion}`}</td>
                    <td className="text-right">{this.formatNumber(item.pendiente)}</td>
                    <td>
                        <input className="form__field-table" id="cantidad" type="number" name="cantidad"  />
                    </td>
                    <td><button className="mr-sm btn-link btn-link--success"><i className="fa fa-check"></i></button><button className="btn-link btn-link--danger"><i className="fa fa-times"></i></button></td>
                </tr>
            )
        });
    }

    render() {
        console.log(this.pendientes);

        return (
            <div>
                {this.renderItems()}
            </div>
        )
    }
}

export default ItemsForm;