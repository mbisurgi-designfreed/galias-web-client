import React, { Component } from 'react';
import { withFormik, Form, Field } from 'formik';
import Yup from 'yup';

class TelefonoForm extends Component {
    render() {
        return (
            <div>
                <h3 className="modal-title" >Telefono</h3>
                <Form className="form">
                    <div className="row">
                        <div className="form-group col-1-of-4">
                            <label className="form__label" htmlFor="tipo">Tipo</label>
                            <Field className="form__field" id="tipo" type="text" name="tipo" />
                            {this.props.touched.tipo && this.props.errors.tipo && (<p className="form__field-error">{this.props.errors.tipo}</p>)}
                        </div>
                        <div className="form-group col-3-of-4">
                            <label className="form__label" htmlFor="numero">Numero</label>
                            <Field className="form__field" id="numero" type="text" name="numero" />
                            {this.props.touched.numero && this.props.errors.numero && (<p className="form__field-error">{this.props.errors.numero}</p>)}
                        </div>
                    </div>
                    <button className="btn">{this.props.telefono.item ? 'Editar' : 'Agregar'}</button>
                </Form>
            </div>
        )
    }
};

const mapPropsToValues = ({ telefono }) => ({
    tipo: telefono.item ? telefono.item.tipo : '',
    numero: telefono.item ? telefono.item.numero : ''
});

const validationSchema = () => Yup.object().shape({
    tipo: Yup
        .string()
        .required('Tipo es requerido'),
    numero: Yup
        .string()
        .required('Numero es requerido')
});

const onSubmit = (values, { props, resetForm }) => {
    const { tipo, numero } = values;
    const telefono = {
        tipo,
        numero
    };

    resetForm();
    props.onSubmit({ telefono, index: props.telefono.item ? props.telefono.index : null });
}

export default withFormik({
    mapPropsToValues,
    validationSchema,
    handleSubmit: onSubmit
})(TelefonoForm);