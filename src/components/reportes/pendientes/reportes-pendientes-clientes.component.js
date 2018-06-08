import React, { Component } from 'react';
import { connect } from 'react-redux';
import { withFormik, Form } from 'formik';
import Select from 'react-select';
import _ from 'lodash';

import { list, pendiente, reset } from '../../../actions/cliente.action';

class ReportesPendientesClientes extends Component {
    state = {
        clientes: []
    }

    componentWillMount() {
        this.props.list(1);
    }

    componentWillReceiveProps(nextProps) {
        const clientes = _.map(nextProps.clientes, (cliente) => {
            return {
                value: cliente._id,
                label: cliente.razonSocial
            };
        })

        this.setState(() => ({
            clientes
        }));
    }

    componentWillUnmount() {
        this.props.reset();
    }

    clienteChanged = (cliente) => {
        this.props.setFieldValue('cliente', cliente);
    }

    renderClientes = () => {
        return _.map(this.props.pendientes, (articulo) => {
            return (
                <tr>
                    <td>{articulo.codigo}</td>
                    <td>{articulo.descripcion}</td>
                    <td className="text-right">{articulo.cantidad}</td>
                </tr>
            )
        });
    };

    render() {
        return (
            <div className="row">
                <div className="row" >
                    <Form className="form">
                        <div className="form__group form__group--inline" style={{ display: 'flex', justifyContent: 'normal' }}>
                            <label className="form__label">Cliente</label>
                            <Select className="form__field--inline-select" id="cliente" value={this.props.values.cliente} clearable={false} multi={false} options={this.state.clientes} onChange={this.clienteChanged} />
                            <button type="submit" className={`btn-link icon-medium`} style={{ marginBottom: '1rem' }} onClick={this.onSync} ><i className="fas fa-search"></i></button>
                        </div>
                    </Form>
                </div>
                <div className="row">
                    <table className="mt-sm">
                        <col style={{ width: '30%' }} />
                        <col style={{ width: '50%' }} />
                        <col style={{ width: '20%' }} />
                        <thead>
                            <tr>
                                <th>Codigo</th>
                                <th>Articulo</th>
                                <th>Cantidad</th>
                            </tr>
                        </thead>
                        <tbody>
                            {this.renderClientes()}
                        </tbody>
                    </table>
                </div>
            </div>
        )
    }
}

const onSubmit = (values, { props }) => {
    const { cliente } = values;

    props.pendiente(cliente.value);
};

const mapPropsToValues = (props) => {
    cliente: ''
};

const mapStateToProps = (state) => {
    return { clientes: state.cliente.clientes, pendientes: state.cliente.pendientes };
};

export default connect(mapStateToProps, { list, pendiente, reset })(withFormik({ mapPropsToValues, handleSubmit: onSubmit })(ReportesPendientesClientes));