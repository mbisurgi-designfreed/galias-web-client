import React, { Component } from 'react';
import { connect } from 'react-redux';
import Pusher from 'pusher-js';

import { listToday } from '../../actions/pedido.action';

export default (RefreshedComponent) => {
    class Refresh extends Component {
        componentWillMount() {
            this.pusher = new Pusher('9bff45b52bd10c7d82b6', {
                cluster: 'us2',
                encrypted: true
            });

            this.chat = this.pusher.subscribe('crm');
            this.chat.bind('pedido', ({ pedido, cliente }) => {
                //this.props.listToday();
            });
        }

        render() {
            return (
                <div>
                    <RefreshedComponent {...this.props} />
                </div>
            );
        }
    }

    return connect(null, { listToday })(Refresh);
}