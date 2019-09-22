import React, { Component } from 'react';
import { connect } from 'react-redux';
import { withFormik, Form, Field } from 'formik';
import Loader from 'react-loader';
import Select from 'react-select';
import Yup from 'yup';

import SearchPlace from '../../search-place/search-place.component';
import Map from '../../search-place/map.component';
import PersonaModal from './persona-form/persona-modal.component';
import SucursalModal from './sucursal-form/sucursal-modal.component';
import TelefonoModal from './telefono-form/telefono-modal.component';
import ClientMap from './clientMap';

import { list as getCanales } from '../../../actions/canal.action';
import { list as getSubcanales } from '../../../actions/subcanal.action';
import { removeAlert } from '../../../actions/alert.action';

class ClienteForm extends Component {
    state = {
        ubicacion: undefined,
        canales: [],
        subcanales: [],
        persona: { item: undefined },
        telefono: { item: undefined },
        sucursal: { item: undefined },
    };

    componentWillMount() {
        const canales = this.props.canales.map((canal) => {
            return {
                value: canal._id,
                label: canal.nombre
            };
        });

        this.setState(() => ({ canales }));

        if (this.props.cliente) {
            const subcanales = this.props.subcanales.filter((subcanal) => {
                return subcanal.canal === this.props.cliente.canal;
            }).map((subcanal) => {
                return {
                    value: subcanal._id,
                    label: subcanal.nombre
                };
            });

            let ubicacion = undefined;

            if (this.props.cliente.direccion.geometry) {
                ubicacion = {
                    lat: this.props.cliente.direccion.geometry.coordinates[1],
                    lng: this.props.cliente.direccion.geometry.coordinates[0]
                }
            }

            this.setState(() => ({ subcanales, ubicacion }));
        }
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
    }];

    PAGO = [{
        value: 0,
        label: 0
    }, {
        value: 1,
        label: 1
    }, {
        value: 15,
        label: 15
    }, {
        value: 21,
        label: 21
    }, {
        value: 30,
        label: 30
    }, {
        value: 45,
        label: 45
    }];

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

    DIVISION = [{
        value: 'calsa',
        label: 'Insumos de panaderia'
    }, {
        value: 'no calsa',
        label: 'Consumo masivo'
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

    showAlert = () => {
        if (this.props.alert.alert) {
            setTimeout(() => {
                this.props.removeAlert();
            }, 3000);

            return <a className="alert" onClick={this.onAlertClick}>{this.props.alert.alert}</a>
        }
    };

    onAlertClick = () => {
        this.props.removeAlert();
    };

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

        this.renderMap();
    };

    ivaChanged = (iva) => {
        this.props.setFieldValue('iva', iva.value);
    };

    ivaBlur = () => {
        this.props.setFieldTouched('iva', true);
    };

    pagoChanged = (pago) => {
        this.props.setFieldValue('condicionPago', pago.value);
    };

    pagoBlur = () => {
        this.props.setFieldTouched('condicionPago', true);
    };

    visitaChanged = (dia) => {
        this.props.setFieldValue('visita', dia);
    };

    visitaBlur = () => {
        this.props.setFieldTouched('visita', true);
    };

    entregaChanged = (dia) => {
        this.props.setFieldValue('entrega', dia);
    };

    entregaBlur = () => {
        this.props.setFieldTouched('entrega', true);
    };

    canalChanged = (canal) => {
        this.props.setFieldValue('canal', canal.value);
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
    };

    canalBlur = () => {
        this.props.setFieldTouched('canal', true);
    };

    subcanalChanged = (subcanal) => {
        this.props.setFieldValue('subcanal', subcanal.value);
    };

    subcanalBlur = () => {
        this.props.setFieldTouched('subcanal', true);
    };

    divisionChanged = (division) => {
        this.props.setFieldValue('division', division.value);
    };

    divisionBlur = () => {
        this.props.setFieldTouched('division', true);
    };

    clasificacionChanged = (clasificacion) => {
        this.props.setFieldValue('clasificacion', clasificacion.value);
    };

    clasificacionBlur = () => {
        this.props.setFieldTouched('clasificacion', true);
    };

    onAgregarPersona = () => {
        this.setState(() => ({ persona: { item: null } }));
    };

    onEditarPersona = (i) => {
        this.setState(() => ({ persona: { item: this.props.values.personas[i], index: i } }));
    };

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
    };

    renderPersonas = () => {
        return this.props.values.personas.map((persona, i) => {
            return (
                <li className="form__list-item" key={i}>
                    <a onClick={() => this.onEditarPersona(i)}>
                        <i className="fas fa-pencil-alt icon-small"></i>
                    </a>
                    <p className="form__list-item--title">{`${persona.cargo}`}</p>
                    <p className="form__list-item--detail">{`${persona.nombre}`}</p>
                </li>
            )
        });
    };

    onAgregarTelefono = () => {
        this.setState(() => ({ telefono: { item: null } }));
    };

    onEditarTelefono = (i) => {
        this.setState(() => ({ telefono: { item: this.props.values.telefonos[i], index: i } }));
    };

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
    };

    renderTelefonos = () => {
        return this.props.values.telefonos.map((telefono, i) => {
            return (
                <li className="form__list-item" key={i}>
                    <a onClick={() => this.onEditarTelefono(i)}>
                        <i className="fas fa-pencil-alt icon-small"></i>
                    </a>
                    <p className="form__list-item--title">{`${telefono.tipo}`}</p>
                    <p className="form__list-item--detail">{`${telefono.numero}`}</p>
                </li>
            )
        });
    };

    onAgregarSucursal = () => {
        this.setState(() => ({ sucursal: { item: null } }));
    };

    onEditarSucursal = (i) => {
        this.setState(() => ({ sucursal: { item: this.props.values.sucursales[i], index: i } }));
    };

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
    };

    renderSucursales = () => {
        return this.props.values.sucursales.map((sucursal, i) => {
            return (
                <li className="form__list-item" key={i}>
                    <a onClick={() => this.onEditarSucursal(i)}>
                        <i className="fas fa-pencil-alt icon-small"></i>
                    </a>
                    <p>{`${sucursal.calle} ${sucursal.altura}`}</p>
                </li>
            )
        });
    };

    renderMap = () => {
        if (this.state.ubicacion) {
            return <Map containerElement={<div style={{ width: '100%', height: 200 }} />} mapElement={<div style={{ height: `100%` }} />} ubicacion={this.state.ubicacion} />
        }
    };

    onSetCoords = (lat, lng, calle, altura, localidad, codigoPostal) => {
        this.resetDireccion();

        if (calle) {
            this.props.setFieldValue('calle', calle);
        }

        if (altura) {
            this.props.setFieldValue('altura', altura);
        }

        if (localidad) {
            this.props.setFieldValue('localidad', localidad);
        }

        if (codigoPostal) {
            this.props.setFieldValue('codigoPostal', codigoPostal);
        }

        this.props.setFieldValue('lat', lat);
        this.props.setFieldValue('lng', lng);
    };

    resetDireccion = () => {
        this.props.setFieldValue('calle', '');
        this.props.setFieldValue('altura', '');
        this.props.setFieldValue('localidad', '');
        this.props.setFieldValue('codigoPostal', '');
    };

    render() {
        return (
            <div>
                <div className="alert-container">
                    {this.showAlert()}
                </div>
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
                    </div>
                    <div className="row">
                        <div className="form-group col-1-of-4">
                            <label className="form__label" htmlFor="nombreComercial">Nombre Comercial</label>
                            <Field className="form__field" id="nombreComercial" type="text" name="nombreComercial" />
                        </div>
                    </div>
                    {/*<div className="row">*/}
                    {/*    <SearchPlace placeChanged={this.placeChanged} />*/}
                    {/*</div>*/}
                    <div className="row" style={{height: '250px'}}>
                        <ClientMap setCoords={this.onSetCoords} lat={this.state.ubicacion && this.state.ubicacion.lat} lng={this.state.ubicacion && this.state.ubicacion.lng} />
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
                    {/*<div className="row">*/}
                    {/*    <div className="col-1-of-2">*/}
                    {/*        {this.renderMap()}*/}
                    {/*    </div>*/}
                    {/*</div>*/}
                    <div className="row">
                        <div className="form-group col-1-of-3">
                            <label className="form__label">Telefonos</label>
                            <ul className="form__list">
                                {this.renderTelefonos()}
                            </ul>
                            <button type="button" className="btn-link" onClick={this.onAgregarTelefono}><i className="fas fa-plus-circle icon-small"></i>agregar telefono</button>
                        </div>
                        <div className="form-group col-1-of-3">
                            <label className="form__label">Sucursales</label>
                            <ul className="form__list">
                                {this.renderSucursales()}
                            </ul>
                            <button type="button" className="btn-link" onClick={this.onAgregarSucursal}><i className="fas fa-plus-circle icon-small"></i>agregar sucursal</button>
                        </div>
                        <div className="form-group col-1-of-3">
                            <label className="form__label">Personas de Interes</label>
                            <ul className="form__list">
                                {this.renderPersonas()}
                            </ul>
                            <button type="button" className="btn-link" onClick={this.onAgregarPersona}><i className="fas fa-plus-circle icon-small"></i>agregar persona de interes</button>
                        </div>
                    </div>
                    <div className="row">
                        <div className="form-group col-1-of-3">
                            <label className="form__label" htmlFor="condicionPago">Condicion de Pago (Dias)</label>
                            <Select id="condicionPago" options={this.PAGO} multi={false} value={this.props.values.condicionPago} onChange={this.pagoChanged} onBlur={this.pagoBlur} />
                            {this.props.touched.condicionPago && this.props.errors.condicionPago && (<p className="form__field-error">{this.props.errors.condicionPago}</p>)}
                        </div>
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
                        <div className="form-group col-1-of-4">
                            <label className="form__label" htmlFor="division">Unidad de Negocio</label>
                            <Select id="division" options={this.DIVISION} multi={false} value={this.props.values.division} onChange={this.divisionChanged} onBlur={this.divisionBlur} />
                            {this.props.touched.division && this.props.errors.division && (<p className="form__field-error">{this.props.errors.division}</p>)}
                        </div>
                        <div className="form-group col-1-of-4">
                            <label className="form__label" htmlFor="canal">Canal</label>
                            <Select id="canal" options={this.state.canales} multi={false} value={this.props.values.canal} onChange={this.canalChanged} onBlur={this.canalBlur} />
                            {this.props.touched.canal && this.props.errors.canal && (<p className="form__field-error">{this.props.errors.canal}</p>)}
                        </div>
                        <div className="form-group col-1-of-4">
                            <label className="form__label" htmlFor="subcanal">Sub Canal</label>
                            <Select id="subcanal" options={this.state.subcanales} multi={false} value={this.props.values.subcanal} onChange={this.subcanalChanged} onBlur={this.subcanalBlur} />
                            {this.props.touched.subcanal && this.props.errors.subcanal && (<p className="form__field-error">{this.props.errors.subcanal}</p>)}
                        </div>
                        <div className="form-group col-1-of-4">
                            <label className="form__label" htmlFor="clasificacion">Clasificacion</label>
                            <Select id="clasificacion" options={this.CLASIFICACION} multi={false} value={this.props.values.clasificacion} onChange={this.clasificacionChanged} onBlur={this.clasificacionBlur} />
                        </div>
                    </div>
                    <div className="row">
                        <Loader className="spinner mt-medium" loaded={!this.props.loading} color="#ed1c24" scale={0.5}>
                            <button className="btn" disabled={this.props.loading}>{this.props.cliente ? 'Editar' : 'Agregar'}</button>
                        </Loader>
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
    division: cliente ? cliente.division : '',
    canal: cliente ? cliente.canal : '',
    subcanal: cliente ? cliente.subcanal : '',
    clasificacion: cliente ? cliente.clasificacion : 'c',
    condicionPago: cliente ? cliente.condicionPago : '',
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
        .nullable()
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
    division: Yup
        .string()
        .nullable()
        .required('Division es requerido'),
    canal: Yup
        .string()
        .nullable()
        .required('Canal es requerido'),
    subcanal: Yup
        .string()
        .nullable()
        .required('Subcanal es requerido'),
    condicionPago: Yup
        .string()
        .nullable()
        .required('Condicion de pago es requerido'),
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
        iva: values.iva,
        nombreComercial,
        direccion,
        telefonos,
        email,
        sucursales,
        canal: values.canal,
        subcanal: values.subcanal,
        division: values.division,
        clasificacion: values.clasificacion,
        condicionPago: values.condicionPago,
        diaVisita: typeof values.visita[0] === 'object' ? values.visita.map(visita => visita.value) : values.visita,
        diaEntrega: typeof values.entrega[0] === 'object' ? values.entrega.map(entrega => entrega.value) : values.entrega,
        personas
    }

    props.accion(cliente);
};

const mapStateToProps = (state) => {
    return { canales: state.canal, subcanales: state.subcanal, loading: state.cliente.loading, alert: state.alerts }
};

export default withFormik({
    mapPropsToValues,
    validationSchema,
    handleSubmit: onSubmit
})(connect(mapStateToProps, { getCanales, getSubcanales, removeAlert })(ClienteForm));

