import React, { Component } from 'react';
import { connect } from 'react-redux';
import { withFormik, Form, Field } from 'formik';
import Loader from 'react-loader';
import Select from 'react-select';
import Yup from 'yup';
import _ from 'lodash';

import UnidadCompraModal from './unidad-compra-form/unidad-compra-modal.component';
import UnidadVentaModal from './unidad-venta-form/unidad-venta-modal.component';

import { removeAlert } from '../../../actions/alert.action';

class ArticuloForm extends Component {
    state = {
        unidades: [],
        familias: [],
        grupos: [],
        subgrupos: [],
        unidadCpa: { item: undefined },
        unidadVta: { item: undefined }
    }

    componentWillMount() {
        const unidades = this.props.unidades.map(unidad => ({
            value: unidad._id,
            label: unidad.nombre
        }));

        const familias = this.props.familias.map((familia) => {
            return {
                value: familia._id,
                label: familia.nombre
            };
        });

        const grupos = this.props.grupos.map((grupo) => {
            return {
                value: grupo._id,
                label: grupo.nombre
            };
        });

        if (this.props.articulo) {
            const grupos = this.props.grupos.filter((grupo) => {
                return grupo.familia === this.props.articulo.familia;
            }).map((grupo) => {
                return {
                    value: grupo._id,
                    label: grupo.nombre
                };
            });


            const subgrupos = this.props.subgrupos.filter((subgrupo) => {
                return subgrupo.grupo === this.props.articulo.grupo;
            }).map((subgrupo) => {
                return {
                    value: subgrupo._id,
                    label: subgrupo.nombre
                };
            });

            this.setState(() => ({ grupos, subgrupos }));
        }

        this.setState(() => ({ unidades, familias }));
    };

    componentWillReceiveProps(nextProps) {
        if(!nextProps.loading) {
            const unidades = nextProps.unidades.map(unidad => ({
                value: unidad._id,
                label: unidad.nombre
            }));
    
            this.setState(() => ({ unidades }));
        }
    };

    PROVEEDOR = [{
        value: 'calsa',
        label: 'Calsa'
    }, {
        value: 'no calsa',
        label: 'No calsa'
    }];

    IVA = [{
        value: 10.5,
        label: '10.5%'
    }, {
        value: 21,
        label: '21%'
    }, {
        value: 27,
        label: '27%'
    }];

    LOTE = [{
        value: true,
        label: 'Si'
    }, {
        value: false,
        label: 'No'
    }];

    showAlert = () => {
        if (this.props.alert.alert) {
            setTimeout(() => {
                this.props.removeAlert();
            }, 3000)

            return <a className="alert" onClick={this.onAlertClick}>{this.props.alert.alert}</a>
        }
    }

    formatUnidades = (unidad) => {
        if (unidad) {
            return unidad.substring(0, 3).toUpperCase();
        }
    }

    proveedorChanged = (proveedor) => {
        this.props.setFieldValue('proveedor', proveedor);
    }

    proveedorBlur = () => {
        this.props.setFieldTouched('proveedor', true);
    }

    unidadStockChanged = (unidadStock) => {
        this.props.setFieldValue('unidadStock', unidadStock);
    }

    unidadStockBlur = () => {
        this.props.setFieldTouched('unidadStock', true);
    }

    ivaChanged = (iva) => {
        this.props.setFieldValue('iva', iva);
    }

    ivaBlur = () => {
        this.props.setFieldTouched('iva', true);
    }

    loteChanged = (lote) => {
        this.props.setFieldValue('lote', lote);
    }

    loteBlur = () => {
        this.props.setFieldTouched('lote', true);
    }

    familiaChanged = (familia) => {
        this.props.setFieldValue('familia', familia);
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
    }

    familiaBlur = () => {
        this.props.setFieldTouched('familia', true);
    }

    grupoChanged = (grupo) => {
        this.props.setFieldValue('grupo', grupo);
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
    }

    grupoBlur = () => {
        this.props.setFieldTouched('grupo', true);
    }

    subgrupoChanged = (subgrupo) => {
        this.props.setFieldValue('subgrupo', subgrupo);
    }

    subgrupoBlur = () => {
        this.props.setFieldTouched('subgrupo', true);
    }

    onAgregarUnidadCpa = () => {
        this.setState(() => ({ unidadCpa: { item: null } }));
    }

    onEditarUnidadCpa = (i) => {
        this.setState(() => ({ unidadCpa: { item: this.props.values.unidadesCpa[i], index: i } }));
    }

