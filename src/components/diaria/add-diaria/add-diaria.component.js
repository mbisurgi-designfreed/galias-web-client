import React, { Component } from 'react';
import { connect } from 'react-redux';
import { withFormik, Form, Field } from 'formik';
import Yup from 'yup';
import moment from 'moment';

import { add } from '../../../actions/info.action';

import notification from '../../notification/notification.component';

class AddDiaria extends Component {
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
                        <Field className="form__field" id="caja" type="text" name="caja" />
                        {this.props.touched.caja && this.props.errors.caja && (<p className="form__field-error">{this.props.errors.caja}</p>)}
                    </div>
                    <div className="form-group col-1-of-3">
                        <label className="form__label" htmlFor="bancos">Bancos</label>
                        <Field className="form__field" id="bancos" type="text" name="bancos" />
                        {this.props.touched.bancos && this.props.errors.bancos && (<p className="form__field-error">{this.props.errors.bancos}</p>)}
                    </div>
                    <div className="form-group col-1-of-3">
                        <label className="form__label" htmlFor="cheques">Cheques</label>
                        <Field className="form__field" id="cheques" type="text" name="cheques" />
                        {this.props.touched.cheques && this.props.errors.cheques && (<p className="form__field-error">{this.props.errors.cheques}</p>)}
                    </div>
                </div>
                <div className="row">
                    <h1 className="form__group-title">Deuda</h1>
                    <div className="form-group col-1-of-3">
                        <label className="form__label" htmlFor="debitoTotal">Total</label>
                        <Field className="form__field" id="debitoTotal" type="text" name="debitoTotal" />
                        {this.props.touched.debitoTotal && this.props.errors.debitoTotal && (<p className="form__field-error">{this.props.errors.debitoTotal}</p>)}
                    </div>
                    <div className="form-group col-1-of-3">
                        <label className="form__label" htmlFor="debitoVencido">Vencido</label>
                        <Field className="form__field" id="debitoVencido" type="text" name="debitoVencido" />
                        {this.props.touched.debitoVencido && this.props.errors.debitoVencido && (<p className="form__field-error">{this.props.errors.debitoVencido}</p>)}
                    </div>
                    <div className="form-group col-1-of-3">
                        <label className="form__label" htmlFor="debitoNc">Notas de Credito</label>
                        <Field className="form__field" id="debitoNc" type="text" name="debitoNc" />
                    </div>
                </div>
                <div className="row">
                    <h1 className="form__group-title">Credito</h1>
                    <div className="form-group col-1-of-3">
                        <label className="form__label" htmlFor="creditoTotal">Total</label>
                        <Field className="form__field" id="creditoTotal" type="text" name="creditoTotal" />
                        {this.props.touched.creditoTotal && this.props.errors.creditoTotal && (<p className="form__field-error">{this.props.errors.creditoTotal}</p>)}
                    </div>
                    <div className="form-group col-1-of-3">
                        <label className="form__label" htmlFor="creditoVencido">Vencido</label>
                        <Field className="form__field" id="creditoVencido" type="text" name="creditoVencido" />
                        {this.props.touched.creditoVencido && this.props.errors.creditoVencido && (<p className="form__field-error">{this.props.errors.creditoVencido}</p>)}
                    </div>
                    <div className="form-group col-1-of-3">
                        <label className="form__label" htmlFor="creditoNc">Notas de Credito</label>
                        <Field className="form__field" id="creditoNc" type="text" name="creditoNc" />
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
        .number()
        .required('Caja es requerido'),
    bancos: Yup
        .number()
        .required('Bancos es requerido'),
    cheques: Yup
        .number()
        .required('Cheques es requerido'),
    debitoTotal: Yup
        .number()
        .required('Debito total es requerido'),
    debitoVencido: Yup
        .number()
        .required('Debito vencido es requerido'),
    creditoTotal: Yup
        .number()
        .required('Credito total es requerido'),
    creditoVencido: Yup
        .number()
        .required('Credito vencido es requerido')
});

const onSubmit = (values, { props, resetForm }) => {
    const { fecha, caja, bancos, cheques, debitoTotal, debitoVencido, debitoNc, creditoTotal, creditoVencido, creditoNc } = values;

    const debito = {
        total: debitoTotal,
        vencido: debitoVencido,
        nc: debitoNc
    };

    const credito = {
        total: creditoTotal,
        vencido: creditoVencido,
        nc: creditoNc
    };

    const info = {
        fecha: moment(fecha).valueOf(),
        caja,
        bancos,
        cheques,
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