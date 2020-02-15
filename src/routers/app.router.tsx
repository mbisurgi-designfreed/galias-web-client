import * as React from 'react';
import { connect } from 'react-redux';
import { BrowserRouter, Switch, Route } from 'react-router-dom';

import authenticateRoute from '../components/auth/authenticate-route/authenticate-route.component';

import Header from '../components/header/header.component';
//import Home from '../components/home/home.component';
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
import Zonas from '../components/zonas';

import { Home } from '../Home';

import { list as getCanales } from '../actions/canal.action';
import { list as getSubcanales } from '../actions/subcanal.action';
import { list as getFamilias } from '../actions/familia.action';
import { list as getGrupos } from '../actions/grupo.action';
import { list as getSubgrupos } from '../actions/subgrupo.action';
import { list as getUnidades } from '../actions/unidad.action';
import { list as getProveedores } from '../actions/proveedor.action';
import { Login } from '../Login'
import { AuthenticatedRoute } from '../shared/layouts/Shell/AuthenticatedRoute';

export class AppRouter extends React.Component<any, any> {
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
                <Switch>
                    <Route exact path="/signin" component={Login} />
                    <AuthenticatedRoute path="/" component={Home} />
                </Switch>
            </BrowserRouter>
        )
    }
}

export const ConnectedRouter = connect(null, { getCanales, getSubcanales, getFamilias, getGrupos, getSubgrupos, getUnidades, getProveedores })(AppRouter);

//export default connect(null, { getCanales, getSubcanales, getFamilias, getGrupos, getSubgrupos, getUnidades, getProveedores })(AppRouter);