    onEliminarUnidadCpa = (i) => {
        const unidad = this.props.values.unidadesCpa[i];

        const unidadesCpa = _.filter(this.props.values.unidadesCpa, (uni) => {
            return uni._id !== unidad._id;
        });

        this.props.setFieldValue('unidadesCpa', unidadesCpa);
    }

    onCloseUnidadCpa = ({ unidadCpa, index }) => {
        if (unidadCpa && index == null) {
            const unidadesCpa = this.props.values.unidadesCpa;
            unidadesCpa.push(unidadCpa);

            this.props.setFieldValue('unidadesCpa', unidadesCpa);
        } else if (unidadCpa && index !== null) {
            const unidadesCpa = this.props.values.unidadesCpa;
            unidadesCpa[index] = unidadCpa;

            this.props.setFieldValue('unidadesCpa', unidadesCpa);
        }

        this.setState(() => ({ unidadCpa: { item: undefined } }));
    }

    renderUnidadesCpa = () => {
        if (!this.props.loading) {
            return this.props.values.unidadesCpa.map((unidadCpa, i) => {
                return (
                    <li className="form__list-item" key={i}>
                        <a onClick={() => this.onEditarUnidadCpa(i)}>
                            <i className="fa fa-pencil icon-small"></i>
                        </a>
                        <a onClick={() => this.onEliminarUnidadCpa(i)}>
                            <i className="fa fa-ban icon-small"></i>
                        </a>
                        <p className="form__list-item--title">{`${this.formatUnidades(unidadCpa.unidad.label)}`}</p>
                        <p className="form__list-item--detail">{`${unidadCpa.equivalencia}`}</p>
                    </li>
                )
            });
        } 
    };

    onAgregarUnidadVta = () => {
        this.setState(() => ({ unidadVta: { item: null } }));
    }

    onEditarUnidadVta = (i) => {
        this.setState(() => ({ unidadVta: { item: this.props.values.unidadesVta[i], index: i } }));
    }

    onEliminarUnidadVta = (i) => {
        const unidad = this.props.values.unidadesVta[i];

        const unidadesVta = _.filter(this.props.values.unidadesVta, (uni) => {
            return uni._id !== unidad._id;
        });

        this.props.setFieldValue('unidadesVta', unidadesVta);
    }

    onCloseUnidadVta = ({ unidadVta, index }) => {
        if (unidadVta && index == null) {
            const unidadesVta = this.props.values.unidadesVta;
            unidadesVta.push(unidadVta);

            this.props.setFieldValue('unidadesVta', unidadesVta);
        } else if (unidadVta && index !== null) {
            const unidadesVta = this.props.values.unidadesVta;
            unidadesVta[index] = unidadVta;

            this.props.setFieldValue('unidadesVta', unidadesVta);
        }

        this.setState(() => ({ unidadVta: { item: undefined } }));
    }

    renderUnidadesVta = () => {
        if (!this.props.loading) {
            return this.props.values.unidadesVta.map((unidadVta, i) => {
                return (
                    <li className="form__list-item" key={i}>
                        <a onClick={() => this.onEditarUnidadVta(i)}>
                            <i className="fa fa-pencil icon-small"></i>
                        </a>
                        <a onClick={() => this.onEliminarUnidadVta(i)}>
                            <i className="fa fa-ban icon-small"></i>
                        </a>
                        <p className="form__list-item--title">{`${this.formatUnidades(unidadVta.unidad.label)}`}</p>
                        <p className="form__list-item--detail">{`${unidadVta.equivalencia}`}</p>
                    </li>
                )
            });
        } 
    };

