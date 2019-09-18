import React, { Component } from 'react';
import { connect } from 'react-redux';
import { withFormik, Form, Field } from 'formik';
import Loader from 'react-loader';
import Select from 'react-select';
import Yup from 'yup';
import numeral from "numeral";
import axios from 'axios';

import proveedorSelector from "../../selectors/proveedor.selector";

const API_URL = process.env.REACT_APP_API_URL;

class CompetenciaForm extends Component {
    state = {
        proveedores: [],
        clientes: [],
        articulos: [],
        articulosFiltrados: [],
        competencias: [],
        competenciasFiltrados: [],
        familias: [],
        grupos: [],
        subgrupos: []
    };

    async componentWillMount() {
        const proveedores = this.props.proveedores.map((proveedor) => {
            return {
                value: proveedor._id,
                label: proveedor.nombre
            };
        });

        const familias = this.props.familias.map((familia) => {
            return {
                value: familia._id,
                label: familia.nombre
            };
        });

        const clientes = (await this.fetchClients()).map(cliente => {
            return {
                value: cliente._id,
                label: `${cliente.codigo} | ${cliente.razonSocial}`
            }
        });

        const articulos = await this.fetchArticulos();
        const competencias = await this.fetchCompetencias();

        this.setState(() => ({ proveedores, clientes, articulos, competencias, familias }));
    };

    componentWillReceiveProps(nextProps) {

    };

    fetchClients = async () => {
        const URL = `${API_URL}/api/cliente/list?page=1`;
        const res = await axios.get(URL);
        return res.data.clientes;
    };

    fetchArticulos = async () => {
        const URL = `${API_URL}/api/articulo/list?page=1`;
        const res = await axios.get(URL);
        return res.data.articulos;
    };

    fetchCompetencias = async () => {
        const URL = `${API_URL}/api/articulo-competencia/list?page=1`;
        const res = await axios.get(URL);
        return res.data.articulos;
    };

    clienteChanged = (cliente) => {
        this.props.setFieldValue('cliente', cliente.value);
    };

    clienteBlur = () => {
        this.props.setFieldTouched('cliente', true);
    };

    familiaChanged = (familia) => {
        this.props.setFieldValue('familia', familia.value);
        this.props.setFieldValue('grupo', '');
        this.props.setFieldValue('subgrupo', '');

        if (familia) {
            const grupos = this.props.grupos.filter((grupo) => {
                return grupo.familia === familia.value;
            }).map((grupo) => {
                return {
                    value: grupo._id,
                    label: grupo.nombre
                };
            });

            this.setState(() => ({ grupos }));
        }
    };

    familiaBlur = () => {
        this.props.setFieldTouched('familia', true);
    };

    grupoChanged = (grupo) => {
        this.props.setFieldValue('grupo', grupo.value);
        this.props.setFieldValue('subgrupo', '');

        if (grupo) {
            const subgrupos = this.props.subgrupos.filter((subgrupo) => {
                return subgrupo.grupo === grupo.value;
            }).map((subgrupo) => {
                return {
                    value: subgrupo._id,
                    label: subgrupo.nombre
                };
            });

            this.setState(() => ({ subgrupos }));
        }
    };

    grupoBlur = () => {
        this.props.setFieldTouched('grupo', true);
    };

    subgrupoChanged = (subgrupo) => {
        this.props.setFieldValue('subgrupo', subgrupo.value);
        this.props.setFieldValue('articulo', '');
        this.props.setFieldValue('competencia', '');

        if (subgrupo) {
            const articulosFiltrados = this.state.articulos.filter(articulo => {
                return articulo.subgrupo === subgrupo.value;
            }).map(articulo => {
                return {
                    value: articulo._id,
                    label: `${articulo.codigo} | ${articulo.descripcion}`
                }
            });

            const competenciasFiltrados = this.state.competencias.filter(articulo => {
                return articulo.subgrupo === subgrupo.value;
            }).map(articulo => {
                return {
                    value: articulo._id,
                    label: `${articulo.codigo} | ${articulo.descripcion}`
                }
            });

            this.setState(() => ({articulosFiltrados, competenciasFiltrados}))
        }
    };

    subgrupoBlur = () => {
        this.props.setFieldTouched('subgrupo', true);
    };

    proveedorChanged = (proveedor) => {
        this.props.setFieldValue('proveedor', proveedor.value);
    };

    proveedorBlur = () => {
        this.props.setFieldTouched('proveedor', true);
    };

    articuloChanged = (articulo) => {
        this.props.setFieldValue('articulo', articulo.value);
    };

