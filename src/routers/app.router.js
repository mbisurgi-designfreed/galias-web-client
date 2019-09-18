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
import EditPedido from '../components/pedidos/edit-pedido/edit-pedido.component';
import RemitoList from '../components/remitos/remito-list/remito-list.component';
import AddRemito from '../components/remitos/add-remito/add-remito.component';
import TalonarioList from '../components/talonarios/talonario-list/talonario-list.component';
import AddTalonario from '../components/talonarios/add-talonario/add-talonario.component';
import ClientesList from '../components/clientes/clientes-list/clientes-list.component';
import EditCliente from '../components/clientes/edit-cliente/edit-cliente.component';
import AddCliente from '../components/clientes/add-cliente/add-cliente.component';
import ArticulosList from '../components/articulos/articulos-list/articulos-list.component';
import ArticulosPrecio from '../components/articulos/articulos-precio/articulos-precio.component';
import AddArticulo from '../components/articulos/add-articulo/add-articulo.component';
import EditArticulo from '../components/articulos/edit-articulo/edit-articulo.component';
import AddEntrega from '../components/entrega/add-entrega/add-entrega.component';
import Reportes from '../components/reportes/reportes.component';
import ArticulosCompetenciaList from '../components/articulos-competencia/articulos-competencia-list/articulos-competencia-list.component';
import AddArticuloCompetencia from '../components/articulos-competencia/add-articulo-competencia/add-articulo-competencia.component';
import EditArticuloCompetencia from '../components/articulos-competencia/edit-articulo-competencia/edit-articulo-competencia.component';
import ProveedoresList from '../components/proveedores/proveedores-list/proveedores-list.component';
import AddProveedor from '../components/proveedores/add-proveedor/add-proveedor.component';
import AddCompetencia from '../components/competencia/add-competencia.component';
import Map from '../components/map';


import { list as getCanales } from '../actions/canal.action';
import { list as getSubcanales } from '../actions/subcanal.action';
import { list as getFamilias } from '../actions/familia.action';
import { list as getGrupos } from '../actions/grupo.action';
import { list as getSubgrupos } from '../actions/subgrupo.action';
import { list as getUnidades } from '../actions/unidad.action';
import { list as getProveedores } from '../actions/proveedor.action';

class AppRouter extends Component {
    componentWillMount() {
        this.props.getCanales();
        this.props.getSubcanales();
        this.props.getFamilias();
        this.props.getGrupos();
        this.props.getSubgrupos();
        this.props.getUnidades();
        this.props.getProveedores();
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
                        <Route exact path="/pedidos/:id" component={authenticateRoute(EditPedido)} />
                        <Route exact path="/remitos" component={authenticateRoute(RemitoList)} />
                        <Route exact path="/remitos/new" component={authenticateRoute(AddRemito)} />
                        <Route exact path="/talonarios" component={authenticateRoute(TalonarioList)} />
                        <Route exact path="/talonarios/new" component={authenticateRoute(AddTalonario)} />
                        <Route exact path="/clientes" component={authenticateRoute(ClientesList)} />
                        <Route exact path="/clientes/new" component={authenticateRoute(AddCliente)} />
                        <Route exact path="/clientes/:id" component={authenticateRoute(EditCliente)} />
                        <Route exact path="/articulos" component={authenticateRoute(ArticulosList)} />
                        <Route exact path="/articulos/precios" component={authenticateRoute(ArticulosPrecio)} />
                        <Route exact path="/articulos/new" component={authenticateRoute(AddArticulo)} />
                        <Route exact path="/articulos/:id" component={authenticateRoute(EditArticulo)} />
                        <Route exact path="/articulos-competencia" component={authenticateRoute(ArticulosCompetenciaList)} />
                        <Route exact path="/articulos-competencia/new" component={authenticateRoute(AddArticuloCompetencia)} />
                        <Route exact path="/articulos-competencia/:id" component={authenticateRoute(EditArticuloCompetencia)} />
                        <Route exact path="/proveedores" component={authenticateRoute(ProveedoresList)} />
                        <Route exact path="/proveedores/new" component={authenticateRoute(AddProveedor)} />
                        <Route exact path="/competencia/new" component={authenticateRoute(AddCompetencia)} />
                        <Route exact path="/entregas/new" component={authenticateRoute(AddEntrega)} />
                        <Route path="/reportes" component={authenticateRoute(Reportes)} />
                        <Route path="/map" component={Map} />
                    </Switch>
                </div>
            </BrowserRouter>
        )
    }
}

export default connect(null, { getCanales, getSubcanales, getFamilias, getGrupos, getSubgrupos, getUnidades, getProveedores })(AppRouter);
