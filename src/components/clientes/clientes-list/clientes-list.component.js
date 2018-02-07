import React, { Component } from 'react';
import { connect } from 'react-redux';
import Loader from 'react-loader'
import _ from 'lodash';

import { list } from '../../../actions/cliente.action';
import { setTextFilter, searchByRazonSocial, searchByCodigo, searchByCuit } from '../../../actions/cliente-filters.action';

import Paginator from '../../paginator/paginator.component';
import Filters from '../../filters/filters.component';
import ClienteListItem from './cliente-list-item/cliente-list-item.component';

import clienteSelector from '../../../selectors/cliente.selector';

class ClientesList extends Component {
    componentWillMount() {
        this.props.list(1);
    }

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
        this.props.setTextFilter(e.target.value);
    };

    renderItems() {
        return _.map(this.props.clientes, (cliente) => {
            return <ClienteListItem cliente={cliente} key={cliente._id} />;
        });
    }

    onPageClicked(page) {
        this.props.list(page);
    }

    render() {
        return (
            // <div style={{ display: 'flex', flexDirection: 'column', height: '90vh' }}>

            //     <div className="mt-3" style={{ overflowY: 'scroll', flex: 9 }}>
            //         <Loader className="spinner" loaded={!this.props.loading}>
            //             {this.renderItems()}
            //         </Loader>
            //     </div>

            //     <div className="mt-3" style={{ flex: 1 }}>
            //         <Paginator pages={this.props.pages} onPageClicked={this.onPageClicked.bind(this)} />
            //     </div>
            // </div>
            <div className="row">
                <div className="row">
                    <Filters filterValue={this.props.filters.searchBy} textValue={this.props.filters.text} options={this.options} onFilterChange={this.onFilterChanged} onTextChange={this.onTextChanged} />
                </div>
                <div className="row">
                    {this.renderItems()}
                </div>
                <div className="row">

                </div>
            </div>
        );
    }
}

const mapStateToProps = (state) => {
    return { clientes: clienteSelector(state.cliente.clientes, state.clienteFilters), pages: state.cliente.pages, loading: state.cliente.loading, filters: state.clienteFilters };
};

export default connect(mapStateToProps, { list, setTextFilter, searchByRazonSocial, searchByCodigo, searchByCuit })(ClientesList);
