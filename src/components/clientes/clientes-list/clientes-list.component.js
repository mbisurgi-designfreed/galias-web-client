import React, { Component } from 'react';
import { connect } from 'react-redux';
import _ from 'lodash';

import { list } from '../../../actions/cliente.action';

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

    renderPaginator() {

    }

    render() {
        return (
            <div className="mt-3">
                {this.renderItems()}
            </div>
        );
    }
}

const mapStateToProps = (state) => {
    return { clientes: state.cliente.clientes };
};

export default connect(mapStateToProps, { list })(ClientesList);
