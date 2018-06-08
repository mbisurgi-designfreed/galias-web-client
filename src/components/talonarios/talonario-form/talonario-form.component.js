import React, { Component } from 'react';
import { connect } from 'react-redux';
import { withFormik, Form, Field } from 'formik';
import Loader from 'react-loader';
import Yup from 'yup';

class TalonarioForm extends Component {
    render() {
        return (
            <div>
                <Form className="form mb-xl">
                    <div className="row">
                        <div className="form-group col-1-of-4">
                            <label className="form__label" htmlFor="descripcion">Descripcion</label>
                            <Field className="form__field" id="descripcion" type="text" name="descripcion" />
                            {this.props.touched.descripcion && this.props.errors.descripcion && (<p className="form__field-error">{this.props.errors.descripcion}</p>)}
                        </div>
                        <div className="form-group col-1-of-4">
                            <label className="form__label" htmlFor="desde">Desde</label>
                            <Field className="form__field" id="desde" type="text" name="desde" />
                            {this.props.touched.desde && this.props.errors.desde && (<p className="form__field-error">{this.props.errors.desde}</p>)}
                        </div>
                        <div className="form-group col-1-of-4">
                            <label className="form__label" htmlFor="hasta">Hasta</label>
                            <Field className="form__field" id="hasta" type="text" name="hasta" />
                            {this.props.touched.hasta && this.props.errors.hasta && (<p className="form__field-error">{this.props.errors.hasta}</p>)}
                        </div>
                        <div className="form-group col-1-of-4">
                            <label className="form__label" htmlFor="tango">Tango</label>
                            <Field className="form__field" id="tango" type="checkbox" name="tango" />
                        </div>
                    </div>
                    <div className="row">
                        <Loader className="spinner mt-medium" loaded={!this.props.loading} color="#ed1c24" scale={0.5}>
                            <button className="btn" disabled={this.props.loading}>{this.props.talonario ? 'Editar' : 'Agregar'}</button>
                        </Loader>
                    </div>
                </Form>
            </div>
        );
    }
}

const mapPropsToValues = ({ talonario }) => ({
    descripcion: talonario ? talonario.descripcion : '',
    desde: talonario ? talonario.desde : 0,
    hasta: talonario ? talonario.hasta : 0,
    proximo: talonario ? talonario.proximo : 0,
    tango: talonario ? talonario.tango : false
});

const validationSchema = () => Yup.object().shape({
    descripcion: Yup
        .string()
        .required('Descripcion es requerido'),
    desde: Yup
        .number()
        .required('Desde es requerido'),
    hasta: Yup
        .number()
        .required('Hasta es requerido'),
    proximo: Yup
        .number()
        .required('Proximo es requerido')
});

const onSubmit = (values, { props, resetForm }) => {
    const { descripcion, desde, hasta, proximo, tango } = values;

    const talonario = {
        descripcion,
        desde,
        hasta,
        proximo,
        tango
    };

    props.accion(talonario);
};

const mapStateToProps = (state) => {
    return { loading: state.talonario.loading }
};

export default withFormik({
    mapPropsToValues,
    validationSchema,
    handleSubmit: onSubmit
})(connect(mapStateToProps)(TalonarioForm));

