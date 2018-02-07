import React, { Component } from 'react';
import { connect } from 'react-redux';
import { withFormik, Form, Field } from 'formik';
import Select from 'react-select';
import Yup from 'yup';

import SearchPlace from '../../search-place/search-place.component';
import Map from '../../search-place/map.component';
import PersonaModal from './persona-form/persona-modal.component';
import SucursalModal from './sucursal-form/sucursal-modal.component';
import TelefonoModal from './telefono-form/telefono-modal.component';

import { list as getCanales } from '../../../actions/canal.action';
import { list as getSubcanales } from '../../../actions/subcanal.action';

class ClienteForm extends Component {
    state = {
        ubicacion: undefined,
        canales: [],
        subcanales: [],
        persona: { item: undefined },
        telefono: { item: undefined },
        sucursal: { item: undefined },
    }

    componentWillMount() {
        this.props.getCanales();
        this.props.getSubcanales();
    }

    componentWillReceiveProps(nextProps) {
        const canales = nextProps.canales.map((canal) => {
            return {
                value: canal._id,
                label: canal.nombre
            };
        });

        this.setState(() => ({ canales }));
    }

    IVA = [{
        value: 'ri',
        label: 'Responsable inscripto'
    }, {
        value: 'rs',
        label: 'Responsable monotributo'
    }, {
        value: 'cf',
        label: 'Consumidor final'
    }, {
        value: 'ex',
        label: 'Exento'
    }]

    DIAS = [{
        value: 'lunes',
        label: 'Lunes'
    }, {
        value: 'martes',
        label: 'Martes'
    }, {
        value: 'miercoles',
        label: 'Miercoles'
    }, {
        value: 'jueves',
        label: 'Jueves'
    }, {
        value: 'viernes',
        label: 'Viernes'
    }, {
        value: 'sabado',
        label: 'Sabado',
    }];

    CLASIFICACION = [{
        value: 'a',
        label: 'A'
    }, {
        value: 'b',
        label: 'B'
    }, {
        value: 'c',
        label: 'C'
    }];

    placeChanged = (place) => {
        if (place === undefined) {
            return;
        }

        const { calle, altura, localidad, codigoPostal, ubicacion } = place;

        this.setState(() => ({ ubicacion: place.ubicacion }));

        this.props.setFieldValue('calle', calle);
        this.props.setFieldValue('altura', altura);
        this.props.setFieldValue('localidad', localidad);
        this.props.setFieldValue('codigoPostal', codigoPostal);
        this.props.setFieldValue('lat', ubicacion.lat);
        this.props.setFieldValue('lng', ubicacion.lng);
    }

    ivaChanged = (iva) => {
        this.props.setFieldValue('iva', iva);
    }

    ivaBlur = () => {
        this.props.setFieldTouched('iva', true);
    }

    visitaChanged = (dia) => {
        this.props.setFieldValue('visita', dia);
    }

    visitaBlur = () => {
        this.props.setFieldTouched('visita', true);
    }

    entregaChanged = (dia) => {
        this.props.setFieldValue('entrega', dia);
    }

    entregaBlur = () => {
        this.props.setFieldTouched('entrega', true);
    }

    canalChanged = (canal) => {
        this.props.setFieldValue('canal', canal);
        this.props.setFieldValue('subcanal', '');

        if (canal) {
            const subcanales = this.props.subcanales.filter((subcanal) => {
                return subcanal.canal === canal.value;
            }).map((subcanal) => {
                return {
                    value: subcanal._id,
                    label: subcanal.nombre
                };
            });

            this.setState(() => ({ subcanales }));
        }
    }

    canalBlur = () => {
        this.props.setFieldTouched('canal', true);
    }

    subcanalChanged = (subcanal) => {
        this.props.setFieldValue('subcanal', subcanal);
    }

    subcanalBlur = () => {
        this.props.setFieldTouched('subcanal', true);
    }

    clasificacionChanged = (clasificacion) => {
        this.props.setFieldValue('clasificacion', clasificacion);
    }

    clasificacionBlur = () => {
        this.props.setFieldTouched('clasificacion', true);
    }

    onAgregarPersona = () => {
        this.setState(() => ({ persona: { item: null } }));
    }