    render() {
        return (
            <div>
                <Form className="form mb-xl">
                    <div className="row">
                        <div className="form-group col-1-of-4">
                            <label className="form__label" htmlFor="codigo">Codigo</label>
                            <Field className="form__field" id="codigo" type="text" name="codigo" />
                            {this.props.touched.codigo && this.props.errors.codigo && (<p className="form__field-error">{this.props.errors.codigo}</p>)}
                        </div>
                        <div className="form-group col-2-of-4">
                            <label className="form__label" htmlFor="descripcion">Descripcion</label>
                            <Field className="form__field" id="descripcion" type="text" name="descripcion" />
                            {this.props.touched.descripcion && this.props.errors.descripcion && (<p className="form__field-error">{this.props.errors.descripcion}</p>)}
                        </div>
                        <div className="form-group col-1-of-4">
                            <label className="form__label" htmlFor="proveedor">Proveedor</label>
                            <Select id="proveedor" options={this.PROVEEDOR} multi={false} value={this.props.values.proveedor} onChange={this.proveedorChanged} onBlur={this.proveedorBlur} />
                            {this.props.touched.proveedor && this.props.errors.proveedor && (<p className="form__field-error">{this.props.errors.proveedor}</p>)}
                        </div>
                    </div>
                    <div className="row">
                        <div className="form-group col-1-of-4">
                            <label className="form__label" htmlFor="kilos">Kilos</label>
                            <Field className="form__field" id="kilos" type="number" name="kilos" />
                            {this.props.touched.kilos && this.props.errors.kilos && (<p className="form__field-error">{this.props.errors.kilos}</p>)}
                        </div>
                        <div className="form-group col-1-of-4">
                            <label className="form__label" htmlFor="unidadStock">Unidad de Stock</label>
                            <Select id="unidadStock" options={this.state.unidades} multi={false} value={this.props.values.unidadStock} onChange={this.unidadStockChanged} onBlur={this.unidadStockBlur} />
                            {this.props.touched.unidadStock && this.props.errors.unidadStock && (<p className="form__field-error">{this.props.errors.unidadStock}</p>)}
                        </div>
                        <div className="form-group col-1-of-4">
                            <label className="form__label">Unidad de Compra</label>
                            <ul className="form__list">
                                {this.renderUnidadesCpa()}
                            </ul>
                            {this.props.touched.unidadesCpa && this.props.errors.unidadesCpa && (<p className="form__field-error">{this.props.errors.unidadesCpa}</p>)}
                            <button type="button" className="btn-link" onClick={this.onAgregarUnidadCpa}><i className="fa fa-plus-circle icon-small"></i>agregar unidad de compra</button>
                        </div>
                        <div className="form-group col-1-of-4">
                            <label className="form__label">Unidad de Venta</label>
                            <ul className="form__list">
                                {this.renderUnidadesVta()}
                            </ul>
                            {this.props.touched.unidadesVta && this.props.errors.unidadesVta && (<p className="form__field-error">{this.props.errors.unidadesVta}</p>)}
                            <button type="button" className="btn-link" onClick={this.onAgregarUnidadVta}><i className="fa fa-plus-circle icon-small"></i>agregar unidad de venta</button>
                        </div>
                    </div>
                    <div className="row">
                        <div className="form-group col-1-of-4">
                            <label className="form__label" htmlFor="precioCpa">Precio de Compra</label>
                            <Field className="form__field" id="precioCpa" type="number" name="precioCpa" />
                            {this.props.touched.precioCpa && this.props.errors.precioCpa && (<p className="form__field-error">{this.props.errors.precioCpa}</p>)}
                        </div>
                        <div className="form-group col-1-of-4">
                            <label className="form__label" htmlFor="precioVta">Precio de Venta</label>
                            <Field className="form__field" id="precioVta" type="number" name="precioVta" />
                            {this.props.touched.precioVta && this.props.errors.precioVta && (<p className="form__field-error">{this.props.errors.precioVta}</p>)}
                        </div>
                        <div className="form-group col-1-of-4">
                            <label className="form__label" htmlFor="iva">Alicuota de Iva</label>
                            <Select id="iva" options={this.IVA} multi={false} value={this.props.values.iva} onChange={this.ivaChanged} onBlur={this.ivaBlur} />
                            {this.props.touched.iva && this.props.errors.iva && (<p className="form__field-error">{this.props.errors.iva}</p>)}
                        </div>
                        <div className="form-group col-1-of-4">
                            <label className="form__label" htmlFor="lote">Lote</label>
                            <Select id="lote" options={this.LOTE} multi={false} value={this.props.values.lote} onChange={this.loteChanged} onBlur={this.loteBlur} />
                            {this.props.touched.lote && this.props.errors.lote && (<p className="form__field-error">{this.props.errors.lote}</p>)}
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
                        <Loader className="spinner mt-medium" loaded={!this.props.loading} color="#ed1c24" scale={0.5}>
                            <button className="btn" disabled={this.props.loading}>{this.props.articulo ? 'Editar' : 'Agregar'}</button>
                        </Loader>
                    </div>
                </Form>
                <UnidadCompraModal unidadCpa={this.state.unidadCpa} unidades={this.state.unidades} onCloseModal={this.onCloseUnidadCpa} />
                <UnidadVentaModal unidadVta={this.state.unidadVta} unidades={this.state.unidades} onCloseModal={this.onCloseUnidadVta} />
            </div>
        );
    }
}

