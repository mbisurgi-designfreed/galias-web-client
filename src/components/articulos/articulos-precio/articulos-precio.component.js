import React, { Component } from 'react';

import ArticulosPrecioItem from './articulos-precio-item/articulos-precio-item.component';

class ArticulosPrecio extends Component {
    render() {
        return (
            <div className="row">
                <div className="row">
                    <table>
                        <col style={{ width: '50%' }} />
                        <col style={{ width: '20%' }} />
                        <col style={{ width: '20%' }} />
                        <col style={{ width: '10%' }} />
                        <thead>
                            <tr>
                                <th>Articulo</th>
                                <th>Vigente</th>
                                <th>Nuevo</th>
                                <th>%</th>
                            </tr>
                        </thead>
                        <tbody>
                            <ArticulosPrecioItem />
                            <ArticulosPrecioItem />
                            <ArticulosPrecioItem />
                        </tbody>
                    </table>
                </div>
                <div className="row">
                    <button className="btn">Actualizar</button>
                </div>
            </div>
        )
    }
};

export default ArticulosPrecio;