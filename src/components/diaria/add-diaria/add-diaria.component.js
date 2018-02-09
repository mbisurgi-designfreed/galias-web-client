import React, { Component } from 'react';
import { connect } from 'react-redux';
import { withFormik, Form, Field } from 'formik';
import Yup from 'yup';
import moment from 'moment';
import numeral from 'numeral';

import { add } from '../../../actions/info.action';

import notification from '../../notification/notification.component';

class AddDiaria extends Component {
    onCajaBlur = () => {
        const caja = numeral(this.props.values.caja).format('$0,0.00');
        this.props.setFieldValue('caja', caja)
    }

    onBancosBlur = () => {
        const bancos = numeral(this.props.values.bancos).format('$0,0.00');
        this.props.setFieldValue('bancos', bancos)
    }

    onChequesBlur = () => {
        const cheques = numeral(this.props.values.cheques).format('$0,0.00');
        this.props.setFieldValue('cheques', cheques)
    }

    onDebitoTotal = () => {
        const debitoTotal = numeral(this.props.values.debitoTotal).format('$0,0.00');
        this.props.setFieldValue('debitoTotal', debitoTotal)
    }

    onDebitoVencido = () => {
        const debitoVencido = numeral(this.props.values.debitoVencido).format('$0,0.00');
        this.props.setFieldValue('debitoVencido', debitoVencido)
    }

    onDebitoNc = () => {
        const debitoNc = numeral(this.props.values.debitoNc).format('$0,0.00');
        this.props.setFieldValue('debitoNc', debitoNc)
    }

    onCreditoTotal = () => {
        const creditoTotal = numeral(this.props.values.creditoTotal).format('$0,0.00');
        this.props.setFieldValue('creditoTotal', creditoTotal)
    }

    onCreditoVencido = () => {
        const creditoVencido = numeral(this.props.values.creditoVencido).format('$0,0.00');
        this.props.setFieldValue('creditoVencido', creditoVencido)
    }

    onCreditoNc = () => {
        const creditoNc = numeral(this.props.values.creditoNc).format('$0,0.00');
        this.props.setFieldValue('creditoNc', creditoNc)
    }

