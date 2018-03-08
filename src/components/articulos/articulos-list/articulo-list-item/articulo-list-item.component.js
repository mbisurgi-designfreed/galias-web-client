import React from 'react';
import { Link } from 'react-router-dom';
import numeral from 'numeral';

const ArticuloListItem = (props) => {
    const { articulo } = props;

    const renderSync = () => {
        if (articulo.sincronizado) {
            return <i className="icon fa fa-cloud-upload"></i>
        }
    }

    const formatNumber = (number) => {
        return numeral(number).format('0,0.00');
    };

    return (
        <div className="list__item">
            <div className="list__item-header">
                <h6 className="list__item-title">{articulo.codigo}</h6>
                <div>
                    {renderSync()}
                    <Link className="list__item-icon" to={`/articulos/${articulo._id}`}><i className="fa fa-list-alt"></i></Link>
                </div>
            </div>

            <div className="list__item-content">
                <div className="list__item-group-field">
                    <div className="list__item-field">
                        <p className="list__item-label">Descripcion:</p>
                        <p className="list__item-value">{articulo.descripcion}</p>
                    </div>
                    <div className="list__item-field">
                        <p className="list__item-label">Kilos:</p>
                        <p className="list__item-value">{formatNumber(articulo.kilos)}</p>
                    </div>
                    <div className="list__item-field">
                        <p className="list__item-label">Precio de Compra:</p>
                        <p className="list__item-value">{formatNumber(articulo.precioCpa)}</p>
                    </div>
                    <div className="list__item-field">
                        <p className="list__item-label">Precio de Venta:</p>
                        <p className="list__item-value">{formatNumber(articulo.precioVta)}</p>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default ArticuloListItem;
