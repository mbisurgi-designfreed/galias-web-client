import React, { Component } from 'react';
import { connect } from 'react-redux';

import ArticuloForm from '../articulo-form/articulo-form.component';

import { add } from '../../../actions/articulo.action';

class AddArticulo extends Component {
    onAdd = (articulo) => {
        this.props.add(articulo, this.props.history);
    }

    render() {
        return (
            <div className="mt-3">
                <ArticuloForm accion={this.onAdd} />
            </div>
        )
    }
};

export default connect(null, { add })(AddArticulo);