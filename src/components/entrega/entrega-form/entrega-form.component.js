import React, { Component } from 'react';
import { connect } from 'react-redux';
import { withFormik, Form, Field } from 'formik';
import Loader from 'react-loader';
import Select from 'react-select';
import moment from 'moment';
import numeral from 'numeral';
import Yup from 'yup';
import _ from 'lodash';
import jsPDF from 'jspdf';

import { list } from '../../../actions/cliente.action';
import { list as listTalonario } from '../../../actions/talonario.action';
import { unselectAll } from '../../../actions/remito.action';
import { pendienteCliente } from '../../../actions/pedido.action';

class EntregaForm extends Component {
    state = {
        items: {},
        clientes: {},
        talonarios: []
    };

    componentWillMount() {
        this.generateItems();
        this.generateClientes();
        this.props.listTalonario('entrega');
    }

    componentWillReceiveProps(newProps) {
        let talonarios = _.map(newProps.talonarios, (talonario) => {
            return {
                value: talonario,
                label: talonario.descripcion
            };
        });

        this.setState(() => ({ talonarios }));
    }

    talonarioChanged = (talonario) => {
        this.props.setFieldValue('talonario', talonario);

        this.props.setFieldValue('talonario', talonario);
    }

    talonarioBlur = () => {
        this.props.setFieldTouched('talonario', true);
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
                        <div className="row">
                            <div className="form-group col-1-of-4">
                                <label className="form__label" htmlFor="fecha">Fecha</label>
                                <Field className="form__field" id="fecha" type="date" name="fecha" />
                                {this.props.touched.fecha && this.props.errors.fecha && (<p className="form__field-error">{this.props.errors.fecha}</p>)}
                            </div>
                        </div>
                        <div className="row">
                            <div className="form-group col-1-of-4">
                                <label className="form__label" htmlFor="talonario">Talonario</label>
                                <Select id="talonario" options={this.state.talonarios} multi={false} value={this.props.values.talonario} onChange={this.talonarioChanged} onBlur={this.talonarioBlur} />
                                {this.props.touched.talonario && this.props.errors.talonario && (<p className="form__field-error">{this.props.errors.talonario}</p>)}
                            </div>
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

const print = (datos) => {
    console.log(datos);

    const doc = new jsPDF({
        orientation: 'p',
        unit: 'cm',
        format: 'a4'
    });

    doc.addPage();
    doc.setFontSize(10);

    doc.setPage(1);
    doc.setLineWidth(0.05);

    doc.text(`Fecha: ${datos.fecha}`, 13, 6);
    doc.text(`Comprobante: ${datos.comprobante}`, 13, 6.5);
    doc.rect(0.7, 8.1, 18.5, 0.5);
    doc.text(`ARTICULOS`, 1, 8.5);
    doc.rect(0.7, 8.6, 18.5, 20);
    doc.text(`CODIGO`, 1, 9);
    doc.text(`ARTICULO`, 4, 9);
    doc.text(`CANTIDAD`, 14, 9);
    doc.text(`KILOS`, 17, 9);

    let top = 9.5;
    let kilos = 0;

    for (let i = 0; i < datos.items.length; i++) {
        //top = top + (i / 2);
        doc.text(datos.items[i].articulo.codigo, 1, top);
        doc.text(datos.items[i].articulo.descripcion, 4, top);
        doc.text(datos.items[i].cantidad.toString(), 14, top);
        doc.text(numeral(datos.items[i].kilos).format('0,0.00'), 17, top);
        kilos = kilos + datos.items[i].kilos;
        top = top + 0.5;
    }

    top = 29.2;
    doc.rect(13.7, top - 0.4, 5.5, 0.5);
    doc.text(`KILOS TOTALES`, 14, top);
    doc.text(`${numeral(kilos).format('0,0.00')}`, 17, top);

    doc.setPage(2);
    doc.setLineWidth(0.05);

    doc.text(`Fecha: ${datos.fecha}`, 13, 6);
    doc.text(`Comprobante: ${datos.comprobante}`, 13, 6.5);
    doc.rect(0.7, 8.1, 18.5, 0.5);
    doc.text(`CLIENTES`, 1, 8.5);
    doc.rect(0.7, 8.6, 18.5, 20);
    doc.text(`CODIGO`, 1, 9);
    doc.text(`RAZON SOCIAL`, 4, 9);
    doc.text(`REMITOS`, 12, 9);

    top = 9.5;

    for (let i = 0; i < datos.clientes.length; i++) {
        // top = top + (i / 2);
        doc.text(datos.clientes[i].cliente.codigo.toString(), 1, top);
        doc.text(datos.clientes[i].cliente.razonSocial, 4, top);
        doc.text(datos.clientes[i].cliente.remito, 12, top);
        top = top + 0.5;
    }

    doc.save(`${datos.comprobante}.pdf`);
};

const mapPropsToValues = (props) => ({
    fecha: '',
    items: '',
    clientes: '',
    talonario: ''
});

const validationSchema = () => Yup.object().shape({
    fecha: Yup
        .string()
        .required('Fecha es requerido'),
    talonario: Yup
        .string()
        .nullable()
        .required('Talonario es requerido')
});

const onSubmit = (values, { props, resetForm }) => {
    const { fecha, items, clientes, talonario } = values;

    console.log(talonario);

    const comprobante = `R${talonario.value.pv.toString().padStart(4, '0')}${talonario.value.proximo.toString().padStart(8, '0')}`;

    const datos = {
        fecha: moment(fecha).format('DD/MM/YYYY'),
        comprobante,
        items: _.map(items, (item) => {
            return {
                articulo: item.articulo,
                cantidad: item.cantidad,
                kilos: item.kilos
            };
        }),
        clientes: _.map(clientes, (cliente) => {
            return {
                cliente: cliente
            }
        })
    }

    print(datos);

    const entrega = {
        fecha: moment(fecha).valueOf(),
        comprobante,
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

    props.accion(entrega, talonario.value);
};

const mapStateToProps = (state) => {
    return { remitos: state.selectedRemito, talonarios: state.talonario.talonarios };
}

export default connect(mapStateToProps, { listTalonario })(withFormik({
    mapPropsToValues,
    validationSchema,
    handleSubmit: onSubmit
})(EntregaForm));