const mapPropsToValues = ({ articulo, unidades }) => {
    let unidadesCpa = [];
    let unidadesVta = [];

    if (articulo) {
        const uni = unidades.map(unidad => ({
            value: unidad._id,
            label: unidad.nombre
        }));

        unidadesCpa = articulo.unidadesCpa.map((unidadCpa) => {
            const unidad = uni.filter((unidad) => {
                return unidad.value === unidadCpa.unidad
            })[0];

            unidadCpa.unidad = unidad;

            return unidadCpa;
        });

        unidadesVta = articulo.unidadesVta.map((unidadVta) => {
            const unidad = uni.filter((unidad) => {
                return unidad.value === unidadVta.unidad
            })[0];

            unidadVta.unidad = unidad;

            return unidadVta;
        });
    }

    return {
        codigo: articulo ? articulo.codigo : '',
        descripcion: articulo ? articulo.descripcion : '',
        proveedor: articulo ? articulo.proveedor : '',
        kilos: articulo ? articulo.kilos : 0,
        unidadStock: articulo ? articulo.unidadStock : '',
        unidadesCpa,
        unidadesVta,
        precioCpa: articulo ? articulo.precioCpa : 0,
        precioVta: articulo ? articulo.precioVta : 0,
        iva: articulo ? articulo.iva : 21,
        lote: articulo ? articulo.lote : true,
        familia: articulo ? articulo.familia : '',
        grupo: articulo ? articulo.grupo : '',
        subgrupo: articulo ? articulo.subgrupo : ''
    }
};

const validationSchema = () => Yup.object().shape({
    codigo: Yup
        .string()
        .required('Codigo es requerido'),
    descripcion: Yup
        .string()
        .required('Descripcion es requerido'),
    proveedor: Yup
        .string()
        .nullable()
        .required('Proveedor es requerido'),
    kilos: Yup
        .number()
        .moreThan(0, 'Kilos debe ser mayor que 0')
        .required('Kilos es requerido'),
    unidadStock: Yup
        .string()
        .nullable()
        .required('Unidad de stock es requerido'),
    unidadesCpa: Yup
        .array()
        .min(1, 'Debe ingresar al menos 1 unidad de compra')
        .required('Unidades de compra es requerido'),
    unidadesVta: Yup
        .array()
        .min(1, 'Debe ingresar al menos 1 unidad de venta')
        .required('Unidades de vebta es requerido'),
    precioCpa: Yup
        .number()
        .moreThan(0, 'Precio de compra debe ser mayor que 0')
        .required('Precio de compra es requerido'),
    precioVta: Yup
        .number()
        .moreThan(0, 'Precio de venta debe ser mayor que 0')
        .required('Precio de venta es requerido'),
    iva: Yup
        .string()
        .nullable()
        .required('Alicuota de IVA es requerido'),
    lote: Yup
        .string()
        .nullable()
        .required('Lote es requerido'),
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
        .required('Subgrupo es requerido')
});

const onSubmit = (values, { props, resetForm }) => {
    const { codigo, descripcion, kilos, precioCpa, precioVta } = values;

    const unidadesCpa = values.unidadesCpa.map(unidadCpa => {
        const cpa = {};
        cpa.unidad = unidadCpa.unidad.value ? unidadCpa.unidad.value : unidadCpa.unidad;
        cpa.equivalencia = unidadCpa.equivalencia;
        cpa.defecto = unidadCpa.defecto.value ? unidadCpa.defecto.value : unidadCpa.defecto;

        return cpa;
    });

    const unidadesVta = values.unidadesVta.map(unidadVta => {
        const vta = {};
        vta.unidad = unidadVta.unidad.value ? unidadVta.unidad.value : unidadVta.unidad;
        vta.equivalencia = unidadVta.equivalencia;
        vta.defecto = unidadVta.defecto.value ? unidadVta.defecto.value : unidadVta.defecto;

        return vta;
    });

    const articulo = {
        codigo,
        descripcion,
        proveedor: values.proveedor.value ? values.proveedor.value : values.proveedor,
        iva: values.iva,
        kilos,
        lote: values.lote,
        familia: values.familia.value ? values.familia.value : values.familia,
        grupo: values.grupo.value ? values.grupo.value : values.grupo,
        subgrupo: values.subgrupo.value ? values.subgrupo.value : values.subgrupo,
        unidadStock: values.unidadStock.value ? values.unidadStock.value : values.unidadStock,
        unidadesCpa,
        unidadesVta,
        precioCpa,
        precioVta
    };

    props.accion(articulo);
};

const mapStateToProps = (state) => {
    return { familias: state.familia, grupos: state.grupo, subgrupos: state.subgrupo, unidades: state.unidad, loading: state.articulo.loading, alert: state.alerts }
};

export default connect(mapStateToProps, { removeAlert })(withFormik({
    mapPropsToValues,
    validationSchema,
    handleSubmit: onSubmit
})(ArticuloForm));