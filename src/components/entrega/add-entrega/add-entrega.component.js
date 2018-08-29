import React, { Component } from 'react';
import { connect } from 'react-redux';

import EntregaForm from '../entrega-form/entrega-form.component';

import { add } from '../../../actions/entrega.action';

class AddEntrega extends Component {
    onAdd = (entrega, talonario) => {
        this.props.add(entrega, talonario, this.props.history);
    }

    render() {
        return (
            <div className="mt-3">
                <EntregaForm accion={this.onAdd} />
            </div>
        )
    }
};

export default connect(null, { add })(AddEntrega);
