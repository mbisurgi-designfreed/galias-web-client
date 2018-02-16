import React, { Component } from 'react';
import { connect } from 'react-redux';
import Pusher from 'pusher-js';
import Notifications, { success } from 'react-notification-system-redux';

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
                    title: 'Pedido',
                    message: message.message,
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
                    <Notifications notifications={this.props.notifications} />
                </div>
            );
        }
    }

    const mapStateToProps = (state) => {
        return { notifications: state.notifications };
    }

    return connect(mapStateToProps)(Notification);
}