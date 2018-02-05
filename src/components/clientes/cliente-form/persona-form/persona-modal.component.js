import React, { Component } from 'react';
import Modal from 'react-modal';

import PersonaForm from './persona-form.component';

class PersonaModal extends Component {
    onCloseModal = ({ persona = null, index = null }) => {
        if (persona) {
            this.props.onCloseModal({ persona, index });
        } else {
            this.props.onCloseModal({ persona });
        }
    }

    render() {
        return (
            <Modal className="modal" overlayClassName="overlay" isOpen={this.props.persona.item || this.props.persona.item === null ? true : false} onRequestClose={this.onCloseModal} contentLabel="Selected Option" closeTimeoutMS={0}>
                <PersonaForm persona={this.props.persona} onSubmit={this.onCloseModal} />
            </Modal>
        )
    }
};

export default PersonaModal;
