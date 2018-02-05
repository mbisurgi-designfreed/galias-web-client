import React, { Component } from 'react';

import ClienteForm from '../cliente-form/cliente-form.component';

class AddCliente extends Component {
    render() {
        return (
            <div className="mt-3">
                <ClienteForm />
            </div>
        )
    }
};

export default AddCliente;
