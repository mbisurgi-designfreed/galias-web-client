import React, { Component } from 'react';
import { connect } from 'react-redux';

import ClienteForm from '../cliente-form/cliente-form.component';

class EditCliente extends Component {
    render() {
        return (
            <div className="mt-3">
                <ClienteForm cliente={this.props.cliente}/>
            </div>
        )
    }
}

const mapStateToProps = (state, ownProps) => {
    const cliente = state.cliente.clientes[ownProps.match.params.id];

    return { cliente }
}

export default connect(mapStateToProps)(EditCliente);