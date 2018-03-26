import React, { Component } from 'react';
import { connect } from 'react-redux';
import { withFormik, Form, Field } from 'formik';
import Select from 'react-select';
import Yup from 'yup';
import _ from 'lodash';

import ItemsModal from './items-form/items-modal.component';

import { list } from '../../../actions/cliente.action';
import { pendienteCliente } from '../../../actions/pedido.action';

class RemitoForm extends Component {
    state = {
        clientes: [],
        pendientes: [],
        items: false
    }

    componentWillMount() {
        this.props.list(1);
    }

    componentWillReceiveProps(newProps) {
        const clientes = _.map(newProps.clientes, (cliente) => {
            return {
                value: cliente._id,
                label: cliente.razonSocial
            }
        })

        const pendientes = _.map(newProps.pendientes, (pendiente) => {
            return pendiente;
        })

        this.setState(() => ({ clientes, pendientes }));
    }

    clienteChanged = (cliente) => {
        this.props.setFieldValue('cliente', cliente);

        this.props.pendienteCliente(cliente.value);
    }

    clienteBlur = () => {
        this.props.setFieldTouched('cliente', true);
    }

    onAgregarClick = () => {
        this.setState(() => ({ items: true }));
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
                        <div className="form-group col-2-of-4">
                            <label className="form__label" htmlFor="cliente">Cliente</label>
                            <Select id="cliente" options={this.state.clientes} multi={false} value={this.props.values.cliente} onChange={this.clienteChanged} onBlur={this.clienteBlur} />
                            {this.props.touched.cliente && this.props.errors.cliente && (<p className="form__field-error">{this.props.errors.cliente}</p>)}
                        </div>
                    </div>
                    <div className="row">
                        <button className="btn-link" onClick={this.onAgregarClick}><i className="fa fa-plus-circle icon-small"></i>agregar items</button>
                    </div>
                </Form>
                <ItemsModal pendientes={this.state.pendientes} isOpen={this.state.items} />
            </div>
        )
    }
}

const mapPropsToValues = (props) => ({
    fecha: '',
    cliente: ''
});

const validationSchema = () => Yup.object().shape({
    fecha: Yup
        .string()
        .required('Fecha es requerido'),
    cliente: Yup
        .string()
        .nullable()
        .required('Cliente es requerido')
});

const mapStateToProps = (state) => {
    return { clientes: state.cliente.clientes, pendientes: state.pedido.pendientes }
};

export default connect(mapStateToProps, { list, pendienteCliente })(withFormik({
    mapPropsToValues,
    validationSchema
})(RemitoForm));