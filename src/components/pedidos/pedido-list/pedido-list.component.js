import React, { Component } from 'react';
import { connect } from 'react-redux';
import { withFormik, Form, Field } from 'formik';
import { Link } from 'react-router-dom';
import Loader from 'react-loader'
import Pagination from "react-js-pagination";
import moment from 'moment';
import _ from 'lodash';
import * as FileSaver from 'file-saver';
import * as XLSX from 'xlsx';

import { list, listToday, anular } from '../../../actions/pedido.action';
import { setTextFilter, searchByCliente, searchByEstado } from '../../../actions/pedido-filters.action';
import { add, sync } from '../../../actions/remito.action';

import Filters from '../../filters/filters.component';
import PedidoListItem from './pedido-list-item/pedido-list-item.component';

import pedidoSelector from '../../../selectors/pedido.selector';

import withRefresh from '../../notification/refresh.component';
// import withNotification from '../../notification/notification.component';

class PedidoList extends Component {
    state = {
        page: 1
    }

    componentWillMount() {
        this.props.listToday();
    }

    VIEW_PER_PAGE = 10;

    options = [{
        value: 'cliente',
        label: 'Cliente'
    }, {
        value: 'estado',
        label: 'Estado'
    }];

    onFilterChanged = (selectedOption) => {
        this.props.setTextFilter('');

        switch (selectedOption.value) {
            case 'cliente':
                return this.props.searchByCliente();
            case 'estado':
                return this.props.searchByEstado();
        }
    };

    onTextChanged = (e) => {
        this.setState(() => ({ page: 1 }))
        this.props.setTextFilter(e.target.value);
    };

    onSync = () => {
        console.log(this.props.selectedPedido);
        if (this.props.selectedPedido._id) {
            const pedido = this.props.selectedPedido;

            console.log(pedido);

            const remito = {
                fecha: moment(moment(new Date()).format('YYYY-MM-DD')).valueOf(),
                pedido: pedido._id,
                cliente: pedido.cliente.codigo,
                items: _.map(pedido.items, (item) => {
                    return {
                        articulo: item.articulo.codigo,
                        cantidad: item.pendiente,
                        precio: item.precio
                    }
                })
                // kilos: _.reduce(pedido.items, (sum, item) => {
                //     const sub = item.pendiente * item.articulo.kilos;

                //     return sum + sub;
                // }, 0)        
            }

            this.props.sync(remito, this.props.history);
        }
    }

    onAnular = () => {
        console.log(this.props.selectedPedido);
        if (this.props.selectedPedido._id) {
            this.props.anular(this.props.selectedPedido._id, this.props.history);
        }
    }

    onGenerarRemito = () => {
        if (this.props.selectedPedido._id) {
            const pedido = this.props.selectedPedido;

            const remito = {
                fecha: moment(moment(new Date()).format('YYYY-MM-DD')).valueOf(),
                pedido: pedido._id,
                cliente: pedido.cliente._id,
                items: _.map(pedido.items, (item) => {
                    const ele = {
                        item: item._id,
                        articulo: item.articulo._id,
                        cantidad: item.pendiente,
                        precio: item.precio
                    };

                    return ele;
                }),
                kilos: _.reduce(pedido.items, (sum, item) => {
                    const sub = item.pendiente * item.articulo.kilos;

                    return sum + sub;
                }, 0)
            }

            this.props.add(remito, this.props.history);
        }
    }

    onExportar = () => {
        const exportados = [];
        const pedidos = _.toArray(this.props.pedidos);

        pedidos.map((pedido) => {
            return pedido.items.map((item) => {
                const id = pedido._id;
                const fecha = moment(pedido.fecha).format('DD/MM/YYYY');
                const cliente = pedido.cliente;
                const comentario = pedido.comentario;
                const extra = pedido.extra;
                const articulo = item.articulo;
                const promocion = item.promocion;
                const cantidad = item.cantidad;
                const descuento = item.descuento;
                const precio = item.precio;

                exportados.push({
                    Pedido: id,
                    Fecha: fecha,
                    CodigoCliente: cliente.codigo,
                    RazonSocial: cliente.razonSocial,
                    Comentario: comentario,
                    CodigoArticulo: articulo.codigo,
                    Descripcion: articulo.descripcion,
                    Extra: extra,
                    Promocion: promocion,
                    Cantidad: cantidad,
                    Descuento: descuento,
                    Precio: precio,
                    Total: cantidad * precio
                });
            });
        });

        this.exportAsExcelFile(exportados, 'Pedidos');
    }

