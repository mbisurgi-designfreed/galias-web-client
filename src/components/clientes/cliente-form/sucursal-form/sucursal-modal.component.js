import React, { Component } from 'react';
import Modal from 'react-modal';

import SucursalForm from './sucursal-form.component';

class SucursalModal extends Component {
    onCloseModal = ({ sucursal = null, index = null }) => {
        if (sucursal) {
            this.props.onCloseModal({ sucursal, index });
        } else {
            this.props.onCloseModal({ sucursal });
        }
    }

    render() {
        
        return (
            <Modal className="modal" overlayClassName="overlay" isOpen={this.props.sucursal.item || this.props.sucursal.item === null ? true : false} onRequestClose={this.onCloseModal} contentLabel="Selected Option" ariaHideApp={false} closeTimeoutMS={0}>
                <SucursalForm sucursal={this.props.sucursal} onSubmit={this.onCloseModal} />
            </Modal>
        )
    }
};

export default SucursalModal;
