import React, { Component } from 'react';
import { connect } from 'react-redux';
import { withFormik, Form, Field } from 'formik';
import Loader from 'react-loader';
import Select from 'react-select';
import Yup from 'yup';

class ArticuloCompetenciaForm extends Component {
    componentWillMount() {

    };

    componentWillReceiveProps(nextProps) {

    };

    render() {
        return (
            <div>
                <Form className="form mb-xl">
                    <div className="row">
                        <div className="form-group col-1-of-4">
                            <label className="form__label" htmlFor="codigo">Codigo</label>
                            <Field className="form__field" id="codigo" type="text" name="codigo" disabled style={{ cursor: 'auto' }} />
                        </div>
                        <div className="form-group col-2-of-4">
                            <label className="form__label" htmlFor="descripcion">Descripcion</label>
                            <Field className="form__field" id="descripcion" type="text" name="descripcion" />
                            {this.props.touched.descripcion && this.props.errors.descripcion && (<p className="form__field-error">{this.props.errors.descripcion}</p>)}
                        </div>
                        <div className="form-group col-1-of-4">
                            <label className="form__label" htmlFor="proveedor">Proveedor</label>
                            <Field className="form__field" id="proveedor" type="text" name="proveedor" />
                            {this.props.touched.proveedor && this.props.errors.proveedor && (<p className="form__field-error">{this.props.errors.proveedor}</p>)}
                        </div>
                    </div>
                    <div className="row">
                        <Loader className="spinner mt-medium" loaded={!this.props.loading} color="#ed1c24" scale={0.5}>
                            <button className="btn" disabled={this.props.loading}>{this.props.articulo ? 'Editar' : 'Agregar'}</button>
                        </Loader>
                    </div>
                </Form>
            </div>
        );
    }
}

const mapPropsToValues = ({ articulo }) => {
    return {
        codigo: articulo ? articulo.codigo : '',
        descripcion: articulo ? articulo.descripcion : '',
        proveedor: articulo ? articulo.proveedor : '',
    }
};

const validationSchema = () => Yup.object().shape({
    descripcion: Yup
        .string()
        .required('Descripcion es requerido'),
    proveedor: Yup
        .string()
        .required('Proveedor es requerido')
});

const onSubmit = (values, { props, resetForm }) => {
    const { descripcion, proveedor } = values;

    const articulo = {
        descripcion,
        proveedor
    };

    props.accion(articulo);
};

const mapStateToProps = (state) => {
    return { loading: state.articulo.loading }
};

export default connect(mapStateToProps)(withFormik({
    mapPropsToValues,
    validationSchema,
    handleSubmit: onSubmit
})(ArticuloCompetenciaForm));