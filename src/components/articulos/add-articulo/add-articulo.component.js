import React, { Component } from 'react';

import ArticuloForm from '../articulo-form/articulo-form.component';

class AddArticulo extends Component {
    onAdd = (articulo) => {
        this.props.add(cliente, this.props.history);
    }

    render() {
        return (
            <div className="mt-3">
                <ArticuloForm accion={this.onAdd} />
            </div>
        )
    }
};

export default AddArticulo;