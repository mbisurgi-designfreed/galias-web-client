import React, { Component } from 'react';
import { connect } from 'react-redux';

import RemitoForm from '../remito-form/remito-form.component';

import { add } from '../../../actions/remito.action';

class AddRemito extends Component {
    onAdd = (remito) => {
        this.props.add(remito, this.props.history);
    }

    render() {
        return (
            <div className="mt-3">
                <RemitoForm accion={this.onAdd} />
            </div>
        )
    }
};

export default connect(null, { add })(AddRemito);
