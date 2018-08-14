import React, { Component } from 'react';
import { connect } from 'react-redux';
import Loader from 'react-loader'
import _ from 'lodash';

import ArticulosPrecioItem from './articulos-precio-item/articulos-precio-item.component';

import { editPrice } from '../../../actions/articulo.action';

class ArticulosPrecio extends Component {
    state = {
        articulos: this.props.articulos
    }

    updatePrecio = (id, precio) => {
        const articulo = this.state.articulos[id];
        articulo.precioVta = precio;
        articulo.sincronizado = false;
    };

    renderArticulos = () => {
        return _.map(this.state.articulos, (articulo) => {
            return <ArticulosPrecioItem key={articulo._id} articulo={articulo} vigente={articulo.precioVta} actualizar={this.updatePrecio} />
        });
    };

    onActualizar = () => {
        const articulos = _.filter(this.state.articulos, (articulo) => {
            return !articulo.sincronizado;
        });

        this.props.editPrice(articulos, this.props.history);
    };

    render() {
        return (
            <div className="row">
                <div className="row">
                    <table className="mt-sm">
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
                            {this.renderArticulos()}
                        </tbody>
                    </table>
                </div>
                <div className="row">
                    <Loader className="spinner mt-medium" loaded={!this.props.loading} color="#ed1c24" scale={0.5}>
                        <button className="btn" onClick={this.onActualizar}>Actualizar</button>
                    </Loader>
                </div>
            </div>
        )
    }
};

const mapStateToProps = (state) => {
    return { articulos: state.articulo.articulos, loading: state.articulo.loading };
}

export default connect(mapStateToProps, { editPrice })(ArticulosPrecio);