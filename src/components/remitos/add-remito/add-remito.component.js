import React, { Component } from 'react';
import { connect } from 'react-redux';

import RemitoForm from '../remito-form/remito-form.component';
import ConfirmModal from './confirm-modal.component';

import { proximo, add } from '../../../actions/remito.action';

class AddRemito extends Component {
    state = {
        remito: undefined
    }

    componentWillMount() {
        this.props.proximo();
    }

    onAdd = (remito) => {
        //this.props.add(remito, this.props.history);
        this.setState(() => ({
            remito
        }));
    }

    onCloseModal = (proximo) => {
        const remito = {
            remito: this.state.remito,
            proximo
        }

        this.props.add(remito, this.props.history);

        this.setState(() => ({
            remito: undefined
        }));
    }

    render() {
        return (
            <div className="mt-3">
                <RemitoForm accion={this.onAdd} />
                <ConfirmModal proximo={this.props.proximoNumero} isOpen={!!this.state.remito} onCloseModal={this.onCloseModal} />
            </div>
        )
    }
};

const mapStateToProps = (state) => {
    return { proximoNumero: state.remito.proximo };
}

export default connect(mapStateToProps, { proximo, add })(AddRemito);
