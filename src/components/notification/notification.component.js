import React, { Component } from 'react';
import { socketConnect } from 'socket.io-react';
import { connect } from 'react-redux';
import Pusher from 'pusher-js';
import Notifications, { success } from 'react-notification-system-redux';

import { listLast, receiveNotification, resetNotification } from '../../actions/info.action';

export default (NotificatedComponent) => {
    class Notification extends Component {
        componentWillMount() {
            this.pusher = new Pusher('9bff45b52bd10c7d82b6', {
                cluster: 'us2',
                encrypted: true
            });
    
            this.chat = this.pusher.subscribe('info');
            this.chat.bind('hello', (message) => {
                const notification = {
                    // uid: 'once-please', // you can specify your own uid if required
                    title: 'Pedidos',
                    message: 'Ingreso un pedido nuevo...',
                    position: 'tr',
                    autoDismiss: 0,
                    action: {
                        label: 'Ver',
                        callback: () => alert('clicked!')
                    }
                };

                this.props.dispatch(success(notification));
            })
        }

        render() {
            return (
                <div>
                    <NotificatedComponent {...this.props} />
                    <Notifications notifications={this.props.notifications} style={false} />
                </div>
            );
        }
    }

    const mapStateToProps = (state) => {
        return { notifications: state.notifications };
    }

    return connect(mapStateToProps, { listLast, receiveNotification, resetNotification })(Notification);
}