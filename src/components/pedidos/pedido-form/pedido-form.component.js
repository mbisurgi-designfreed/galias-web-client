import React, { Component } from 'react';
import { connect } from 'react-redux';
import { withFormik, Form, Field } from 'formik';
import moment from 'moment';
import numeral from 'numeral';
import Loader from 'react-loader';
import Select from 'react-select';
import Yup from 'yup';

class PedidoForm extends Component {
    formatDate = () => {
        return moment(this.props.pedido.fecha).format('DD/MM/YYYY');
    }

    formatNumber = (number) => {
        return numeral(number).format('0,0.00');
    };

    isExtra = () => {
        return this.props.pedido.extra ? 'Si' : 'No';
    }

    renderItems() {
        return this.props.pedido.items.map((item) => {
            return (
                <div className="list__item-group-field" key={item._id}>
                    <div className="list__item-field">
                        <p className="list__item-value">{item.articulo.descripcion}</p>
                    </div>
                    <div className="list__item-field">
                        <p className="list__item-value">{item.promocion.toUpperCase()}</p>
                    </div>
                    <div className="list__item-field">
                        <p className="list__item-value">{this.formatNumber(item.cantidad)}</p>
                    </div>
                    <div className="list__item-field">
                        <p className="list__item-value">{this.formatNumber(item.descuento)}</p>
                    </div>
                    <div className="list__item-field">
                        <p className="list__item-value">{this.formatNumber(item.precio)}</p>
                    </div>
                    <div className="list__item-field">
                        <p className="list__item-value">{item.extra}</p>
                    </div>
                    <div className="list__item-field">
                        <p className="list__item-value">{this.formatNumber(item.pendiente)}</p>
                    </div>
                </div>
            )
        });
    }

    render() {
        return (
            <div className="list__item mt-sm">
                <div className="list__item-header">
                    <h6 className="list__item-title">{this.props.pedido._id}</h6>
                </div>

                <div className="list__item-content" style={{ height: '80vh' }}>
                    <div className="list__item-group-field">
                        <div className="list__item-field">
                            <p className="list__item-label">Fecha:</p>
                            <p className="list__item-value">{this.formatDate()}</p>
                        </div>
                        <div className="list__item-field">
                            <p className="list__item-label">Razon Social:</p>
                            <p className="list__item-value">{this.props.pedido.cliente.razonSocial}</p>
                        </div>
                        <div className="list__item-field">
                            <p className="list__item-label">Estado:</p>
                            <p className="list__item-value">{this.props.pedido.estado.toUpperCase()}</p>
                        </div>
                    </div>
                    <div className="list__item-group-field">
                        <div className="list__item-field">
                            <p className="list__item-label">Sucursal:</p>
                            <p className="list__item-value">{`${this.props.pedido.sucursal.calle} ${this.props.pedido.sucursal.altura} - ${this.props.pedido.sucursal.localidad}`}</p>
                        </div>
                        <div className="list__item-field">
                            <p className="list__item-label">Comentario:</p>
                            <p className="list__item-value">{this.props.pedido.comentario}</p>
                        </div>
                        <div className="list__item-field">
                            <p className="list__item-label">Extra:</p>
                            <p className="list__item-value">{this.isExtra()}</p>
                        </div>
                    </div>
                    <div className="list__item-group-field mt-sm">
                        <div className="list__item-field">
                            <p className="list__item-label">Articulo:</p>
                        </div>
                        <div className="list__item-field">
                            <p className="list__item-label">Promocion:</p>
                        </div>
                        <div className="list__item-field">
                            <p className="list__item-label">Cantidad:</p>
                        </div>
                        <div className="list__item-field">
                            <p className="list__item-label">Descuento:</p>
                        </div>
                        <div className="list__item-field">
                            <p className="list__item-label">Precio:</p>
                        </div>
                        <div className="list__item-field">
                            <p className="list__item-label">Extra:</p>
                        </div>
                        <div className="list__item-field">
                            <p className="list__item-label">Pendiente:</p>
                        </div>
                    </div>
                    {this.renderItems()}
                </div>
            </div>
        );
    }
}

const mapStateToProps = (state) => {
    return { loading: state.pedido.loading }
};

export default connect(null)(PedidoForm);