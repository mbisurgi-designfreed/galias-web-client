import React, { Component } from 'react';
import { connect } from 'react-redux';

import RemitoForm from '../remito-form/remito-form.component';
import ConfirmModal from './confirm-modal.component';

import { proximo, add } from '../../../actions/remito.action';
import { list } from '../../../actions/articulo.action';

class AddRemito extends Component {
    state = {
        remito: undefined,
        pedido: undefined,
        pv: undefined,
        proximo: undefined,
    }

    componentWillMount() {
        this.props.proximo();
        this.props.list();
    }

    onAdd = (remito, talonario, pedido) => {
        console.log(pedido);
        this.setState(() => ({
            remito,
            pedido,
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
                <ConfirmModal pedido={this.state.pedido} proximo={this.state.proximo} remito={this.state.remito} pv={this.state.pv} numero={this.state.proximo} isOpen={!!this.state.remito} onCloseModal={this.onCloseModal} />
            </div>
        )
    }
};

const mapStateToProps = (state) => {
    return { proximoNumero: state.remito.proximo };
}

export default connect(mapStateToProps, { proximo, add, list })(AddRemito);
