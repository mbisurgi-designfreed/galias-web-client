import React, { Component } from 'react';
import Modal from 'react-modal';

import UnidadCompraForm from './unidad-compra-form.component';

class UnidadCompraModal extends Component {
    onCloseModal = ({ unidadCpa = null, index = null }) => {
        if (unidadCpa) {
            this.props.onCloseModal({ unidadCpa, index });
        } else {
            this.props.onCloseModal({ unidadCpa });
        }
    }

    render() {
        return (
            <Modal className="modal" overlayClassName="overlay" isOpen={this.props.unidadCpa.item || this.props.unidadCpa.item === null ? true : false} onRequestClose={this.onCloseModal} contentLabel="Selected Option" ariaHideApp={false} closeTimeoutMS={0}>
                <UnidadCompraForm unidadCpa={this.props.unidadCpa} unidades={this.props.unidades} onSubmit={this.onCloseModal} />
            </Modal>
        )
    }
};

export default UnidadCompraModal;

