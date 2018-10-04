import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import Loader from 'react-loader'
import Pagination from 'react-js-pagination';
import _ from 'lodash';
import axios from 'axios';
import * as FileSaver from 'file-saver';
import * as XLSX from 'xlsx';

import { list } from '../../../actions/cliente.action';
import { setTextFilter, searchByRazonSocial, searchByCodigo, searchByCuit } from '../../../actions/cliente-filters.action';
import { removeAlert } from '../../../actions/alert.action';

import Filters from '../../filters/filters.component';
import ClienteListItem from './cliente-list-item/cliente-list-item.component';

import clienteSelector from '../../../selectors/cliente.selector';

class ClientesList extends Component {
    state = {
        page: 1
    }

    componentWillMount() {
        this.props.list(1);
    }

    VIEW_PER_PAGE = 10;

    options = [{
        value: 'razonSocial',
        label: 'Razon Social'
    }, {
        value: 'codigo',
        label: 'Codigo'
    }, {
        value: 'cuit',
        label: 'Cuit'
    }];

    showAlert = () => {
        if (this.props.alert.alert) {
            setTimeout(() => {
                this.props.removeAlert();
            }, 3000)

            return <a className="alert" onClick={this.onAlertClick}>{this.props.alert.alert}</a>
        }
    }

    onAlertClick = () => {
        this.props.removeAlert();
    }

    onFilterChanged = (selectedOption) => {
        this.props.setTextFilter('');

        switch (selectedOption.value) {
            case 'razonSocial':
                return this.props.searchByRazonSocial();
            case 'codigo':
                return this.props.searchByCodigo();
            case 'cuit':
                return this.props.searchByCuit();
        }
    };

    onTextChanged = (e) => {
        this.setState(() => ({ page: 1 }))
        this.props.setTextFilter(e.target.value);
    };

    renderItems = () => {
        const SIZE = this.VIEW_PER_PAGE;

        const start = (this.state.page - 1) * SIZE;
        const end = this.state.page * SIZE;
        const clientes = _.slice(this.props.clientes, start, end)

        return _.map(clientes, (cliente) => {
            return <ClienteListItem cliente={cliente} key={cliente._id} />;
        });
    }

    onPageClicked = (page) => {
        this.setState(() => ({ page }))
    }

    onExportar = (e) => {
        e.preventDefault();

        const API_URL = process.env.REACT_APP_API_URL;
        const URL = `${API_URL}/api/cliente/excel`;
        const exportados = [];
        
        axios.get(URL).then((res) => {
            res.data.forEach((cliente) => {
                exportados.push({
                    Codigo: cliente.codigo,
                    RazonSocial: cliente.razonSocial,                    
                    Domicilio: `${cliente.direccion.calle} ${cliente.direccion.altura ? cliente.direccion.altura : ''}`,
                    Localidad: cliente.direccion.localidad,
                    Cuit: cliente.cuit,
                    Iva: cliente.iva.toUpperCase(),
                    Division: cliente.division,
                    Canal: cliente.canal ? cliente.canal.nombre.toUpperCase() : '',
                    Subcanal: cliente.subcanal ? cliente.subcanal.nombre.toUpperCase() : '',
                    Clasificacion: cliente.clasificacion.toUpperCase(),
                    Visita: cliente.diaVisita.join('-'),
                    Entrega: cliente.diaEntrega.join('-'),
                });
            });
        
            this.exportAsExcelFile(exportados, 'Clientes');
        });
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

    render() {
        console.log('clientes', this);
        return (
            <div className="row">
                <div className="alert-container">
                    {this.showAlert()}
                </div>
                <div className="row">
                    <Filters filterValue={this.props.filters.searchBy} textValue={this.props.filters.text} options={this.options} onFilterChange={this.onFilterChanged} onTextChange={this.onTextChanged}>
                        <div className="form__icon-container">
                            <Link className="icon-medium" to="/clientes/new"><i className="fa fa-plus-circle"></i></Link>
                            <button className="btn-link icon-medium" onClick={this.onExportar}><i className="fas fa-download"></i></button>
                        </div>
                    </Filters>
                </div>
                <div className="row">
                    <ul className="list">
                        <Loader className="spinner" loaded={!this.props.loading} color="#ed1c24" scale={0.5}>
                            {this.renderItems()}
                        </Loader>
                    </ul>
                </div>
                <div className="row">
                    <Pagination innerClass="pagination" itemClass="page-item" linkClass="page-link" activePage={this.state.page} itemsCountPerPage={this.VIEW_PER_PAGE} totalItemsCount={this.props.clientes.length} onChange={this.onPageClicked} />
                </div>
            </div>
        );
    }
}

const mapStateToProps = (state) => {
    return { clientes: clienteSelector(state.cliente.clientes, state.clienteFilters), pages: state.cliente.pages, loading: state.cliente.loading, filters: state.clienteFilters, alert: state.alerts };
};

export default connect(mapStateToProps, { list, setTextFilter, searchByRazonSocial, searchByCodigo, searchByCuit, removeAlert })(ClientesList);
