import React, { Component } from 'react';
import { withFormik, Form, Field } from 'formik';
import Yup from 'yup';
import Select from 'react-select';

class UnidadCompraForm extends Component {
    DEFECTO = [{
        value: true,
        label: 'Si'
    }, {
        value: false,
        label: 'No'
    }];

    unidadChanged = (unidad) => {
        this.props.setFieldValue('unidad', unidad);
    }

    unidadBlur = () => {
        this.props.setFieldTouched('unidad', true);
    }

    defectoChanged = (defecto) => {
        this.props.setFieldValue('defecto', defecto);
    }

    defectoBlur = () => {
        this.props.setFieldTouched('defecto', true);
    }

    render() {
        return (
            <div>
                <h3 className="modal-title" >Unidad de Compra</h3>
                <Form className="form">
                    <div className="row">
                        <div className="form-group col-1-of-4">
                            <label className="form__label" htmlFor="unidad">Unidad</label>
                            <Select id="unidad" options={this.props.unidades} multi={false} value={this.props.values.unidad} onChange={this.unidadChanged} onBlur={this.unidadBlur} />
                            {this.props.touched.unidad && this.props.errors.unidad && (<p className="form__field-error">{this.props.errors.unidad}</p>)}
                        </div>
                        <div className="form-group col-1-of-4">
                            <label className="form__label" htmlFor="equivalencia">Equivalencia</label>
                            <Field className="form__field" id="equivalencia" type="number" name="equivalencia" />
                            {this.props.touched.equivalencia && this.props.errors.equivalencia && (<p className="form__field-error">{this.props.errors.equivalencia}</p>)}
                        </div>
                        <div className="form-group col-1-of-4">
                            <label className="form__label" htmlFor="defecto">Defecto</label>
                            <Select id="defecto" options={this.DEFECTO} multi={false} value={this.props.values.defecto} onChange={this.defectoChanged} onBlur={this.defectoBlur} />
                            {this.props.touched.defecto && this.props.errors.defecto && (<p className="form__field-error">{this.props.errors.defecto}</p>)}
                        </div>
                    </div>
                    <button className="btn">{this.props.unidadCpa.item ? 'Editar' : 'Agregar'}</button>
                </Form>
            </div>
        )
    }
};

const mapPropsToValues = ({ unidadCpa }) => ({
    unidad: unidadCpa.item ? unidadCpa.item.unidad : '',
    equivalencia: unidadCpa.item ? unidadCpa.item.equivalencia : 0,
    defecto: unidadCpa.item ? unidadCpa.item.defecto : false,
});

const validationSchema = () => Yup.object().shape({
    unidad: Yup
        .string()
        .nullable()
        .required('Unidad es requerido'),
    equivalencia: Yup
        .number()
        .moreThan(0, 'Equivalencia debe ser mayor que 0')
        .required('Equivalencia es requerido'),
    defecto: Yup
        .string()
        .nullable()
        .required('Defecto es requerido')
});

const onSubmit = (values, { props, resetForm }) => {
    const { unidad, equivalencia, defecto } = values;

    const unidadCpa = {
        unidad,
        equivalencia,
        defecto
    };

    resetForm();
    props.onSubmit({ unidadCpa, index: props.unidadCpa.item ? props.unidadCpa.index : null });
}

export default withFormik({
    mapPropsToValues,
    validationSchema,
    handleSubmit: onSubmit
})(UnidadCompraForm);