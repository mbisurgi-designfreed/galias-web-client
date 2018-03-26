import React, { Component } from 'react';
import { connect } from 'react-redux';

import PedidoForm from '../pedido-form/pedido-form.component';

// import { edit } from '../../../actions/cliente.action';

class EditPedido extends Component {
    render() {
        return (
            <div className="row mt-3">
                <PedidoForm pedido={this.props.pedido} />
            </div>
        )
    }
}

const mapStateToProps = (state, ownProps) => {
    const pedido = state.pedido.pedidos[ownProps.match.params.id];

    return { pedido }
}

export default connect(mapStateToProps, { })(EditPedido);