    onEditarPersona = (i) => {
        this.setState(() => ({ persona: { item: this.props.values.personas[i], index: i } }));
    }

    onClosePersona = ({ persona, index }) => {
        if (persona && index == null) {
            const personas = this.props.values.personas;
            personas.push(persona);

            this.props.setFieldValue('personas', personas);
        } else if (persona && index !== null) {
            const personas = this.props.values.personas;
            personas[index] = persona;

            this.props.setFieldValue('personas', personas);
        }

        this.setState(() => ({ persona: { item: undefined } }));
    }

    renderPersonas = () => {
        return this.props.values.personas.map((persona, i) => {
            return (
                <li className="form__list-item" key={i}>
                    <a onClick={() => this.onEditarPersona(i)}>
                        <i className="fa fa-pencil icon-small"></i>
                    </a>
                    <p>{`${persona.cargo} ${persona.nombre}`}</p>
                </li>
            )
        });
    };

    onAgregarTelefono = () => {
        this.setState(() => ({ telefono: { item: null } }));
    }

    onEditarTelefono = (i) => {
        this.setState(() => ({ telefono: { item: this.props.values.telefonos[i], index: i } }));
    }

    onCloseTelefono = ({ telefono, index }) => {
        if (telefono && index == null) {
            const telefonos = this.props.values.telefonos;
            telefonos.push(telefono);

            this.props.setFieldValue('telefonos', telefonos);
        } else if (telefono && index !== null) {
            const telefonos = this.props.values.telefonos;
            telefonos[index] = telefono;

            this.props.setFieldValue('telefonos', telefonos);
        }

        this.setState(() => ({ telefono: { item: undefined } }));
    }

    renderTelefonos = () => {
        return this.props.values.telefonos.map((telefono, i) => {
            return (
                <li className="form__list-item" key={i}>
                    <a onClick={() => this.onEditarTelefono(i)}>
                        <i className="fa fa-pencil icon-small"></i>
                    </a>
                    <p>{`${telefono.tipo} ${telefono.numero}`}</p>
                </li>
            )
        });
    };

    onAgregarSucursal = () => {
        this.setState(() => ({ sucursal: { item: null } }));
    }

    onEditarSucursal = (i) => {
        this.setState(() => ({ sucursal: { item: this.props.values.sucursales[i], index: i } }));
    }

    onCloseSucursal = ({ sucursal, index }) => {
        if (sucursal && index == null) {
            const sucursales = this.props.values.sucursales;
            sucursales.push(sucursal);

            this.props.setFieldValue('sucursales', sucursales);
        } else if (sucursal && index !== null) {
            const sucursales = this.props.values.sucursales;
            sucursales[index] = sucursal;

            this.props.setFieldValue('sucursales', sucursales);
        }

        this.setState(() => ({ sucursal: { item: undefined } }));
    }

