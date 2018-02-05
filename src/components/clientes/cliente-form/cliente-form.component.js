import React, { Component } from 'react';
import { connect } from 'react-redux';
import { withFormik, Form, Field } from 'formik';
import Select from 'react-select';
import Yup from 'yup';

import SearchPlace from '../../search-place/search-place.component';
import Map from '../../search-place/map.component';
import SucursalModal from './sucursal-form/sucursal-modal.component';

import { list as getCanales } from '../../../actions/canal.action';
import { list as getSubcanales } from '../../../actions/subcanal.action';

class ClienteForm extends Component {
    state = {
        ubicacion: undefined,
        canales: [],
        subcanales: [],
        sucursal: { item: undefined },
        sucursales: this.props.cliente ? this.props.cliente.sucursales : []
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

    onAgregarSucursal = () => {
        this.setState(() => ({ sucursal: { item: null } }));
    }

    onEditarSucursal = (i) => {
        this.setState(() => ({ sucursal: { item: this.state.sucursales[i], index: i } }));
    }

    onCloseSucursal = ({ sucursal, index }) => {
        if (sucursal && index == null) {
            this.setState((prevState) => ({
                sucursales: prevState.sucursales.concat(sucursal)
            }));
        } else if (sucursal && index !== null) {
            this.setState((prevState) => {
                const sucursales = prevState.sucursales;
                sucursales[index] = sucursal;

                return { sucursales };
            });
        }

        this.setState(() => ({ sucursal: { item: undefined } }));
    }

    renderSucursales = () => {
        return this.state.sucursales.map((sucursal, i) => {
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
                <Form className="form">
                    <div className="row">
                        <div className="form-group col-1-of-4">
                            <label className="form__label" htmlFor="codigo">Codigo</label>
                            <Field className="form__field" id="codigo" type="text" name="codigo" disabled style={{ cursor: 'auto' }} />
                        </div>
                        <div className="form-group col-1-of-4">
                            <label className="form__label" htmlFor="razonSocial">Razon Social</label>
                            <Field className="form__field" id="razonSocial" type="text" name="razonSocial" />
                        </div>
                        <div className="form-group col-1-of-4">
                            <label className="form__label" htmlFor="cuit">Cuit</label>
                            <Field className="form__field" id="cuit" type="text" name="cuit" />
                        </div>
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
                        </div>
                        <div className="form-group col-1-of-4">
                            <label className="form__label" htmlFor="altura">Altura</label>
                            <Field className="form__field" id="altura" type="text" name="altura" />
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
                                <li className="form__list-item">
                                    <a>
                                        <i className="fa fa-pencil icon-small"></i>
                                    </a>
                                    <p>011 4295 9090</p>
                                </li>
                                <li className="form__list-item">
                                    <a>
                                        <i className="fa fa-pencil icon-small"></i>
                                    </a>
                                    <p>011 4866 0116</p>
                                </li>
                            </ul>
                            <button type="button" className="btn-link"><i className="fa fa-plus-circle icon-small"></i>agregar telefono</button>
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
                                <li className="form__list-item">
                                    <a>
                                        <i className="fa fa-pencil icon-small"></i>
                                    </a>
                                    <p>Maximiliano Bisurgi</p>
                                </li>
                                <li className="form__list-item">
                                    <a>
                                        <i className="fa fa-pencil icon-small"></i>
                                    </a>
                                    <p>Jorge Perez</p>
                                </li>
                            </ul>
                            <button type="button" className="btn-link"><i className="fa fa-plus-circle icon-small"></i>agregar persona de interes</button>
                        </div>
                    </div>
                    <div className="row">
                        <div className="form-group col-1-of-4">
                            <label className="form__label" htmlFor="email">Email</label>
                            <Field className="form__field" id="email" type="email" name="email" />
                        </div>
                    </div>
                    <div className="row">
                        <div className="form-group col-1-of-2">
                            <label className="form__label" htmlFor="visita">Dia de Visita</label>
                            <Select id="visita" options={this.DIAS} multi={true} value={this.props.values.visita} onChange={this.visitaChanged} onBlur={this.visitaBlur} />
                        </div>
                        <div className="form-group col-1-of-2">
                            <label className="form__label" htmlFor="entrega">Dia de Entrega</label>
                            <Select id="entrega" options={this.DIAS} multi={true} value={this.props.values.entrega} onChange={this.entregaChanged} onBlur={this.entregaBlur} />
                        </div>
                    </div>
                    <div className="row">
                        <div className="form-group col-1-of-3">
                            <label className="form__label" htmlFor="canal">Canal</label>
                            <Select id="canal" options={this.state.canales} multi={false} value={this.props.values.canal} onChange={this.canalChanged} onBlur={this.canalBlur} />
                        </div>
                        <div className="form-group col-1-of-3">
                            <label className="form__label" htmlFor="subcanal">Sub Canal</label>
                            <Select id="subcanal" options={this.state.subcanales} multi={false} value={this.props.values.subcanal} onChange={this.subcanalChanged} onBlur={this.subcanalBlur} />
                        </div>
                        <div className="form-group col-1-of-3">
                            <label className="form__label" htmlFor="clasificacion">Clasificacion</label>
                            <Select id="clasificacion" options={this.CLASIFICACION} multi={false} value={this.props.values.clasificacion} onChange={this.clasificacionChanged} onBlur={this.clasificacionBlur} />
                        </div>
                    </div>
                </Form>
                <SucursalModal sucursal={this.state.sucursal} onCloseModal={this.onCloseSucursal} />
            </div>
        );
    }
}

const mapPropsToValues = ({ cliente }) => ({
    codigo: cliente ? cliente.codigo : '',
    razonSocial: cliente ? cliente.razonSocial : '',
    cuit: cliente ? cliente.cuit : '',
    nombreComercial: cliente ? cliente.nombreComercial : '',
    calle: cliente ? cliente.direccion.calle : '',
    altura: cliente ? cliente.direccion.altura : '',
    localidad: cliente ? cliente.direccion.localidad : '',
    codigoPostal: cliente ? cliente.direccion.codigoPostal : '',
    lat: cliente ? cliente.direccion.geometry.coordinates[1] : 0,
    lng: cliente ? cliente.direccion.geometry.coordinates[0] : 0,
    email: cliente ? cliente.email : '',
    canal: '',
    subcanal: '',
    clasificacion: cliente ? cliente.clasificacion : 'c',
    visita: cliente ? cliente.diaVisita : [],
    entrega: cliente ? cliente.diaEntrega : [],
});

const mapStateToProps = (state) => {
    return { canales: state.canal, subcanales: state.subcanal }
};

export default withFormik({
    mapPropsToValues
})(connect(mapStateToProps, { getCanales, getSubcanales })(ClienteForm));

