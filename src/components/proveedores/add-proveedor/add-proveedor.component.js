import React, { Component } from 'react';
import { connect } from 'react-redux';

import ProveedorForm from "../proveedor-form/proveedor-form.component";

import { add } from '../../../actions/proveedor.action';

class AddProveedor extends Component {
    onAdd = (proveedor) => {
        this.props.add(proveedor, this.props.history);
    };

    render() {
        return (
            <div className="mt-3">
                <ProveedorForm accion={this.onAdd} />
            </div>
        )
    }
}

export default connect(null, { add })(AddProveedor);