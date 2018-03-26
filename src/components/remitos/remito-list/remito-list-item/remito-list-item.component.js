import React from 'react';

const RemitoListItem = (props) => {
    return (
        <div className="list__item">
            {/* <div className="list__item-header">
                <h6 className="list__item-title">{formatDate()}</h6>
                <Link className="list__item-icon" to={`/pedidos/${pedido._id}`}><i className="fa fa-list-alt"></i></Link>
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
                </div>
            </div> */}
        </div>
    );
};

export default RemitoListItem;
