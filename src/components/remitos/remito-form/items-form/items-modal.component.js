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
    }

    render() {
        return (
            <Modal className="modal" overlayClassName="overlay" isOpen={this.props.isOpen} onRequestClose={this.onCloseModal} contentLabel="Selected Option" ariaHideApp={false} closeTimeoutMS={0}>
                <ItemsForm pendientes={this.props.pendientes} />
            </Modal>
        )
    }
};

export default ItemsModal;
