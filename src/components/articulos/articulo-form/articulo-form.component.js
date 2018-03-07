import React, { Component } from 'react';
import { connect } from 'react-redux';
import { withFormik, Form, Field } from 'formik';
import Loader from 'react-loader';
import Select from 'react-select';

import UnidadCompraModal from './unidad-compra-form/unidad-compra-modal.component';

class ArticuloForm extends Component {
    state = {
        unidadCpa: { item: undefined },
    }

    PROVEEDOR = [{
        value: 'calsa',
        label: 'Calsa'
    }, {
        value: 'no calsa',
        label: 'No calsa'
    }];

    UNIDADES = [{
        value: 'uni',
        label: 'Unidades'
    }, {
        value: 'kil',
        label: 'Kilos'
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

    onAgregarUnidaCpa = () => {
        this.setState(() => ({ unidadCpa: { item: null } }));
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

    render() {
        return (
            <div>
                <Form className="form mb-xl">
                    <div className="row">
                        <div className="form-group col-1-of-4">
                            <label className="form__label" htmlFor="codigo">Codigo</label>
                            <Field className="form__field" id="codigo" type="text" name="codigo" />
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
                        </div>
                        <div className="form-group col-1-of-4">
                            <label className="form__label" htmlFor="unidadStock">Unidad de Stock</label>
                            <Select id="unidadStock" options={this.UNIDADES} multi={false} value={this.props.values.unidadStock} onChange={this.unidadStockChanged} onBlur={this.unidadStockBlur} />
                            {this.props.touched.unidadStock && this.props.errors.unidadStock && (<p className="form__field-error">{this.props.errors.unidadStock}</p>)}
                        </div>
                        <div className="form-group col-1-of-4">
                            <label className="form__label">Unidad de Compra</label>
                            <ul className="form__list">
                                {/* {this.renderPersonas()} */}
                            </ul>
                            <button type="button" className="btn-link" onClick={this.onAgregarUnidaCpa}><i className="fa fa-plus-circle icon-small"></i>agregar unidad de compra</button>
                        </div>
                        <div className="form-group col-1-of-4">
                            <label className="form__label">Unidad de Venta</label>
                            <ul className="form__list">
                                {/* {this.renderPersonas()} */}
                            </ul>
                            <button type="button" className="btn-link" onClick={this.onAgregarUnidadVta}><i className="fa fa-plus-circle icon-small"></i>agregar unidad de venta</button>
                        </div>
                    </div>
                    <div className="row">
                        <div className="form-group col-1-of-4">
                            <label className="form__label" htmlFor="precioCpa">Precio de Compra</label>
                            <Field className="form__field" id="precioCpa" type="number" name="precioCpa" />
                        </div>
                        <div className="form-group col-1-of-4">
                            <label className="form__label" htmlFor="precioVta">Precio de Venta</label>
                            <Field className="form__field" id="precioVta" type="number" name="precioVta" />
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
                <UnidadCompraModal unidadCpa={this.state.unidadCpa} unidades={this.UNIDADES} onCloseModal={this.onCloseUnidadCpa} />
            </div>
        );
    }
}

const mapPropsToValues = ({ articulo }) => ({
    codigo: articulo ? articulo.codigo : '',
    descripcion: articulo ? articulo.descripcion : '',
    proveedor: articulo ? articulo.proveedor : '',
    kilos: articulo ? articulo.kilos : 0,
    unidadStock: articulo ? articulo.unidadStock : '',
    unidadesCpa: articulo ? articulo.unidadCpa : [],
    precioCpa: articulo ? articulo.precioCpa : 0,
    precioVta: articulo ? articulo.precioVta : 0,
    iva: articulo ? articulo.iva : '',
    lote: articulo ? articulo.lote : '',
});

const mapStateToProps = (state) => {
    return { loading: state.articulo.loading, alert: state.alerts }
};

export default withFormik({
    mapPropsToValues
})(connect(mapStateToProps)(ArticuloForm));