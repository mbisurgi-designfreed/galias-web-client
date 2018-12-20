import React, { Component } from 'react';
import { connect } from 'react-redux';
import Pusher from 'pusher-js';
import Notifications, { success, error, warning } from 'react-notification-system-redux';
import _ from 'lodash';

import { addPedido } from '../../actions/pedido.action';

export default (NotificatedComponent) => {
    class Notification extends Component {
        componentWillMount() {
            this.pusher = new Pusher('9bff45b52bd10c7d82b6', {
                cluster: 'us2',
                encrypted: true
            });

            this.chat = this.pusher.subscribe('crm');
            this.chat.bind('pedido', ({ pedido, cliente }) => {
                const notification = {
                    title: 'Nuevo pedido',
                    message: `Pedido ${pedido._id} para ${cliente}`,
                    position: 'tr',
                    autoDismiss: 0,
                    action: {
                        label: 'Ver',
                        callback: () => {
                            this.props.history.push(`/pedido/${pedido._id}`);
                        }
                    }
                };
                this.props.dispatch(success(notification));
                this.props.dispatch(addPedido(pedido));
            });

            this.chat.bind('cliente', ({ cliente }) => {
                const notification = {
                    title: 'Sync clientes',
                    message: `El cliente ${cliente} se ha sincronizado`,
                    position: 'tr',
                    autoDismiss: 0,
                }
                this.props.dispatch(success(notification));
            });

            this.chat.bind('cliente.error', ({ cliente }) => {
                const notification = {
                    title: 'Sync clientes',
                    message: `El cliente ${cliente} no se ha podido sincronizar`,
                    position: 'tr',
                    autoDismiss: 0,
                }
                this.props.dispatch(error(notification));
            });

            this.chat.bind('articulo', ({ articulo }) => {
                const notification = {
                    title: 'Sync articulos',
                    message: `El articulo ${articulo} se ha sincronizado`,
                    position: 'tr',
                    autoDismiss: 0,
                }
                this.props.dispatch(success(notification));
            });

            this.chat.bind('articulo.error', ({ articulo }) => {
                const notification = {
                    title: 'Sync articulos',
                    message: `El articulo ${articulo} no se ha podido sincronizar`,
                    position: 'tr',
                    autoDismiss: 0,
                }
                this.props.dispatch(error(notification));
            });

            this.chat.bind('precio', () => {
                const notification = {
                    title: 'Sync precios',
                    message: `Los precios se han sincronizado`,
                    position: 'tr',
                    autoDismiss: 0,
                }
                this.props.dispatch(success(notification));
            });

            this.chat.bind('precio.error', () => {
                const notification = {
                    title: 'Sync precios',
                    message: `Los precios no se han podido sincronizar`,
                    position: 'tr',
                    autoDismiss: 0,
                }
                this.props.dispatch(error(notification));
            });

            this.chat.bind('remito', ({ pedido }) => {
                const notification = {
                    title: 'Sync remitos',
                    message: `El remito para el pedido ${pedido} se ha enviado a Tango`,
                    position: 'tr',
                    autoDismiss: 0,
                }
                this.props.dispatch(success(notification));
            });

            this.chat.bind('remitos', ({ pedidos }) => {
                pedidos.forEach(pedido => {
                    const notification = {
                        title: 'Sync remitos',
                        message: `El remito para el pedido ${pedido} se ha enviado a Tango`,
                        position: 'tr',
                        autoDismiss: 0,
                    }
                    this.props.dispatch(success(notification));
                });
            });

            this.chat.bind('remitos.advertencias', ({ pedidos }) => {
                _.map(pedidos, (value, key) => {
                    const notification = {
                        title: 'Sync remitos',
                        message: `El remito para el pedido ${key} no se ha podido enviar a Tango`,
                        position: 'tr',
                        autoDismiss: 0,
                    }
                    this.props.dispatch(warning(notification));
                })
            });

            this.chat.bind('remitos.error', ({ pedidos }) => {
                pedidos.forEach(pedido => {
                    const notification = {
                        title: 'Sync remitos',
                        message: `El remito para el pedido ${pedido} no se ha podido enviar a Tango`,
                        position: 'tr',
                        autoDismiss: 0,
                    }
                    this.props.dispatch(error(notification));
                });
            });

            this.chat.bind('remito.error', ({ pedido }) => {
                const notification = {
                    title: 'Sync remitos',
                    message: `El remito para el pedido ${pedido} no se ha podido enviar a Tango`,
                    position: 'tr',
                    autoDismiss: 0,
                }
                this.props.dispatch(error(notification));
            });
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