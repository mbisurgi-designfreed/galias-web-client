import React, { Component } from 'react';
import { connect } from 'react-redux';

import CompetenciaForm from "./competencia.component";

import { add } from '../../actions/competencia.action';

class AddCompetencia extends Component {
    onAdd = (competencia) => {
        this.props.add(competencia, this.props.history);
    };

    render() {
        return (
            <div className="mt-3">
                <CompetenciaForm accion={this.onAdd} />
            </div>
        )
    }
}

export default connect(null, { add })(AddCompetencia);