import React, { Component } from 'react';
import Modal from 'react-modal';

class ConfirmModal extends Component {
    state = {
        proximo: 0,
        imprimiendo: false
    }

    componentWillReceiveProps(nextProps) {
        this.setState(() => ({
            proximo: nextProps.proximo,
            imprimiendo: nextProps.imprimiendo
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

    onImprimir = () => {
        this.setState(() => ({
            imprimiendo: true
        }));
    }

    onImprimiendo = () => {
        return (
            <p style={{ fontSize: 20 }} className="form__field-error mt-sm" style={{ display: 'flex', alignItems: 'center' }}>
                Se imprimio el remito correctamente?
                <button style={{ marginLeft: 5, marginRight: 5 }} className='btn-link btn-link--success' onClick={this.onPrintSuccess} >SI</button>
                /
                <button style={{ marginLeft: 5 }} className='btn-link btn-link--danger' onClick={this.onPrintError} >NO</button>
            </p>
        )
    }

    onPrintSuccess = () => {
        this.props.onCloseModal(this.state.proximo, false);
    }

    onPrintError = () => {
        this.setState(() => ({
            imprimiendo: false
        }));
    }

    onCloseModal = (cancel) => {
        this.props.onCloseModal(this.state.proximo, cancel);
    }

    render() {
        return (
            <Modal className="modal" overlayClassName="overlay" isOpen={this.props.isOpen} onRequestClose={this.onCloseModal} shouldCloseOnOverlayClick={false} contentLabel="Selected Option" ariaHideApp={false} closeTimeoutMS={0}>
                <label className="form__label" htmlFor="cantidad">Proximo numero a emitir?</label>
                <input style={{ height: 20 }} className="form__field-table" type="number" value={this.state.proximo} name="cantidad" onChange={this.onChange} disabled />
                <p style={{ fontSize: 20 }} className="form__field-error" style={{ display: 'flex', alignItems: 'center' }}>
                    Si por algun motivo el proximo numero a generar no es que correspone, presione aqui
                <button style={{ marginLeft: 10 }} className='mr-sm btn-link btn-link--success' onClick={this.onProximo} ><i className="fas fa-plus"></i></button>
                </p>
                <div className="text-left mt-sm">
                    <button className="btn mr-sm" onClick={this.onImprimir}>Imprimir</button>
                    <button className="btn" onClick={() => this.onCloseModal(true)}>Cancelar</button>
                    {this.state.imprimiendo ? this.onImprimiendo() : ''}
                </div>
            </Modal>
        )
    }
}

export default ConfirmModal;