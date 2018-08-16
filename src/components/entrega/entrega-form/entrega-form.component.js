import React, { Component } from 'react';
import { connect } from 'react-redux';
import { withFormik, Form, Field } from 'formik';
import Loader from 'react-loader';
import Select from 'react-select';
import moment from 'moment';
import numeral from 'numeral';
import Yup from 'yup';
import _ from 'lodash';

import { list } from '../../../actions/cliente.action';
import { pendienteCliente } from '../../../actions/pedido.action';

class EntregaForm extends Component {
    state = {
        items: {},
        clientes: {},
    };

    componentWillMount() {
        this.generateItems();
        this.generateClientes();
    }

    generateItems = () => {
        const items = this.state.items;

        _.map(this.props.remitos, (remito) => {
            _.map(remito.items, (item) => {
                if (items[item.articulo._id]) {
                    const cantidad = items[item.articulo._id].cantidad;

                    items[item.articulo._id].cantidad = cantidad + item.cantidad;
                    items[item.articulo._id].kilos = items[item.articulo._id].cantidad * item.articulo.kilos;
                } else {
                    items[item.articulo._id] = {};
                    items[item.articulo._id].articulo = item.articulo;
                    items[item.articulo._id].cantidad = item.cantidad;
                    items[item.articulo._id].kilos = item.cantidad * item.articulo.kilos;
                }
            });
        });

        this.setState(() => ({ items }), this.props.setFieldValue('items', items));
    };

    generateClientes = () => {
        const clientes = this.state.clientes;

        _.map(this.props.remitos, (remito) => {
            if (!clientes[remito.cliente._id]) {
                clientes[remito.cliente._id] = {};
                clientes[remito.cliente._id]._id = remito.cliente._id; 
                clientes[remito.cliente._id].codigo = remito.cliente.codigo;
                clientes[remito.cliente._id].razonSocial = remito.cliente.razonSocial;
                clientes[remito.cliente._id].remito = remito.numero;
            } else {
                const remitos = clientes[remito.cliente._id].remito;
                clientes[remito.cliente._id].remito = `${remitos} / ${remito.numero}`;
            }
        });

        this.setState(() => ({ clientes }), this.props.setFieldValue('clientes', clientes));
    }

    formatNumber = number => numeral(number).format('0,0.00');

    renderItems = () => {
        const items = this.state.items;

        return _.map(items, (item, index) => {
            return (
                <tr key={index}>
                    <td>{item.articulo.codigo}</td>
                    <td>{item.articulo.descripcion}</td>
                    <td className="text-right">{this.formatNumber(item.cantidad)}</td>
                    <td className="text-right">{this.formatNumber(item.kilos)}</td>
                </tr>
            )
        });
    };

    renderClientes = () => {
        const clientes = this.state.clientes;

        return _.map(clientes, (cliente, index) => {
            return (
                <tr key={index}>
                    <td>{cliente.codigo}</td>
                    <td>{cliente.razonSocial}</td>
                    <td>{cliente.remito}</td>
                </tr>
            )
        });
    }

    render() {
        return (
            <div>
                <Form className="form mb-xl">
                    <div className="row">
                        <div className="form-group col-1-of-4">
                            <label className="form__label" htmlFor="fecha">Fecha</label>
                            <Field className="form__field" id="fecha" type="date" name="fecha" />
                            {this.props.touched.fecha && this.props.errors.fecha && (<p className="form__field-error">{this.props.errors.fecha}</p>)}
                        </div>
                    </div>
                    <div className="row">
                        <table>
                            <thead>
                                <tr>
                                    <th style={{ width: '20%' }}>Codigo</th>
                                    <th style={{ width: '50%' }}>Articulo</th>
                                    <th style={{ width: '15%' }}>Cantidad</th>
                                    <th style={{ width: '15%' }}>Kilos</th>
                                </tr>
                            </thead>
                            <tbody>
                                {this.renderItems()}
                            </tbody>
                        </table>
                    </div>
                    <div className="row">
                        <table>
                            <thead>
                                <tr>
                                    <th style={{ width: '20%' }}>Codigo</th>
                                    <th style={{ width: '35%' }}>Razon Social</th>
                                    <th style={{ width: '45%' }}>Remitos</th>
                                </tr>
                            </thead>
                            <tbody>
                                {this.renderClientes()}
                            </tbody>
                        </table>
                    </div>
                    <div className="row">
                        <Loader className="spinner mt-medium" loaded={true} color="#ed1c24" scale={0.5}>
                            <button className="btn" disabled={false}>Generar</button>
                        </Loader>
                    </div>
                </Form>
            </div>
        )
    }
}

const mapPropsToValues = (props) => ({
    fecha: '',
    items: '',
    clientes: ''
});

const validationSchema = () => Yup.object().shape({
    fecha: Yup
        .string()
        .required('Fecha es requerido'),
});

const onSubmit = (values, { props, resetForm }) => {
    const { fecha, items, clientes } = values;

    const entrega = {
        fecha: moment(fecha).valueOf(),
        items: _.map(items, (item) => {
            return {
                articulo: item.articulo._id,
                cantidad: item.cantidad,
                kilos: item.kilos
            };
        }),
        clientes: _.map(clientes, (cliente) => {
            return cliente._id
        }),
        remitos: _.map(props.remitos, (remito) => {
            return remito._id
        })
    }

    props.accion(entrega);
};

const mapStateToProps = (state) => {
    return { remitos: state.selectedRemito };
}

export default connect(mapStateToProps)(withFormik({
    mapPropsToValues,
    validationSchema,
    handleSubmit: onSubmit
})(EntregaForm));