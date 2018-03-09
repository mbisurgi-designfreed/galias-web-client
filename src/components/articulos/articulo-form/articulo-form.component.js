import React, { Component } from 'react';
import { connect } from 'react-redux';
import { withFormik, Form, Field } from 'formik';
import Loader from 'react-loader';
import Select from 'react-select';
import Yup from 'yup';

import UnidadCompraModal from './unidad-compra-form/unidad-compra-modal.component';
import UnidadVentaModal from './unidad-venta-form/unidad-venta-modal.component';

class ArticuloForm extends Component {
    state = {
        unidades: [],
        unidadCpa: { item: undefined },
        unidadVta: { item: undefined }
    }

    componentWillMount() {
        const unidades = this.props.unidades.map(unidad => ({
            value: unidad._id,
            label: unidad.nombre
        }));

        this.setState(() => ({ unidades }));
    };

    componentWillReceiveProps(newProps) {
        const unidades = newProps.unidades.map(unidad => ({
            value: unidad._id,
            label: unidad.nombre
        }));

        this.setState(() => ({ unidades }));
    }

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

    formatUnidades = (unidad) => {
        return unidad.substring(0, 3).toUpperCase();
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

    onAgregarUnidadCpa = () => {
        this.setState(() => ({ unidadCpa: { item: null } }));
    }

    onEditarUnidadCpa = (i) => {
        this.setState(() => ({ unidadCpa: { item: this.props.values.unidadesCpa[i], index: i } }));
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
        return this.props.values.unidadesCpa.map((unidadCpa, i) => {
            return (
                <li className="form__list-item" key={i}>
                    <a onClick={() => this.onEditarUnidadCpa(i)}>
                        <i className="fa fa-pencil icon-small"></i>
                    </a>
                    <p className="form__list-item--title">{`${this.formatUnidades(unidadCpa.unidad.label)}`}</p>
                    <p className="form__list-item--detail">{`${unidadCpa.equivalencia}`}</p>
                </li>
            )
        });
    };

    onAgregarUnidadVta = () => {
        this.setState(() => ({ unidadVta: { item: null } }));
    }

    onEditarUnidadVta = (i) => {
        this.setState(() => ({ unidadVta: { item: this.props.values.unidadesVta[i], index: i } }));
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
        return this.props.values.unidadesVta.map((unidadVta, i) => {
            return (
                <li className="form__list-item" key={i}>
                    <a onClick={() => this.onEditarUnidadVta(i)}>
                        <i className="fa fa-pencil icon-small"></i>
                    </a>
                    <p className="form__list-item--title">{`${this.formatUnidades(unidadVta.unidad.label)}`}</p>
                    <p className="form__list-item--detail">{`${unidadVta.equivalencia}`}</p>
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

            console.log(unidad);

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
});

const onSubmit = (values, { props, resetForm }) => {
    const { codigo, descripcion, kilos, precioCpa, precioVta } = values;

    const unidadesCpa = values.unidadesCpa.map(unidadCpa => {
        unidadCpa.unidad = unidadCpa.unidad.value;
        unidadCpa.defecto = unidadCpa.defecto.value;

        return unidadCpa;
    });

    const unidadesVta = values.unidadesVta.map(unidadVta => {
        unidadVta.unidad = unidadVta.unidad.value;
        unidadVta.defecto = unidadVta.defecto.value;

        return unidadVta;
    });

    const articulo = {
        codigo,
        descripcion,
        proveedor: values.proveedor.value,
        iva: values.iva,
        kilos,
        lote: values.lote,
        unidadStock: values.unidadStock.value,
        unidadesCpa,
        unidadesVta,
        precioCpa,
        precioVta
    };

    props.accion(articulo);
};

const mapStateToProps = (state) => {
    return { unidades: state.unidad, loading: state.articulo.loading, alert: state.alerts }
};

export default connect(mapStateToProps)(withFormik({
    mapPropsToValues,
    validationSchema,
    handleSubmit: onSubmit
})(ArticuloForm));