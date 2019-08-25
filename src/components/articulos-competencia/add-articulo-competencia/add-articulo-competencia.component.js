import React, { Component } from 'react';
import { connect } from 'react-redux';

import ArticuloCompetenciaForm from "../articulo-competencia-form/articulo-competencia.component";

import { add } from '../../../actions/articuloCompetencia.action';

class AddArticuloCompetencia extends Component {
    onAdd = (articulo) => {
        this.props.add(articulo, this.props.history);
    };

    render() {
        return (
            <div className="mt-3">
                <ArticuloCompetenciaForm accion={this.onAdd} />
            </div>
        )
    }
}

export default connect(null, { add })(AddArticuloCompetencia);