import React, { Component } from 'react';
import { withFormik, Form, Field } from 'formik';

class ArticuloForm extends Component {
    render() {
        return (
            <div>
                <Form className="form mb-xl">
                    <div className="row">
                        <div className="form-group col-1-of-4">
                            <label className="form__label" htmlFor="codigo">Codigo</label>
                            <Field className="form__field" id="codigo" type="text" name="codigo" />
                        </div>
                        <div className="form-group col-1-of-4">
                            <label className="form__label" htmlFor="descripcion">Descripcion</label>
                            <Field className="form__field" id="descripcion" type="text" name="descripcion" />
                            {this.props.touched.descripcion && this.props.errors.descripcion && (<p className="form__field-error">{this.props.errors.descripcion}</p>)}
                        </div>
                    </div>
                </Form>
            </div>
        );
    }
}

const mapPropsToValues = ({ articulo }) => ({
    codigo: articulo ? articulo.codigo : '',
    descripcion: articulo ? articulo.descripcion : '',
});

export default withFormik({
    mapPropsToValues
})(ArticuloForm);