    render() {
        return (
            <Form className="form">
                <div className="row">
                    <div className="form-group col-1-of-4">
                        <label className="form__label" htmlFor="fecha">Fecha</label>
                        <Field className="form__field" id="fecha" type="date" name="fecha" />
                        {this.props.touched.fecha && this.props.errors.fecha && (<p className="form__field-error">{this.props.errors.fecha}</p>)}
                    </div>
                </div>
                <div className="row">
                    <h1 className="form__group-title">Disponibilidades</h1>
                    <div className="form-group col-1-of-3">
                        <label className="form__label" htmlFor="caja">Caja</label>
                        <Field className="form__field" id="caja" type="text" name="caja" onBlur={this.onCajaBlur} />
                        {this.props.touched.caja && this.props.errors.caja && (<p className="form__field-error">{this.props.errors.caja}</p>)}
                    </div>
                    <div className="form-group col-1-of-3">
                        <label className="form__label" htmlFor="bancos">Bancos</label>
                        <Field className="form__field" id="bancos" type="text" name="bancos" onBlur={this.onBancosBlur} />
                        {this.props.touched.bancos && this.props.errors.bancos && (<p className="form__field-error">{this.props.errors.bancos}</p>)}
                    </div>
                    <div className="form-group col-1-of-3">
                        <label className="form__label" htmlFor="cheques">Cheques</label>
                        <Field className="form__field" id="cheques" type="text" name="cheques" onBlur={this.onChequesBlur} />
                        {this.props.touched.cheques && this.props.errors.cheques && (<p className="form__field-error">{this.props.errors.cheques}</p>)}
                    </div>
                </div>
                <div className="row">
                    <h1 className="form__group-title">Deuda</h1>
                    <div className="form-group col-1-of-3">
                        <label className="form__label" htmlFor="debitoTotal">Total</label>
                        <Field className="form__field" id="debitoTotal" type="text" name="debitoTotal" onBlur={this.onDebitoTotal} />
                        {this.props.touched.debitoTotal && this.props.errors.debitoTotal && (<p className="form__field-error">{this.props.errors.debitoTotal}</p>)}
                    </div>
                    <div className="form-group col-1-of-3">
                        <label className="form__label" htmlFor="debitoVencido">Vencido</label>
                        <Field className="form__field" id="debitoVencido" type="text" name="debitoVencido" onBlur={this.onDebitoVencido} />
                        {this.props.touched.debitoVencido && this.props.errors.debitoVencido && (<p className="form__field-error">{this.props.errors.debitoVencido}</p>)}
                    </div>
                    <div className="form-group col-1-of-3">
                        <label className="form__label" htmlFor="debitoNc">Notas de Credito</label>
                        <Field className="form__field" id="debitoNc" type="text" name="debitoNc" onBlur={this.onDebitoNc} />
                    </div>
                </div>
                <div className="row">
                    <h1 className="form__group-title">Credito</h1>
                    <div className="form-group col-1-of-3">
                        <label className="form__label" htmlFor="creditoTotal">Total</label>
                        <Field className="form__field" id="creditoTotal" type="text" name="creditoTotal" onBlur={this.onCreditoTotal} />
                        {this.props.touched.creditoTotal && this.props.errors.creditoTotal && (<p className="form__field-error">{this.props.errors.creditoTotal}</p>)}
                    </div>
                    <div className="form-group col-1-of-3">
                        <label className="form__label" htmlFor="creditoVencido">Vencido</label>
                        <Field className="form__field" id="creditoVencido" type="text" name="creditoVencido" onBlur={this.onCreditoVencido} />
                        {this.props.touched.creditoVencido && this.props.errors.creditoVencido && (<p className="form__field-error">{this.props.errors.creditoVencido}</p>)}
                    </div>
                    <div className="form-group col-1-of-3">
                        <label className="form__label" htmlFor="creditoNc">Notas de Credito</label>
                        <Field className="form__field" id="creditoNc" type="text" name="creditoNc" onBlur={this.onCreditoNc} />
                    </div>
                </div>
                <div className="row">
                    <button className="btn">Cargar</button>
                </div>
            </Form>
        );
    }
}

const validationSchema = () => Yup.object().shape({
    fecha: Yup
        .string()
        .required('Fecha es requerido'),
    caja: Yup
        .string()
        .required('Caja es requerido'),
    bancos: Yup
        .string()
        .required('Bancos es requerido'),
    cheques: Yup
        .string()
        .required('Cheques es requerido'),
    debitoTotal: Yup
        .string()
        .required('Debito total es requerido'),
    debitoVencido: Yup
        .string()
        .required('Debito vencido es requerido'),
    creditoTotal: Yup
        .string()
        .required('Credito total es requerido'),
    creditoVencido: Yup
        .string()
        .required('Credito vencido es requerido')
});

const onSubmit = (values, { props, resetForm }) => {
    const { fecha, caja, bancos, cheques, debitoTotal, debitoVencido, debitoNc, creditoTotal, creditoVencido, creditoNc } = values;

    const debito = {
        total: numeral(debitoTotal).value(),
        vencido: numeral(debitoVencido).value(),
        nc: numeral(debitoNc).value()
    };

    const credito = {
        total: numeral(creditoTotal).value(),
        vencido: numeral(creditoVencido).value(),
        nc: numeral(creditoNc).value()
    };

    const info = {
        fecha: moment(fecha).valueOf(),
        caja: numeral(caja).value(),
        bancos: numeral(bancos).value(),
        cheques: numeral(bancos).value(),
        debito,
        credito
    };

    props.add(info, props.history);
};

const mapPropsToValues = (props) => ({
    fecha: '',
    caja: 0,
    bancos: 0,
    cheques: 0,
    debitoTotal: 0,
    debitoVencido: 0,
    debitoNc: 0,
    creditoTotal: 0,
    creditoVencido: 0,
    creditoNc: 0
});

export default connect(null, { add })(withFormik({
    mapPropsToValues,
    validationSchema,
    handleSubmit: onSubmit
})(AddDiaria));