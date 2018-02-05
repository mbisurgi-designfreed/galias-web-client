import React, { Component } from 'react';
import Modal from 'react-modal';

import TelefonoForm from './telefono-form.component';

class TelefonoModal extends Component {
    onCloseModal = ({ telefono = null, index = null }) => {
        if (telefono) {
            this.props.onCloseModal({ telefono, index });
        } else {
            this.props.onCloseModal({ telefono });
        }
    }

    render() {
        return (
            <Modal className="modal" overlayClassName="overlay" isOpen={this.props.telefono.item || this.props.telefono.item === null ? true : false} onRequestClose={this.onCloseModal} contentLabel="Selected Option" closeTimeoutMS={0}>
                <TelefonoForm telefono={this.props.telefono} onSubmit={this.onCloseModal} />
            </Modal>
        )
    }
};

export default TelefonoModal;
