import React, { Component } from 'react';
import { connect } from 'react-redux';
import Loader from 'react-loader'
import _ from 'lodash';

import { list } from '../../../actions/cliente.action';

import Paginator from '../../paginator/paginator.component';
import ClienteListItem from './cliente-list-item/cliente-list-item.component';

class ClientesList extends Component {
    componentWillMount() {
        this.props.list(1);
    }

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
            <div style={{ display: 'flex', flexDirection: 'column', height: '90vh' }}>

                <div className="mt-3" style={{ overflowY: 'scroll', flex: 9 }}>
                    <Loader className="spinner" loaded={!this.props.loading}>
                        {this.renderItems()}
                    </Loader>
                </div>

                <div className="mt-3" style={{ flex: 1 }}>
                    <Paginator pages={this.props.pages} onPageClicked={this.onPageClicked.bind(this)} />
                </div>
            </div>
        );
    }
}

const mapStateToProps = (state) => {
    return { clientes: state.cliente.clientes, pages: state.cliente.pages, loading: state.cliente.loading };
};

export default connect(mapStateToProps, { list })(ClientesList);
