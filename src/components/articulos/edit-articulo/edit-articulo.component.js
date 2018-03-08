import React, { Component } from 'react';
import { connect } from 'react-redux';

import ArticuloForm from '../articulo-form/articulo-form.component';

import { edit } from '../../../actions/articulo.action';

class EditArticulo extends Component {
    onEdit = (articulo) => {
        this.props.edit(articulo, this.props.articulo._id, this.props.history);
    }

    render() {
        return (
            <div className="mt-3">
                <ArticuloForm articulo={this.props.articulo} accion={this.onEdit} />
            </div>
        )
    }
}

const mapStateToProps = (state, ownProps) => {
    const articulo = state.articulo.articulos[ownProps.match.params.id];

    return { articulo }
}

export default connect(mapStateToProps, { edit })(EditArticulo);