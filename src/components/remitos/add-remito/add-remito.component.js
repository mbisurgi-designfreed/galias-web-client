import React, { Component } from 'react';
import { connect } from 'react-redux';

import RemitoForm from '../remito-form/remito-form.component';
import ConfirmModal from './confirm-modal.component';

import { proximo, add } from '../../../actions/remito.action';

class AddRemito extends Component {
    state = {
        remito: undefined,
        pv: undefined,
        proximo: undefined,
    }

    componentWillMount() {
        this.props.proximo();
    }

    onAdd = (remito, talonario) => {
        this.setState(() => ({
            remito,
            pv: talonario.pv,
            proximo: talonario.proximo,
        }));
    }

    onCloseModal = (proximo, cancel) => {
        if (!cancel) {
            const remito = {
                remito: { ...this.state.remito, numero: this.generarNroRemito(this.state.pv, proximo) },
                pv: this.state.pv,
                proximo
            };

            console.log(remito);
            this.props.add(remito, this.props.history);
        }

        this.setState(() => ({
            remito: undefined
        }));
    }

    generarNroRemito = (pv, numero) => {
        return `R${pv.toString().padStart(4, '0')}${numero.toString().padStart(8, '0')}`;
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