    renderSucursales = () => {
        return this.props.values.sucursales.map((sucursal, i) => {
            return (
                <li className="form__list-item" key={i}>
                    <a onClick={() => this.onEditarSucursal(i)}>
                        <i className="fa fa-pencil icon-small"></i>
                    </a>
                    <p>{`${sucursal.calle} ${sucursal.altura}`}</p>
                </li>
            )
        });
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
                        <div className="form-group col-1-of-4">
                            <label className="form__label" htmlFor="razonSocial">Razon Social</label>
                            <Field className="form__field" id="razonSocial" type="text" name="razonSocial" />
                            {this.props.touched.razonSocial && this.props.errors.razonSocial && (<p className="form__field-error">{this.props.errors.razonSocial}</p>)}
                        </div>
                        <div className="form-group col-1-of-4">
                            <label className="form__label" htmlFor="cuit">Cuit</label>
                            <Field className="form__field" id="cuit" type="text" name="cuit" />
                            {this.props.touched.cuit && this.props.errors.cuit && (<p className="form__field-error">{this.props.errors.cuit}</p>)}
                        </div>
                        <div className="form-group col-1-of-4">
                            <label className="form__label" htmlFor="iva">Condicion de Iva</label>
                            <Select id="iva" options={this.IVA} multi={false} value={this.props.values.iva} onChange={this.ivaChanged} onBlur={this.ivaBlur} />
                            {this.props.touched.iva && this.props.errors.iva && (<p className="form__field-error">{this.props.errors.iva}</p>)}
                        </div>
                        {/* <div className="form-group col-1-of-4">
                            <label className="form__label" htmlFor="nombreComercial">Nombre Comercial</label>
                            <Field className="form__field" id="nombreComercial" type="text" name="nombreComercial" />
                        </div> */}
                    </div>
                    <div className="row">
                        <div className="form-group col-1-of-4">
                            <label className="form__label" htmlFor="nombreComercial">Nombre Comercial</label>
                            <Field className="form__field" id="nombreComercial" type="text" name="nombreComercial" />
                        </div>
                    </div>
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
                        <div className="col-1-of-2">
                            {this.state.ubicacion && <Map containerElement={<div style={{ width: '100%', height: 200 }} />} mapElement={<div style={{ height: `100%` }} />} ubicacion={this.state.ubicacion} />}
                        </div>
                    </div>
                    <div className="row">
                        <div className="form-group col-1-of-3">
                            <label className="form__label">Telefonos</label>
                            <ul className="form__list">
                                {this.renderTelefonos()}
                            </ul>
                            <button type="button" className="btn-link" onClick={this.onAgregarTelefono}><i className="fa fa-plus-circle icon-small"></i>agregar telefono</button>
                        </div>
                        <div className="form-group col-1-of-3">
                            <label className="form__label">Sucursales</label>
                            <ul className="form__list">
                                {this.renderSucursales()}
                            </ul>
                            <button type="button" className="btn-link" onClick={this.onAgregarSucursal}><i className="fa fa-plus-circle icon-small"></i>agregar sucursal</button>
                        </div>
                        <div className="form-group col-1-of-3">
                            <label className="form__label">Personas de Interes</label>
                            <ul className="form__list">
                                {this.renderPersonas()}
                            </ul>
                            <button type="button" className="btn-link" onClick={this.onAgregarPersona}><i className="fa fa-plus-circle icon-small"></i>agregar persona de interes</button>
                        </div>
                    </div>
                    <div className="row">
                        <div className="form-group col-1-of-4">
                            <label className="form__label" htmlFor="email">Email</label>
                            <Field className="form__field" id="email" type="email" name="email" />
                            {this.props.touched.email && this.props.errors.email && (<p className="form__field-error">{this.props.errors.email}</p>)}
                        </div>
                    </div>
                    <div className="row">
                        <div className="form-group col-1-of-2">
                            <label className="form__label" htmlFor="visita">Dia de Visita</label>
                            <Select id="visita" options={this.DIAS} multi={true} value={this.props.values.visita} onChange={this.visitaChanged} onBlur={this.visitaBlur} />
                            {this.props.touched.visita && this.props.errors.visita && (<p className="form__field-error">{this.props.errors.visita}</p>)}
                        </div>
                        <div className="form-group col-1-of-2">
                            <label className="form__label" htmlFor="entrega">Dia de Entrega</label>
                            <Select id="entrega" options={this.DIAS} multi={true} value={this.props.values.entrega} onChange={this.entregaChanged} onBlur={this.entregaBlur} />
                            {this.props.touched.entrega && this.props.errors.entrega && (<p className="form__field-error">{this.props.errors.entrega}</p>)}
                        </div>
                    </div>
                    <div className="row">
                        <div className="form-group col-1-of-3">
                            <label className="form__label" htmlFor="canal">Canal</label>
                            <Select id="canal" options={this.state.canales} multi={false} value={this.props.values.canal} onChange={this.canalChanged} onBlur={this.canalBlur} />
                            {this.props.touched.canal && this.props.errors.canal && (<p className="form__field-error">{this.props.errors.canal}</p>)}
                        </div>
                        <div className="form-group col-1-of-3">
                            <label className="form__label" htmlFor="subcanal">Sub Canal</label>
                            <Select id="subcanal" options={this.state.subcanales} multi={false} value={this.props.values.subcanal} onChange={this.subcanalChanged} onBlur={this.subcanalBlur} />
                            {this.props.touched.subcanal && this.props.errors.subcanal && (<p className="form__field-error">{this.props.errors.subcanal}</p>)}
                        </div>
                        <div className="form-group col-1-of-3">
                            <label className="form__label" htmlFor="clasificacion">Clasificacion</label>
                            <Select id="clasificacion" options={this.CLASIFICACION} multi={false} value={this.props.values.clasificacion} onChange={this.clasificacionChanged} onBlur={this.clasificacionBlur} />
                        </div>
                    </div>
                    <div className="row">
                        <button className="btn" disabled={this.state.loading}>{this.props.cliente ? 'Editar' : 'Agregar'}</button>
                    </div>
                </Form>
                <PersonaModal persona={this.state.persona} onCloseModal={this.onClosePersona} />
                <SucursalModal sucursal={this.state.sucursal} onCloseModal={this.onCloseSucursal} />
                <TelefonoModal telefono={this.state.telefono} onCloseModal={this.onCloseTelefono} />
            </div>
        );
    }
}

