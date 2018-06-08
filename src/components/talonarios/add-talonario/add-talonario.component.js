import React, { Component } from 'react';
import { connect } from 'react-redux';

import TalonarioForm from '../talonario-form/talonario-form.component';

import { add } from '../../../actions/talonario.action';

class AddTalonario extends Component {
    onAdd = (talonario) => {
        this.props.add(talonario, this.props.history);
    }

    render() {
        return (
            <div className="mt-3">
                <TalonarioForm accion={this.onAdd} />
            </div>
        )
    }
};

export default connect(null, { add })(AddTalonario);