    exportAsExcelFile = (json, excelFilename) => {
        const worksheet = XLSX.utils.json_to_sheet(json);
        const workbook = { Sheets: { data: worksheet }, SheetNames: ['data'] };
        const excelBuffer = XLSX.write(workbook, { bookType: 'xlsx', type: 'buffer' });
        this.saveAsExcelFile(excelBuffer, excelFilename);
    }

    saveAsExcelFile = (buffer, filename) => {
        const EXCEL_TYPE = 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet;charset=UTF-8';
        const EXCEL_EXTENSION = '.xlsx';
        const data = new Blob([buffer], { type: EXCEL_TYPE });

        FileSaver.saveAs(data, `${filename}_${new Date().getTime()}${EXCEL_EXTENSION}`);
    }

    renderSync() {
        if (this.props.selectedPedido === null || this.props.selectedPedido === { } || this.props.selectedPedido.sincronizado === true || this.props.selectedPedido.extra === true || this.props.selectedPedido.estado === 'anulado') {
            return <button disabled className={`btn-link icon-medium btn-link--disabled`} onClick={this.onSync} ><i className="fas fa-cloud-upload-alt"></i></button>
        } else {
            return <button className={`btn-link icon-medium`} onClick={this.onSync} ><i className="fas fa-cloud-upload-alt"></i></button>
        }
    }

    renderAnular() {
        if (this.props.selectedPedido === null || this.props.selectedPedido === { } || this.props.selectedPedido.estado !== 'generado') {
            return <button disabled className={`btn-link icon-medium btn-link--disabled`} onClick={this.onAnular} ><i className="fas fa-ban"></i></button>
        } else {
            return <button className={`btn-link icon-medium`} onClick={this.onAnular} ><i className="fas fa-ban"></i></button>
        }
    }

    renderBuscar() {
        const loading = this.props.loading;

        if (loading) {
            return (
                <button type="submit" className="btn btn--small" disabled ><i className="fa fa-circle-o-notch fa-spin" /> Buscando...</button>
            );
        }

        return (
            <button className="btn btn--small" >Buscar</button>
        );
    }

    renderItems() {
        return _.map(this.props.pedidos, (pedido) => {
            return <PedidoListItem pedido={pedido} key={pedido._id} />;
        });
    }

    render() {
        return (
            <div className="row">
                <div className="row">
                    <Form className="form form--inline">
                        <div className="form__group form__group--inline">
                            <label className="form__label form__label--inline" htmlFor="desde">Desde</label>
                            <Field className="form__field form__field--inline" type="date" id="desde" name="desde" />
                        </div>
                        <div className="form__group form__group--inline">
                            <label className="form__label form__label--inline" htmlFor="hasta">Hasta</label>
                            <Field className="form__field form__field--inline" type="date" id="hasta" name="hasta" />
                        </div>
                        {this.renderBuscar()}
                        <div className="form__icon-container">
                            <Link className="icon-medium" to="/pedidos/new"><i className="fas fa-plus-circle"></i></Link>
                            <button className="btn-link icon-medium" onClick={this.onExportar}><i className="fas fa-download"></i></button>
                            {this.renderSync()}
                            {this.renderAnular()}
                        </div>
                    </Form>
                </div>
                <div className="row">
                    <Filters filterValue={this.props.filters.searchBy} textValue={this.props.filters.text} options={this.options} onFilterChange={this.onFilterChanged} onTextChange={this.onTextChanged} />
                </div>
                <div className="row">
                    <ul className="list list--small">
                        <Loader className="spinner" loaded={!this.props.loading} color="#ed1c24" scale={0.5}>
                            {this.renderItems()}
                        </Loader>
                    </ul>
                </div>
                <div className="row">
                    <Pagination innerClass="pagination" itemClass="page-item" linkClass="page-link" activePage={this.state.page} itemsCountPerPage={this.VIEW_PER_PAGE} totalItemsCount={this.props.pedidos.length} onChange={this.onPageClicked} />
                </div>
            </div>
        );
    }
}

const onSubmit = (values, { props }) => {
    const { desde, hasta } = values;

    props.list(moment(desde).valueOf(), moment(hasta).valueOf());
};

const mapPropsToValues = (props) => ({
    desde: '',
    hasta: ''
});

const mapStateToProps = (state) => {
    return { pedidos: pedidoSelector(state.pedido.pedidos, state.pedidoFilters), loading: state.pedido.loading, filters: state.pedidoFilters, selectedPedido: state.selectedPedido };
}

export default connect(mapStateToProps, { list, listToday, anular, setTextFilter, searchByCliente, searchByEstado, add, sync })(withFormik({
    mapPropsToValues,
    handleSubmit: onSubmit
})(withRefresh(PedidoList)));
