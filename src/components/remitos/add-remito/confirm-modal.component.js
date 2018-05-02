import React, { Component } from 'react';
import Modal from 'react-modal';

class ConfirmModal extends Component {
    state = {
        proximo: 0
    }

    componentWillReceiveProps(nextProps) {
        this.setState(() => ({
            proximo: nextProps.proximo
        }));
    }

    onChange = (e) => {
        const proximo = e.target.value;

        this.setState(() => ({
            proximo
        }));
    }

    onProximo = () => {
        const proximo = this.state.proximo;
        const nuevo = proximo + 1;

        this.setState(() => ({
            proximo: nuevo
        }));
    }

    onCloseModal = () => {
        this.props.onCloseModal(this.state.proximo);
    }

    render() {
        return (
            <Modal className="modal" overlayClassName="overlay" isOpen={this.props.isOpen} onRequestClose={this.onCloseModal} contentLabel="Selected Option" ariaHideApp={false} closeTimeoutMS={0}>
                <label className="form__label" htmlFor="cantidad">Proximo numero a emitir?</label>
                <input style={{ height: 20 }} className="form__field-table" type="number" value={this.state.proximo} name="cantidad" onChange={this.onChange} disabled />
                <p style={{ fontSize: 20 }} className="form__field-error" style={{ display: 'flex', alignItems: 'center' }}>
                    Si por algun motivo el proximo numero a generar no es que correspone, presione aqui
                <button style={{ marginLeft: 10 }} className='mr-sm btn-link btn-link--success' onClick={this.onProximo} ><i className="fa fa-plus"></i></button>
                </p>
                <div className="text-left mt-sm">
                    <button className="btn" onClick={this.onCloseModal}>Aceptar</button>
                </div>
            </Modal>
        )
    }
}

export default ConfirmModal;