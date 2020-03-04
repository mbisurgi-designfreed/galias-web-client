import * as React from 'react';
import { Route, Switch } from 'react-router-dom';

import { ConnectedNavbar as Navbar } from '../shared/layouts/Navbar';

import authenticateRoute from '../components/auth/authenticate-route/authenticate-route.component';
import DiariaList from '../components/diaria/diaria-list/diaria-list.component';
import AddDiaria from '../components/diaria/add-diaria/add-diaria.component';
import DiariaCompare from '../components/diaria/diaria-compare/diaria-compare.component';
import PedidoList from '../components/pedidos/pedido-list/pedido-list.component';
import EditPedido from '../components/pedidos/edit-pedido/edit-pedido.component';
import RemitoList from '../components/remitos/remito-list/remito-list.component';
import AddRemito from '../components/remitos/add-remito/add-remito.component';
import TalonarioList from '../components/talonarios/talonario-list/talonario-list.component';
import AddTalonario from '../components/talonarios/add-talonario/add-talonario.component';
import ClientesList from '../components/clientes/clientes-list/clientes-list.component';
import AddCliente from '../components/clientes/add-cliente/add-cliente.component';
import EditCliente from '../components/clientes/edit-cliente/edit-cliente.component';
import ArticulosList from '../components/articulos/articulos-list/articulos-list.component';
import ArticulosPrecio from '../components/articulos/articulos-precio/articulos-precio.component';
import AddArticulo from '../components/articulos/add-articulo/add-articulo.component';
import EditArticulo from '../components/articulos/edit-articulo/edit-articulo.component';
import ArticulosCompetenciaList
  from '../components/articulos-competencia/articulos-competencia-list/articulos-competencia-list.component';
import AddArticuloCompetencia
  from '../components/articulos-competencia/add-articulo-competencia/add-articulo-competencia.component';
import EditArticuloCompetencia
  from '../components/articulos-competencia/edit-articulo-competencia/edit-articulo-competencia.component';
import ProveedoresList from '../components/proveedores/proveedores-list/proveedores-list.component';
import AddProveedor from '../components/proveedores/add-proveedor/add-proveedor.component';
import AddCompetencia from '../components/competencia/add-competencia.component';
import AddEntrega from '../components/entrega/add-entrega/add-entrega.component';
import Reportes from '../components/reportes/reportes.component';
import { Map } from '../Mapa';


const Main = () => (
  <div>

  </div>
);

export class Home extends React.Component<any, any> {
  render() {
    return (
      <div style={{ height: '100%' }}>
        <Navbar/>
        <Switch>
          <Route exact path="/" component={Main}/>
          <Route exact path="/diaria" component={DiariaList}/>
          <Route exact path="/diaria/new" component={AddDiaria}/>
          <Route exact path="/diaria/compare" component={DiariaCompare}/>
          <Route exact path="/pedidos" component={PedidoList}/>
          <Route exact path="/pedidos/:id" component={EditPedido}/>
          <Route exact path="/remitos" component={RemitoList}/>
          <Route exact path="/remitos/new" component={AddRemito}/>
          <Route exact path="/talonarios" component={TalonarioList}/>
          <Route exact path="/talonarios/new" component={AddTalonario}/>
          <Route exact path="/clientes" component={ClientesList}/>
          <Route exact path="/clientes/new" component={AddCliente}/>
          <Route exact path="/clientes/:id" component={EditCliente}/>
          <Route exact path="/articulos" component={ArticulosList}/>
          <Route exact path="/articulos/precios" component={ArticulosPrecio}/>
          <Route exact path="/articulos/new" component={AddArticulo}/>
          <Route exact path="/articulos/:id" component={EditArticulo}/>
          <Route exact path="/articulos-competencia" component={ArticulosCompetenciaList}/>
          <Route exact path="/articulos-competencia/new" component={AddArticuloCompetencia}/>
          <Route exact path="/articulos-competencia/:id" component={EditArticuloCompetencia}/>
          <Route exact path="/proveedores" component={ProveedoresList}/>
          <Route exact path="/proveedores/new" component={AddProveedor}/>
          <Route exact path="/competencia/new" component={AddCompetencia}/>
          <Route exact path="/entregas/new" component={AddEntrega}/>
          <Route path="/reportes" component={Reportes}/>
          <Route path="/mapa" component={Map}/>
          {/*<Route path="/zonas" component={Zonas} />*/}
        </Switch>
      </div>
    );
  }
}
