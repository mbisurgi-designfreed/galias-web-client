import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';

import { signout } from '../../actions/auth.action';

class Header extends Component {
    renderHeaderItems() {
        const items = [
            { title: 'Home', path: '/', icon: 'fa fa-home mr-sm-2 text-dark' }, 
            { title: 'Diaria', path: '/diaria', icon: 'fa fa-usd mr-sm-2 text-dark' },
            { title: 'Pedidos', path: '/pedidos', icon: 'fa fa-shopping-cart mr-sm-2 text-dark' }
        ];

        return items.map((item) => {
            return (
                <li className="nav-item" key={item.title}>
                    <Link className="nav-link text-danger" to={item.path} ><i className={item.icon} /> {item.title}</Link>
                </li>
            );
        });
    };

    renderAuthButtons() {
        if (this.props.auth) {
            return <Link className="btn btn-danger btn-sm" to="/signin" onClick={this.onCerrarSesion.bind(this)}>Cerrar Sesion</Link>;
        } else {
            return <Link className="btn btn-danger btn-sm" to="/signin">Iniciar Sesion</Link>
        }
    }

    onCerrarSesion() {
        this.props.signout();
    }

    render() {
        return (
            <nav className="navbar navbar-expand-lg navbar-light bg-light">
                <Link className="navbar-brand" to="/">
                    <img src="" width="30" height="30" className="d-inline-block align-top" alt="" />
                    Galias
            </Link>
                <button className="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
                    <span className="navbar-toggler-icon" />
                </button>
                <div className="collapse navbar-collapse" id="navbarSupportedContent">
                    <ul className="navbar-nav mr-auto">
                        {this.renderHeaderItems()}
                    </ul>
                    {this.renderAuthButtons()}
                </div>
            </nav>
        );
    }
}

const mapStateToProps = (state) => {
    return { auth: state.auth.authenticate };
}

export default connect(mapStateToProps, { signout })(Header);
