import React from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import moment from 'moment';
import numeral from 'numeral';

import { select } from '../../../../actions/remito.action';

const RemitoListItem = (props) => {
    const { remito } = props;

    const onItemClicked = (value) => {
        const checked = value.target.checked;

        props.select(remito, checked);
    }

    const isDisabled = () => {
        if (remito.estado === 'entregado') {
            return true;
        }

        return false;
    }

    const formatDate = () => {
        return moment(remito.fecha).format('DD/MM/YYYY');
    }

    const formatNumber = (number) => {
        return numeral(number).format('0,0.00');
    };

    const formatColor = (estado) => {
        if (estado === 'generado') {
            return 'info__value--danger';
        }

        if (estado === 'entregado') {
            return 'info__value--success';
        }
    }

    return (
        <div className="list__item">
            <div className="list__item-header">
                <h6 className="list__item-title">{formatDate()} - {remito.numero}</h6>
                <div className="list__item-menu">
                    <Link className="list__item-icon" to={`/remitos/${remito._id}`}><i className="fa fa-list-alt"></i></Link>
                    <input type="checkbox" className={`list__item-check ${isDisabled() ? 'list__item-check--disabled' : ''}`} disabled={isDisabled()} onChange={onItemClicked} />
                </div>
            </div>

            <div className="list__item-content">
                <div className="list__item-group-field">
                    <div className="list__item-field">
                        <p className="list__item-label">Cliente:</p>
                        <p className="list__item-value">{remito.cliente.razonSocial}</p>
                    </div>
                    <div className="list__item-field">
                        <p className="list__item-label">Total:</p>
                        <p className="list__item-value">{formatNumber(remito.total)}</p>
                    </div>
                    <div className="list__item-field list__item-field--direccion">
                        <p className="list__item-label">Estado:</p>
                        <p className={`list__item-value ${formatColor(remito.estado)}`}>{remito.estado.toUpperCase()}</p>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default connect(null, { select })(RemitoListItem);
