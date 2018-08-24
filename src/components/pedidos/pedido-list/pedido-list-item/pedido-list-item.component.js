import React from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import moment from 'moment';
import numeral from 'numeral';

import { select } from '../../../../actions/pedido.action';

const PedidoListItem = (props) => {
    const { pedido, selectedPedido, select } = props;

    const onItemClicked = (value) => {
        const checked = value.target.checked;

        select(pedido, checked);
    }

    const isDisabled = () => {
        if (pedido.estado === 'completo') {
            return true;
        }

        return false;
    }

    const isChecked = () => {
        if (selectedPedido._id === pedido._id) {
            return true;
        }

        return false;
    }

    const formatDate = () => {
        return moment(pedido.fecha).format('DD/MM/YYYY');
    }

    const formatNumber = (number) => {
        return numeral(number).format('0,0.00');
    };

    const formatColor = (estado) => {
        if (estado === 'generado') {
            return 'info__value--notify';
        }

        if (estado === 'pendiente') {
            return 'info__value--warning';
        }

        if (estado === 'completo') {
            return 'info__value--success';
        }

        if (estado === 'anulado') {
            return 'info__value--danger'
        }
    }

    const isExtra = () => {
        return pedido.extra ? 'Si' : 'No';
    }

    const renderSync = () => {
        if (pedido.sincronizado) {
            return <i className="icon fas fa-cloud-upload-alt"></i>
        }
    }

    return (
        <div className="list__item">
            <div className="list__item-header">
                <h6 className="list__item-title">{formatDate()}</h6>
                <div className="list__item-menu">
                    {renderSync()}
                    <Link className="list__item-icon" to={`/pedidos/${pedido._id}`}><i className="fa fa-list-alt"></i></Link>
                    <input type="checkbox" checked={isChecked()} className={`list__item-check ${isDisabled() ? 'list__item-check--disabled' : ''}`} disabled={isDisabled()} onChange={onItemClicked} />
                </div>
            </div>

            <div className="list__item-content">
                <div className="list__item-group-field">
                    <div className="list__item-field">
                        <p className="list__item-label">Cliente:</p>
                        <p className="list__item-value">{pedido.cliente.razonSocial}</p>
                    </div>
                    <div className="list__item-field">
                        <p className="list__item-label">Total:</p>
                        <p className="list__item-value">{formatNumber(pedido.total)}</p>
                    </div>
                    <div className="list__item-field list__item-field--direccion">
                        <p className="list__item-label">Estado:</p>
                        <p className={`list__item-value ${formatColor(pedido.estado)}`}>{pedido.estado.toUpperCase()}</p>
                    </div>
                    <div className="list__item-field list__item-field--direccion">
                        <p className="list__item-label">Extra:</p>
                        <p className={`list__item-value`}>{isExtra()}</p>
                    </div>
                </div>
            </div>
        </div>
    );
};

const mapStateToProps = (state) => {
    return { selectedPedido: state.selectedPedido }
}

export default connect(mapStateToProps, { select })(PedidoListItem);
