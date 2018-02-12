import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import Loader from 'react-loader'
import Pagination from "react-js-pagination";
import _ from 'lodash';

import { list } from '../../../actions/articulo.action';
import { setTextFilter, searchByDescripcion, searchByCodigo } from '../../../actions/articulo-filters.action';

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

    render() {
        return (
            <div className="row">
                <div className="row">
                    <Filters filterValue={this.props.filters.searchBy} textValue={this.props.filters.text} options={this.options} onFilterChange={this.onFilterChanged} onTextChange={this.onTextChanged}>
                        <div className="form__icon-container">
                            <Link className="icon-medium" to="/articulos/new"><i className="fa fa-plus-circle"></i></Link>
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
    return { articulos: articuloSelector(state.articulo.articulos, state.articuloFilters), pages: state.articulo.pages, loading: state.articulo.loading, filters: state.articuloFilters };
};

export default connect(mapStateToProps, { list, setTextFilter, searchByDescripcion, searchByCodigo })(ArticulosList);
