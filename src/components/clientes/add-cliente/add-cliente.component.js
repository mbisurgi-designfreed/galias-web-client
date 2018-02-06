import React, { Component } from 'react';
import { connect } from 'react-redux';

import ClienteForm from '../cliente-form/cliente-form.component';

import { add } from '../../../actions/cliente.action';

class AddCliente extends Component {
    onAdd = (cliente) => {
        this.props.add(cliente, this.props.history);
    }

    render() {
        return (
            <div className="mt-3">
                <ClienteForm accion={this.onAdd} />
            </div>
        )
    }
};

export default connect(null, { add })(AddCliente);
