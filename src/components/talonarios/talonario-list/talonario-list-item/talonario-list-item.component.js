import React from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import moment from 'moment';
import numeral from 'numeral';

const TalonarioListItem = (props) => {
    const { talonario } = props;

    return (
        <div className="list__item">
            <div className="list__item-header">
                <h6 className="list__item-title">{talonario.descripcion}</h6>
                <div className="list__item-menu">
                    <Link className="list__item-icon" to={`/remitos/${talonario._id}`}><i className="fas fa-list-alt"></i></Link>
                </div>
            </div>

            <div className="list__item-content">
                <div className="list__item-group-field">
                    <div className="list__item-field">
                        <p className="list__item-label">Desde:</p>
                        <p className="list__item-value">{talonario.desde}</p>
                    </div>
                    <div className="list__item-field">
                        <p className="list__item-label">Hasta:</p>
                        <p className="list__item-value">{talonario.hasta}</p>
                    </div>
                    <div className="list__item-field list__item-field--direccion">
                        <p className="list__item-label">Proximo:</p>
                        <p className="list__item-value">{talonario.proximo}</p>
                    </div>
                    <div className="list__item-field list__item-field--direccion">
                        <p className="list__item-label">Tango:</p>
                        {talonario.tango ? <i className="fas fa-check-circle icon-small text-success"></i> : <i className="fas fa-times-circle icon-small"></i>}
                    </div>
                    <div className="list__item-field list__item-field--direccion">
                        <p className="list__item-label">Habilitado:</p>
                        {talonario.habilitado ? <i className="fas fa-check-circle icon-small text-success"></i> : <i className="fas fa-times-circle icon-small"></i>}
                    </div>
                </div>
            </div>
        </div>
    );
};

export default connect(null)(TalonarioListItem);
