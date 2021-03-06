import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';

import { signout } from '../../actions/auth.action';
import { resetNotification } from '../../actions/info.action';

class Header extends Component {
    renderHeaderItems() {
        const items = [
            { title: 'Home', path: '/', icon: 'fa fa-home icon-navbar' },
            { title: 'Clientes', path: '/clientes', icon: 'fa fa-user icon-navbar' },
            { title: 'Articulos', path: '/articulos', icon: 'fa fa-cubes icon-navbar' },
            { title: 'Diaria', path: '/diaria', icon: 'fa fa-usd icon-navbar', onClick: this.onDiaria.bind(this), badge: this.renderBadge() },
            { title: 'Pedidos', path: '/pedidos', icon: 'fa fa-shopping-cart icon-navbar' },
            { title: 'Remitos', path: '/remitos', icon: 'fa fa-list icon-navbar' }
        ];

        return items.map((item) => {
            return (
                <li className="navbar__item" key={item.title}>
                    <Link to={item.path} onClick={item.onClick} ><i className={[item.icon]} /> {item.title} {item.badge}</Link>
                </li>
            );
        });
    };

    renderBadge() {
        if (this.props.notifications > 0) {
            return <span className="badge badge-dark align-top">{this.props.notifications}</span>;
        }
    }

    renderAuthButtons() {
        if (this.props.auth) {
            return <Link className="btn btn--small navbar__auth" to="/" onClick={this.onCerrarSesion.bind(this)}>Cerrar Sesion</Link>;
        } else {
            return <Link className="btn btn--small navbar__auth" to="/signin">Iniciar Sesion</Link>
        }
    }

    onDiaria() {
        this.props.resetNotification();
    }

    onCerrarSesion() {
        this.props.signout();
    }

    render() {
        return (
            <nav className="navbar">
                <Link className="navbar__brand" to="/">
                    Galias
                </Link>
                <ul className="navbar__nav">
                    {this.renderHeaderItems()}
                </ul>
                {this.renderAuthButtons()}
            </nav>
        );
    }
}

const mapStateToProps = (state) => {
    return { auth: state.auth.authenticate, notifications: state.info.notifications };
}

export default connect(mapStateToProps, { signout, resetNotification })(Header);
