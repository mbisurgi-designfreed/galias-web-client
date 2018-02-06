import React from 'react';
import { Link } from 'react-router-dom';

const ClienteListItem = (props) => {
    const { cliente } = props;

    const direccion = () => {
        return `${cliente.direccion.calle} ${cliente.direccion.altura} - ${cliente.direccion.codigoPostal} - ${cliente.direccion.localidad}`;
    }

    return (
        <div className="cliente-list__item">
            <div className="cliente-list__item-header">
                <h6 className="cliente-list__item-title">{cliente.codigo}</h6>
                <Link className="cliente-list__item-icon" to={`/clientes/${cliente._id}`}><i className="fa fa-address-card"></i></Link>
            </div>

            <div className="cliente-list__item-content">
                <div className="cliente-list__item-group-field">
                    <div className="cliente-list__item-field">
                        <p className="cliente-list__item-label">Razon Social:</p>
                        <p className="cliente-list__item-value">{cliente.razonSocial}</p>
                    </div>
                    <div className="cliente-list__item-field">
                        <p className="cliente-list__item-label">Cuit:</p>
                        <p className="cliente-list__item-value">{cliente.cuit}</p>
                    </div>
                    <div className="cliente-list__item-field cliente-list__item-field--direccion">
                        <p className="cliente-list__item-label">Direccion:</p>
                        <p className="cliente-list__item-value">{direccion()}</p>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default ClienteListItem;
