import React, { Component } from 'react';
import { socketConnect } from 'socket.io-react';
import { connect } from 'react-redux';

import { listLast, receiveNotification, resetNotification } from '../../actions/info.action';

export default (NotificationComponent) => {
    class Notification extends Component {
        componentWillMount() {
            this.props.socket.on('newInfo', (newInfo) => {
                if (this.props.match.url === '/diaria') {
                    this.props.resetNotification();
                    this.props.listLast();
                } else {
                    const notifications = this.props.notifications + 1;

                    this.props.receiveNotification(notifications);
                }
            });
        }

        render() {
            return (
                <NotificationComponent {...this.props} />
            );
        }
    }

    const mapStateToProps = (state) => {
        return { notifications: state.info.notifications };
    }

    return connect(mapStateToProps, { listLast, receiveNotification, resetNotification })(socketConnect(Notification));
}