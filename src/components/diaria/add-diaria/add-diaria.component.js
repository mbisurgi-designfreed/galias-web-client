import React, { Component } from 'react';
import { connect } from 'react-redux';
import { reduxForm, Field } from 'redux-form';

import { add } from '../../../actions/info.action';

class AddDiaria extends Component {
    renderField({ input, label, col, type, meta: { touched, error, valid } }) {
        return (
            <div className={`form-group col-md-${col}`}>
                <label>{label}</label>
                <div className="input-group">
                    <span className="input-group-addon">$</span>
                    <input {...input} className={`form-control form-control-sm text-right ${touched && !valid ? 'is-invalid' : ''}`} type={type} />
                </div>
            </div>
        );
    }

    onCargar(values) {
        this.props.add(values, this.props.history);
    }

    render() {
        const { handleSubmit, valid } = this.props;

        return (
            <form className="" onSubmit={handleSubmit(this.onCargar.bind(this))} noValidate>
                <div className="card mt-3">
                    <div className="card-header bg-danger text-white p-2">Disponibilidades</div>
                    <div className="card-body p-2">
                        <div className="form-row">
                            <Field name="caja" component={this.renderField} type="number" label="Caja" col={4} />
                            <Field name="banco" component={this.renderField} type="number" label="Banco" col={4} />
                            <Field name="cheques" component={this.renderField} type="number" label="Cheques" col={4} />
                        </div>
                    </div>
                </div>
                <div className="card mt-3">
                    <div className="card-header bg-danger text-white p-2">Credito</div>
                    <div className="card-body p-2">
                        <div className="form-row">
                            <Field name="creditoTotal" component={this.renderField} type="number" label="Total" col={6} />
                            <Field name="creditoVencido" component={this.renderField} type="number" label="Vencido" col={6} />
                        </div>
                    </div>
                </div>
                <div className="card mt-3">
                    <div className="card-header bg-danger text-white p-2">Deuda</div>
                    <div className="card-body p-2">
                        <div className="form-row">
                            <Field name="deudaTotal" component={this.renderField} type="number" label="Total" col={6} />
                            <Field name="deudaVencido" component={this.renderField} type="number" label="Vencido" col={6} />
                        </div>
                    </div>
                </div>
                <button type="submit" className="btn btn-outline-danger btn-block mt-2" disabled={!valid}>Cargar</button>
            </form>
        );
    }
}

const validate = (values) => {
    const errors = {};

    if (!values.caja) {
        errors.caja = 'Caja es requerido';
    }

    if (!values.banco) {
        errors.banco = 'Banco es requerido';
    }

    if (!values.cheques) {
        errors.cheques = 'Cheques es requerido';
    }

    if (!values.creditoTotal) {
        errors.creditoTotal = 'Credito total es requerido';
    }

    if (!values.creditoVencido) {
        errors.creditoVencido = 'Credito vencido es requerido';
    }

    if (!values.deudaTotal) {
        errors.deudaTotal = 'Deuda total es requerido';
    }

    if (!values.deudaVencido) {
        errors.deudaVencido = 'Deuda vencido es requerido';
    }

    return errors;
}

export default reduxForm({ form: 'info', validate })(connect(null, { add })(AddDiaria));