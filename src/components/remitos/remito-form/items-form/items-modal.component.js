import React, { Component } from 'react';
import Modal from 'react-modal';

import ItemsForm from './items-form.component';

class ItemsModal extends Component {
    onCloseModal = ({ persona = null, index = null }) => {
        // if (persona) {
        //     this.props.onCloseModal({ persona, index });
        // } else {
        //     this.props.onCloseModal({ persona });
        // }

        this.props.onCloseModal();
    }

    onAgregar = (item) => {
        this.props.onAgregar(item);
    }

    onEliminar = (item) => {
        this.props.onEliminar(item);
    }

    render() {
        return (
            <Modal className="modal" overlayClassName="overlay" isOpen={this.props.isOpen} onRequestClose={this.onCloseModal} contentLabel="Selected Option" ariaHideApp={false} closeTimeoutMS={0}>
                <ItemsForm pedido={this.props.pedido} onAgregar={this.onAgregar} onEliminar={this.onEliminar} />
                <div className="text-left mt-sm">
                    <button className="btn" onClick={this.onCloseModal}>Aceptar</button>
                </div>
            </Modal>
        )
    }
};

export default ItemsModal;
