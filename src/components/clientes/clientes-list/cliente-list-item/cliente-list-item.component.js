import React from 'react';
import { Link } from 'react-router-dom';

const ClienteListItem = (props) => {
    const { cliente } = props;

    const direccion = () => {
        return `${cliente.direccion.calle} ${cliente.direccion.altura} - ${cliente.direccion.codigoPostal} - ${cliente.direccion.localidad}`;
    }

    return (
        <div className="list__item">
            <div className="list__item-header">
                <h6 className="list__item-title">{cliente.codigo}</h6>
                <Link className="list__item-icon" to={`/clientes/${cliente._id}`}><i className="fa fa-address-card"></i></Link>
            </div>

            <div className="list__item-content">
                <div className="list__item-group-field">
                    <div className="list__item-field">
                        <p className="list__item-label">Razon Social:</p>
                        <p className="list__item-value">{cliente.razonSocial}</p>
                    </div>
                    <div className="list__item-field">
                        <p className="list__item-label">Cuit:</p>
                        <p className="list__item-value">{cliente.cuit}</p>
                    </div>
                    <div className="list__item-field list__item-field--direccion">
                        <p className="list__item-label">Direccion:</p>
                        <p className="list__item-value">{direccion()}</p>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default ClienteListItem;
