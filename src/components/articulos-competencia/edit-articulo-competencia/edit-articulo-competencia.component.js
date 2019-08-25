import React, { Component } from 'react';
import { connect } from 'react-redux';

import ArticuloCompetenciaForm from '../articulo-competencia-form/articulo-competencia.component';

import { edit } from '../../../actions/articuloCompetencia.action';

class EditArticuloCompetencia extends Component {
    onEdit = (articulo) => {
        this.props.edit(articulo, this.props.articulo._id, this.props.history);
    }

    render() {
        return (
            <div className="mt-3">
                <ArticuloCompetenciaForm articulo={this.props.articulo} accion={this.onEdit} />
            </div>
        )
    }
}

const mapStateToProps = (state, ownProps) => {
    const articulo = state.articuloCompetencia.articulos[ownProps.match.params.id];

    return { articulo }
}

export default connect(mapStateToProps, { edit })(EditArticuloCompetencia);