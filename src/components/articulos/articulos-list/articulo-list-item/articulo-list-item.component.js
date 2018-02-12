import React from 'react';
import { Link } from 'react-router-dom';

const ArticuloListItem = (props) => {
    const { articulo } = props;

    return (
        <div className="list__item">
            <div className="list__item-header">
                <h6 className="list__item-title">{articulo.codigo}</h6>
                <Link className="list__item-icon" to={`/articulos/${articulo._id}`}><i className="fa fa-list-alt"></i></Link>
            </div>

            <div className="list__item-content">
                <div className="list__item-group-field">
                    <div className="list__item-field">
                        <p className="list__item-label">Descripcion:</p>
                        <p className="list__item-value">{articulo.descripcion}</p>
                    </div>
                    {/* <div className="list__item-field">
                        <p className="list__item-label">Cuit:</p>
                        <p className="list__item-value">{cliente.cuit}</p>
                    </div>
                    <div className="list__item-field list__item-field--direccion">
                        <p className="list__item-label">Direccion:</p>
                        <p className="list__item-value">{direccion()}</p>
                    </div> */}
                </div>
            </div>
        </div>
    );
};

export default ArticuloListItem;
