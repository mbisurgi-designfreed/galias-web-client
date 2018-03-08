import React, { Component } from 'react';
import Modal from 'react-modal';

import UnidadVentaForm from './unidad-venta-form.component';

class UnidadVentaModal extends Component {
    onCloseModal = ({ unidadVta = null, index = null }) => {
        if (unidadVta) {
            this.props.onCloseModal({ unidadVta, index });
        } else {
            this.props.onCloseModal({ unidadVta });
        }
    }

    render() {
        return (
            <Modal className="modal" overlayClassName="overlay" isOpen={this.props.unidadVta.item || this.props.unidadVta.item === null ? true : false} onRequestClose={this.onCloseModal} contentLabel="Selected Option" ariaHideApp={false} closeTimeoutMS={0}>
                <UnidadVentaForm unidadVta={this.props.unidadVta} unidades={this.props.unidades} onSubmit={this.onCloseModal} />
            </Modal>
        )
    }
};

export default UnidadVentaModal;
