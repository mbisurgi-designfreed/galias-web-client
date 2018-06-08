import React, { Component } from 'react';
import { connect } from 'react-redux';

import RemitoForm from '../remito-form/remito-form.component';
import ConfirmModal from './confirm-modal.component';

import { proximo, add } from '../../../actions/remito.action';

class AddRemito extends Component {
    state = {
        remito: undefined,
        proximo: undefined
    }

    componentWillMount() {
        this.props.proximo();
    }

    onAdd = (remito, talonario) => {
        this.setState(() => ({
            remito,
            proximo: talonario.proximo
        }));
    }

    onCloseModal = (proximo, cancel) => {
        if (!cancel) {
            const remito = {
                remito: this.state.remito,
                proximo
            }
    
            this.props.add(remito, this.props.history);
        }

        this.setState(() => ({
            remito: undefined
        }));
    }

    render() {
        return (
            <div className="mt-3">
                <RemitoForm accion={this.onAdd} />
                <ConfirmModal proximo={this.state.proximo} isOpen={!!this.state.remito} onCloseModal={this.onCloseModal} />
            </div>
        )
    }
};

const mapStateToProps = (state) => {
    return { proximoNumero: state.remito.proximo };
}

export default connect(mapStateToProps, { proximo, add })(AddRemito);
