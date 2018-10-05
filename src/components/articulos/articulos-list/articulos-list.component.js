import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import Loader from 'react-loader'
import Pagination from "react-js-pagination";
import _ from 'lodash';
import axios from 'axios';
import * as FileSaver from 'file-saver';
import * as XLSX from 'xlsx';

import { list } from '../../../actions/articulo.action';
import { setTextFilter, searchByDescripcion, searchByCodigo } from '../../../actions/articulo-filters.action';
import { removeAlert } from '../../../actions/alert.action';

import Filters from '../../filters/filters.component';
import ArticuloListItem from './articulo-list-item/articulo-list-item.component';

import articuloSelector from '../../../selectors/articulo.selector';

class ArticulosList extends Component {
    state = {
        page: 1
    }

    componentWillMount() {
        this.props.list(1);
    }

    VIEW_PER_PAGE = 10;

    options = [{
        value: 'descripcion',
        label: 'Descripcion'
    }, {
        value: 'codigo',
        label: 'Codigo'
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
            case 'descripcion':
                return this.props.searchByDescripcion();
            case 'codigo':
                return this.props.searchByCodigo();
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
        const articulos = _.slice(this.props.articulos, start, end)
 
        return _.map(articulos, (articulo) => {
            return <ArticuloListItem articulo={articulo} key={articulo._id} />;
        });
    }

    onPageClicked = (page) => {
        this.setState(() => ({ page }))
    }

    onExportar = (e) => {
        e.preventDefault();

        const API_URL = process.env.REACT_APP_API_URL;
        const URL = `${API_URL}/api/articulo/excel`;
        const exportados = [];
        
        axios.get(URL).then((res) => {
            res.data.forEach((articulo) => {
                exportados.push({
                    Codigo: articulo.codigo,
                    Descripcion: articulo.descripcion,                    
                    Kilos: articulo.kilos,
                    Proveedor: articulo.proveedor.toUpperCase(),
                    Familia: articulo.familia.nombre.toUpperCase(),
                    Grupo: articulo.grupo.nombre.toUpperCase(),
                    Subgrupo: articulo.subgrupo.nombre.toUpperCase(),
                    UnidadCpa: articulo.unidadesCpa[0].unidad.sigla.toUpperCase(),
                    Equivalencia: articulo.unidadesCpa[0].equivalencia,
                    UnidadVta: articulo.unidadesVta[0].unidad.sigla.toUpperCase(),
                });
            });
        
            this.exportAsExcelFile(exportados, 'Articulos');
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
        return (
            <div className="row">
                <div className="alert-container">
                    {this.showAlert()}
                </div>
                <div className="row">
                    <Filters filterValue={this.props.filters.searchBy} textValue={this.props.filters.text} options={this.options} onFilterChange={this.onFilterChanged} onTextChange={this.onTextChanged}>
                        <div className="form__icon-container">
                            <Link className="icon-medium" to="/articulos/new"><i className="fas fa-plus-circle"></i></Link>
                            <Link className="icon-medium" to="/articulos/precios"><i className="fas fa-dollar-sign"></i></Link>
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
                    <Pagination innerClass="pagination" itemClass="page-item" linkClass="page-link" activePage={this.state.page} itemsCountPerPage={this.VIEW_PER_PAGE} totalItemsCount={this.props.articulos.length} onChange={this.onPageClicked} />
                </div>
            </div>
        );
    }
}

const mapStateToProps = (state) => {
    return { articulos: articuloSelector(state.articulo.articulos, state.articuloFilters), pages: state.articulo.pages, loading: state.articulo.loading, filters: state.articuloFilters, alert: state.alerts };
};

export default connect(mapStateToProps, { list, setTextFilter, searchByDescripcion, searchByCodigo, removeAlert })(ArticulosList);
