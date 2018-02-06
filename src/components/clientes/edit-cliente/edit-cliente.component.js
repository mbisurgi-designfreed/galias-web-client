import React, { Component } from 'react';
import { connect } from 'react-redux';

import ClienteForm from '../cliente-form/cliente-form.component';

import { edit } from '../../../actions/cliente.action';

class EditCliente extends Component {
    onEdit = (cliente) => {
        this.props.edit(cliente, this.props.cliente._id, this.props.history);
    }

    render() {
        return (
            <div className="mt-3">
                <ClienteForm cliente={this.props.cliente} accion={this.onEdit} />
            </div>
        )
    }
}

const mapStateToProps = (state, ownProps) => {
    const cliente = state.cliente.clientes[ownProps.match.params.id];

    return { cliente }
}

export default connect(mapStateToProps, { edit })(EditCliente);