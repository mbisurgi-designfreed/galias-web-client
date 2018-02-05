import React, { Component } from 'react';
import { withFormik, Form, Field } from 'formik';
import Yup from 'yup';

import SearchPlace from '../../../search-place/search-place.component';
import Map from '../../../search-place/map.component';

class PersonaForm extends Component {
    state = {
        ubicacion: undefined
    }

    placeChanged = (place) => {
        if (place === undefined) {
            return;
        }

        const { calle, altura, localidad, codigoPostal, ubicacion } = place;

        this.setState(() => ({ ubicacion: place.ubicacion }));

        this.props.setFieldValue('calle', calle);
        this.props.setFieldValue('localidad', localidad);
        this.props.setFieldValue('codigoPostal', codigoPostal);
        this.props.setFieldValue('altura', altura);
        this.props.setFieldValue('lat', ubicacion.lat);
        this.props.setFieldValue('lng', ubicacion.lng);
    }

    render() {
        return (
            <div>
                <h3 className="modal-title" >Persona de Interes</h3>
                <Form className="form">
                    <div className="row">
                        <SearchPlace placeChanged={this.placeChanged} />
                    </div>
                    <div className="row">
                        <div className="form-group col-1-of-4">
                            <label className="form__label" htmlFor="calle">Calle</label>
                            <Field className="form__field" id="calle" type="text" name="calle" />
                            {this.props.touched.calle && this.props.errors.calle && (<p className="form__field-error">{this.props.errors.calle}</p>)}
                        </div>
                        <div className="form-group col-1-of-4">
                            <label className="form__label" htmlFor="altura">Altura</label>
                            <Field className="form__field" id="altura" type="text" name="altura" />
                            {this.props.touched.altura && this.props.errors.altura && (<p className="form__field-error">{this.props.errors.altura}</p>)}
                        </div>
                        <div className="form-group col-1-of-4">
                            <label className="form__label" htmlFor="localidad">Localidad</label>
                            <Field className="form__field" id="localidad" type="text" name="localidad" />
                        </div>
                        <div className="form-group col-1-of-4">
                            <label className="form__label" htmlFor="codigoPostal">Codigo Postal</label>
                            <Field className="form__field" id="codigoPostal" type="text" name="codigoPostal" />
                        </div>
                    </div>
                    <div className="row">
                        <div className="form-group col-1-of-4">
                            <label className="form__label" htmlFor="lat">Latitud</label>
                            <Field className="form__field" id="lat" type="text" name="lat" disabled />
                        </div>
                        <div className="form-group col-1-of-4">
                            <label className="form__label" htmlFor="lng">Longitud</label>
                            <Field className="form__field" id="lng" type="text" name="lng" disabled />
                        </div>
                    </div>
                    <div className="row">
                        {this.state.ubicacion && <Map containerElement={<div style={{ width: '100%', height: 200 }} />} mapElement={<div style={{ height: `100%` }} />} ubicacion={this.state.ubicacion} />}
                    </div>
                    <button className="btn">{this.props.persona.item ? 'Editar' : 'Agregar'}</button>
                </Form>
            </div>
        )
    }
};

const mapPropsToValues = ({ persona }) => ({
    calle: persona.item ? persona.item.direccion.calle : '',
    altura: persona.item ? persona.item.direccion.altura : '',
    localidad: persona.item ? persona.item.direccion.localidad : '',
    codigoPostal: persona.item ? persona.item.direccion.codigoPostal : '',
    lat: persona.item ? persona.item.direccion.geometry.coordinates[1] : 0,
    lng: persona.item ? persona.item.direccion.geometry.coordinates[0] : 0,
});

const validationSchema = () => Yup.object().shape({
    calle: Yup
        .string()
        .required('Calle es requerido'),
    altura: Yup
        .string()
        .required('Altura es requerido')
});

const onSubmit = (values, { props, resetForm }) => {
    const { calle, altura, localidad, codigoPostal, lat, lng } = values;
    const sucursal = {
        calle,
        altura,
        localidad,
        codigoPostal,
        geometry: {
            coordinates: [lng, lat]
        }
    };

    resetForm();
    props.onSubmit({ sucursal, index: props.sucursal.item ? props.sucursal.index : null });
}

export default withFormik({
    mapPropsToValues,
    validationSchema,
    handleSubmit: onSubmit
})(PersonaForm);