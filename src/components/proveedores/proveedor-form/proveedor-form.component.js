import React, { Component } from 'react';
import { connect } from 'react-redux';
import { withFormik, Form, Field } from 'formik';
import Loader from 'react-loader';
import Yup from 'yup';

class ProveedorForm extends Component {
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
                            <label className="form__label" htmlFor="nombre">Nombre</label>
                            <Field className="form__field" id="nombre" type="text" name="nombre" />
                            {this.props.touched.nombre && this.props.errors.nombre && (<p className="form__field-error">{this.props.errors.nombre}</p>)}
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

const mapPropsToValues = ({ proveedor }) => {
    return {
        codigo: proveedor ? proveedor.codigo : '',
        nombre: proveedor ? proveedor.nombre : ''
    }
};

const validationSchema = () => Yup.object().shape({
    nombre: Yup
        .string()
        .required('Nombre es requerido')
});

const onSubmit = (values, { props, resetForm }) => {
    const { nombre } = values;

    const proveedor = {
        nombre
    };

    props.accion(proveedor);
};

const mapStateToProps = (state) => {
    return { loading: state.proveedor.loading }
};

export default connect(mapStateToProps)(withFormik({
    mapPropsToValues,
    validationSchema,
    handleSubmit: onSubmit
})(ProveedorForm));