    articuloBlur = () => {
        this.props.setFieldTouched('articulo', true);
    };

    competenciaChanged = (competencia) => {
        this.props.setFieldValue('competencia', competencia.value);
    };

    competenciaBlur = () => {
        this.props.setFieldTouched('competencia', true);
    };

    onCantidad = () => {
        const cantidad = numeral(this.props.values.cantidad).format('0,0.00');
        this.props.setFieldValue('cantidad', cantidad)
    };

    onPrecio = () => {
        const precio = numeral(this.props.values.precio).format('0,0.00');
        this.props.setFieldValue('precio', precio)
    };

    onCantidadCompetencia = () => {
        const cantidadCompetencia = numeral(this.props.values.cantidadCompetencia).format('0,0.00');
        this.props.setFieldValue('cantidadCompetencia', cantidadCompetencia)
    };

    onPrecioCompetencia = () => {
        const precioCompetencia = numeral(this.props.values.precioCompetencia).format('0,0.00');
        this.props.setFieldValue('precioCompetencia', precioCompetencia)
    };

    render() {
        return (
            <div>
                <Form className="form mb-xl">
                    <div className="row">
                        <div className="form-group col-2-of-4">
                            <label className="form__label" htmlFor="cliente">Cliente</label>
                            <Select id="cliente" options={this.state.clientes} multi={false} value={this.props.values.cliente} onChange={this.clienteChanged} onBlur={this.clienteBlur} />
                            {this.props.touched.cliente && this.props.errors.cliente && (<p className="form__field-error">{this.props.errors.cliente}</p>)}
                        </div>
                    </div>
                    <div className="row">
                        <div className="form-group col-1-of-4">
                            <label className="form__label" htmlFor="grupo">Familia</label>
                            <Select id="familia" options={this.state.familias} multi={false} value={this.props.values.familia} onChange={this.familiaChanged} onBlur={this.familiaBlur} />
                            {this.props.touched.familia && this.props.errors.familia && (<p className="form__field-error">{this.props.errors.familia}</p>)}
                        </div>
                        <div className="form-group col-1-of-4">
                            <label className="form__label" htmlFor="grupo">Grupo</label>
                            <Select id="grupo" options={this.state.grupos} multi={false} value={this.props.values.grupo} onChange={this.grupoChanged} onBlur={this.grupoBlur} />
                            {this.props.touched.grupo && this.props.errors.grupo && (<p className="form__field-error">{this.props.errors.grupo}</p>)}
                        </div>
                        <div className="form-group col-1-of-4">
                            <label className="form__label" htmlFor="subgrupo">Sub Grupo</label>
                            <Select id="subgrupo" options={this.state.subgrupos} multi={false} value={this.props.values.subgrupo} onChange={this.subgrupoChanged} onBlur={this.subgrupoBlur} />
                            {this.props.touched.subgrupo && this.props.errors.subgrupo && (<p className="form__field-error">{this.props.errors.subgrupo}</p>)}
                        </div>
                    </div>
                    <div className="row">
                        <div className="form-group col-2-of-4">
                            <label className="form__label" htmlFor="articulo">Articulo</label>
                            <Select id="articulo" options={this.state.articulosFiltrados} multi={false} value={this.props.values.articulo} onChange={this.articuloChanged} onBlur={this.articuloBlur} />
                            {this.props.touched.articulo && this.props.errors.articulo && (<p className="form__field-error">{this.props.errors.articulo}</p>)}
                        </div>
                        <div className="form-group col-1-of-4">
                            <label className="form__label" htmlFor="cantidad">Cantidad</label>
                            <Field className="form__field" id="cantidad" type="text" name="cantidad" onBlur={this.onCantidad} />
                            {this.props.touched.cantidad && this.props.errors.cantidad && (<p className="form__field-error">{this.props.errors.cantidad}</p>)}
                        </div>
                        <div className="form-group col-1-of-4">
                            <label className="form__label" htmlFor="precio">Precio</label>
                            <Field className="form__field" id="precio" type="text" name="precio" onBlur={this.onPrecio} />
                            {this.props.touched.precio && this.props.errors.precio && (<p className="form__field-error">{this.props.errors.precio}</p>)}
                        </div>
                    </div>
                    <div className="row">
                        <div className="form-group col-1-of-4">
                            <label className="form__label" htmlFor="proveedor">Proveedor</label>
                            <Select id="proveedor" options={this.state.proveedores} multi={false} value={this.props.values.proveedor} onChange={this.proveedorChanged} onBlur={this.proovedorBlur} />
                            {this.props.touched.proveedor && this.props.errors.proveedor && (<p className="form__field-error">{this.props.errors.proveedor}</p>)}
                        </div>
                        <div className="form-group col-1-of-4">
                            <label className="form__label" htmlFor="competencia">Articulo Competencia</label>
                            <Select id="competencia" options={this.state.competenciasFiltrados} multi={false} value={this.props.values.competencia} onChange={this.competenciaChanged} onBlur={this.competenciaBlur} />
                            {this.props.touched.competencia && this.props.errors.competencia && (<p className="form__field-error">{this.props.errors.competencia}</p>)}
                        </div>
                        <div className="form-group col-1-of-4">
                            <label className="form__label" htmlFor="cantidadCompetencia">Cantidad</label>
                            <Field className="form__field" id="cantidadCompetencia" type="text" name="cantidadCompetencia" onBlur={this.onCantidadCompetencia} />
                            {this.props.touched.cantidadCompetencia && this.props.errors.cantidadCompetencia && (<p className="form__field-error">{this.props.errors.cantidadCompetencia}</p>)}
                        </div>
                        <div className="form-group col-1-of-4">
                            <label className="form__label" htmlFor="precioCompetencia">Precio</label>
                            <Field className="form__field" id="precioCompetencia" type="text" name="precioCompetencia" onBlur={this.onPrecioCompetencia} />
                            {this.props.touched.precioCompetencia && this.props.errors.precioCompetencia && (<p className="form__field-error">{this.props.errors.precioCompetencia}</p>)}
                        </div>
                    </div>
                    <div className="row">
                        <div className="form-group col-3-of-4">
                            <label className="form__label" htmlFor="observaciones">Observaciones</label>
                            <Field className="form__field" id="observaciones" type="text" name="observaciones" />
                            {this.props.touched.observaciones && this.props.errors.observaciones && (<p className="form__field-error">{this.props.errors.observaciones}</p>)}
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

const mapPropsToValues = ({ competencia }) => {
    return {
        cliente: competencia ? competencia.cliente : '',
        familia: competencia ? competencia.familia : '',
        grupo: competencia ? competencia.grupo : '',
        subgrupo: competencia ? competencia.subgrupo : '',
        articulo: competencia ? competencia.articulo : '',
        cantidad: competencia ? competencia.cantidad : 0,
        precio: competencia ? competencia.precio: 0,
        competencia: competencia ? competencia.competencia : '',
        cantidadCompetencia: competencia ? competencia.cantidadCompetencia : 0,
        precioCompetencia: competencia ? competencia.precioCompetencia: 0,
        observaciones: competencia ? competencia.observaciones : ''
    }
};

const validationSchema = () => Yup.object().shape({
    cliente: Yup
        .string()
        .nullable()
        .required('Cliente es requerido'),
    familia: Yup
        .string()
        .nullable()
        .required('Familia es requerido'),
    grupo: Yup
        .string()
        .nullable()
        .required('Grupo es requerido'),
    subgrupo: Yup
        .string()
        .nullable()
        .required('Subgrupo es requerido'),
    articulo: Yup
        .string()
        .nullable()
        .required('Articulo es requerido'),
    cantidad: Yup
        .string()
        .required('Cantidad es requerido'),
    precio: Yup
        .string()
        .required('Precio es requerido'),
    competencia: Yup
        .string()
        .nullable()
        .required('Competencia es requerido'),
    cantidadCompetencia: Yup
        .string()
        .required('Cantidad es requerido'),
    precioCompetencia: Yup
        .string()
        .required('Precio es requerido'),
    proveedor: Yup
        .string()
        .nullable()
        .required('Proveedor es requerido'),
});

const onSubmit = (values, { props, resetForm }) => {
    const { cantidad, precio, cantidadCompetencia, precioCompetencia, observaciones } = values;

    const competencia = {
        cliente: values.cliente,
        familia: values.familia,
        grupo: values.grupo,
        subgrupo: values.subgrupo,
        articulo: values.articulo,
        cantidad: numeral(cantidad).value(),
        precio: numeral(precio).value(),
        articuloCompetencia: values.competencia,
        cantidadCompetencia: numeral(cantidadCompetencia).value(),
        precioCompetencia: numeral(precioCompetencia).value(),
        proveedor: values.proveedor,
        observaciones
    };

    props.accion(competencia);
};

const mapStateToProps = (state) => {
    return { proveedores: proveedorSelector(state.proveedor.proveedores), familias: state.familia, grupos: state.grupo, subgrupos: state.subgrupo }
};

export default connect(mapStateToProps)(withFormik({
    mapPropsToValues,
    validationSchema,
    handleSubmit: onSubmit
})(CompetenciaForm));
