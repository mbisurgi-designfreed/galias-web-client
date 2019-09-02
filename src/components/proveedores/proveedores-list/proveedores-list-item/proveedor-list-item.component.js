import React from 'react';
import { Link } from 'react-router-dom';
import numeral from 'numeral';

const ProveedorListItem = (props) => {
    const { proveedor } = props;

    const renderSync = () => {
        if (proveedor.sincronizado) {
            return <i className="icon fas fa-cloud-upload-alt"></i>
        }
    };

    return (
        <div className="list__item">
            <div className="list__item-header">
                <h6 className="list__item-title">{proveedor.codigo}</h6>
                <div>
                    {renderSync()}
                    <Link className="list__item-icon" to={`/proveedores/${proveedor._id}`}><i className="fa fa-list-alt"></i></Link>
                </div>
            </div>

            <div className="list__item-content">
                <div className="list__item-group-field">
                    <div className="list__item-field">
                        <p className="list__item-label">Nombre:</p>
                        <p className="list__item-value">{proveedor.nombre}</p>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default ProveedorListItem;
