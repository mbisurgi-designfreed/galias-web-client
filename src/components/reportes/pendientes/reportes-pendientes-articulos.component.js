import React, { Component } from 'react';
import { connect } from 'react-redux';
import _ from 'lodash';

import { list, pendiente, reset } from '../../../actions/articulo.action';

class ReportesPendientesArticulos extends Component {
    state = {
        articulos: []
    }

    componentWillMount() {
        this.props.pendiente();
    }

    componentWillReceiveProps(nextProps) {
        // const clientes = _.map(nextProps.clientes, (cliente) => {
        //     return {
        //         value: cliente._id,
        //         label: cliente.razonSocial
        //     };
        // })

        // this.setState(() => ({
        //     clientes
        // }));
    }

    componentWillUnmount() {
        this.props.reset();
    }

    renderArticulos = () => {
        return _.map(this.props.pendientes, (articulo) => {
            return (
                <tr>
                    <td>{articulo.codigo}</td>
                    <td>{articulo.descripcion}</td>
                    <td className="text-right">{articulo.cantidad}</td>
                </tr>
            )
        });
    };

    render() {
        return (
            <div className="row">
                <table className="mt-sm">
                    <col style={{ width: '30%' }} />
                    <col style={{ width: '50%' }} />
                    <col style={{ width: '20%' }} />
                    <thead>
                        <tr>
                            <th>Codigo</th>
                            <th>Articulo</th>
                            <th>Cantidad</th>
                        </tr>
                    </thead>
                    <tbody>
                        {this.renderArticulos()}
                    </tbody>
                </table>
            </div>
        )
    }
}

const mapStateToProps = (state) => {
    return { pendientes: state.articulo.pendientes };
};

export default connect(mapStateToProps, { list, pendiente, reset })(ReportesPendientesArticulos);