const mapPropsToValues = ({ cliente }) => ({
    codigo: cliente ? cliente.codigo : '',
    razonSocial: cliente ? cliente.razonSocial : '',
    cuit: cliente ? cliente.cuit : '',
    iva: cliente ? cliente.iva : '',
    nombreComercial: cliente ? cliente.nombreComercial : '',
    calle: cliente ? cliente.direccion.calle : '',
    altura: cliente ? cliente.direccion.altura : '',
    localidad: cliente ? cliente.direccion.localidad : '',
    codigoPostal: cliente ? cliente.direccion.codigoPostal : '',
    lat: cliente ? cliente.direccion.geometry.coordinates[1] : 0,
    lng: cliente ? cliente.direccion.geometry.coordinates[0] : 0,
    sucursales: cliente ? cliente.sucursales : [],
    telefonos: cliente ? cliente.telefonos : [],
    email: cliente ? cliente.email : '',
    canal: '',
    subcanal: '',
    clasificacion: cliente ? cliente.clasificacion : 'c',
    visita: cliente ? cliente.diaVisita : [],
    entrega: cliente ? cliente.diaEntrega : [],
    personas: cliente ? cliente.personas : []
});

const validationSchema = () => Yup.object().shape({
    razonSocial: Yup
        .string()
        .required('Razon social es requerido'),
    cuit: Yup
        .string()
        .required('Cuit es requerido'),
    iva: Yup
        .string()
        .required('Condicion de IVA es requerido'),
    calle: Yup
        .string()
        .required('Calle es requerido'),
    altura: Yup
        .string()
        .required('Altura es requerido'),
    email: Yup
        .string()
        .email('Email no es valido'),
    canal: Yup
        .string()
        .required('Canal es requerido'),
    subcanal: Yup
        .string()
        .required('Subcanal es requerido'),
    visita: Yup
        .array()
        .required('Dia de visita es requerido'),
    entrega: Yup
        .array()
        .required('Dia de entrega es requerido')
});

const onSubmit = (values, { props, resetForm }) => {
    const { razonSocial, cuit, iva, nombreComercial, calle, altura, localidad, codigoPostal, lat, lng, email, telefonos, sucursales, personas } = values;

    const direccion = {
        calle,
        altura,
        localidad,
        codigoPostal,
        geometry: {
            coordinates: [lng, lat]
        }
    };

    const cliente = {
        razonSocial,
        cuit,
        iva: values.iva.value,
        nombreComercial,
        direccion,
        telefonos,
        email,
        sucursales,
        canal: values.canal.value,
        subcanal: values.subcanal.value,
        clasificacion: values.clasificacion,
        diaVisita: values.visita.map(visita => visita.value),
        diaEntrega: values.entrega.map(entrega => entrega.value),
        personas
    }

    props.accion(cliente);
};

const mapStateToProps = (state) => {
    return { canales: state.canal, subcanales: state.subcanal, loading: state.cliente.adding }
};

export default withFormik({
    mapPropsToValues,
    validationSchema,
    handleSubmit: onSubmit
})(connect(mapStateToProps, { getCanales, getSubcanales })(ClienteForm));

