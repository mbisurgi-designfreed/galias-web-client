import React, { Component } from 'react';
import { connect } from 'react-redux';
import { BrowserRouter, Switch, Route } from 'react-router-dom';

import authenticateRoute from '../components/auth/authenticate-route/authenticate-route.component';

import Header from '../components/header/header.component';
import Home from '../components/home/home.component';
import Signin from '../components/auth/signin/signin.component';
import DiariaList from '../components/diaria/diaria-list/diaria-list.component';
import DiariaCompare from '../components/diaria/diaria-compare/diaria-compare.component';
import AddDiaria from '../components/diaria/add-diaria/add-diaria.component';
import PedidoList from '../components/pedidos/pedido-list/pedido-list.component';
import ClientesList from '../components/clientes/clientes-list/clientes-list.component';
import EditCliente from '../components/clientes/edit-cliente/edit-cliente.component';
import AddCliente from '../components/clientes/add-cliente/add-cliente.component';
import ArticulosList from '../components/articulos/articulos-list/articulos-list.component';
import ArticulosPrecio from '../components/articulos/articulos-precio/articulos-precio.component';
import AddArticulo from '../components/articulos/add-articulo/add-articulo.component';
import EditArticulo from '../components/articulos/edit-articulo/edit-articulo.component';

import { list as getCanales } from '../actions/canal.action';
import { list as getSubcanales } from '../actions/subcanal.action';
import { list as getGrupos } from '../actions/grupo.action';
import { list as getSubgrupos } from '../actions/subgrupo.action';
import { list as getUnidades } from '../actions/unidad.action';

class AppRouter extends Component {
    componentWillMount() {
        this.props.getCanales();
        this.props.getSubcanales();
        this.props.getGrupos();
        this.props.getSubgrupos();
        this.props.getUnidades();
    }

    render() {
        return (
            <BrowserRouter>
                <div>
                    <Header />
                    <Switch>
                        <Route exact path="/" component={Home} />
                        <Route exact path="/signin" component={Signin} />
                        <Route exact path="/diaria" component={authenticateRoute(DiariaList)} />
                        <Route exact path="/diaria/new" component={authenticateRoute(AddDiaria)} />
                        <Route exact path="/diaria/compare" component={authenticateRoute(DiariaCompare)} />
                        <Route exact path="/pedidos" component={authenticateRoute(PedidoList)} />
                        <Route exact path="/clientes" component={authenticateRoute(ClientesList)} />
                        <Route exact path="/clientes/new" component={authenticateRoute(AddCliente)} />
                        <Route exact path="/clientes/:id" component={authenticateRoute(EditCliente)} />
                        <Route exact path="/articulos" component={authenticateRoute(ArticulosList)} />
                        <Route exact path="/articulos/precios" component={authenticateRoute(ArticulosPrecio)} />
                        <Route exact path="/articulos/new" component={authenticateRoute(AddArticulo)} />
                        <Route exact path="/articulos/:id" component={authenticateRoute(EditArticulo)} />
                    </Switch>
                </div>
            </BrowserRouter>
        )
    }
}

export default connect(null, { getCanales, getSubcanales, getGrupos, getSubgrupos, getUnidades })(AppRouter);