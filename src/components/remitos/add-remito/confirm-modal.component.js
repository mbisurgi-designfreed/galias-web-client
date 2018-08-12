import React, { Component } from 'react';
import { connect } from 'react-redux';
import Modal from 'react-modal';
import moment from 'moment';
import jsPDF from 'jspdf';

class ConfirmModal extends Component {
    IVA = {
        ri: 'Responsable inscripto',
        rs: 'Responsable monotributo',
        cf: 'Consumidor final',
        ex: 'Exento'
    }
    
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

        this.print();
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

    print = () => {
        const remito = this.props.remito;

        const datos = {
            fecha: moment(remito.fecha).format('DD/MM/YYYY'),
            cliente: this.props.clientes[remito.cliente],
            items: remito.items.map((item) => {
                return { ...this.props.articulos[item.articulo], cantidad: item.cantidad }
            })

        }

        const doc = new jsPDF({
            orientation: 'p',
            unit: 'cm',
            format: 'a4'
        });

        doc.text(`${datos.fecha}`, 15, 4.8);
        doc.text(datos.cliente.cuit, 3, 7.8);
        doc.text(datos.cliente.razonSocial, 13.5, 7.8);
        doc.text(this.IVA[datos.cliente.iva], 6, 8.6);
        doc.text(`${datos.cliente.direccion.calle} ${datos.cliente.direccion.altura} - ${datos.cliente.direccion.codigoPostal}`, 3.5, 9.1);
        doc.text(`Cuenta corriente a ${datos.cliente.condicionPago} dias`, 5, 9.8);

        for (let i = 0; i < datos.items.length; i++) {
            let top = 12 + (i / 2);
            doc.text(datos.items[i].codigo, 1, top);
            doc.text(datos.items[i].descripcion, 5, top);
            doc.text(datos.items[i].cantidad.toString(), 17.5, top);
        }

        doc.save(`R${this.props.pv.toString().padStart(4, '0')}${this.props.numero.toString().padStart(8, '0')}.pdf`); 
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

const mapStateToProps = (state) => {
    return { clientes: state.cliente.clientes, articulos: state.articulo.articulos };
}

export default connect(mapStateToProps)(ConfirmModal);