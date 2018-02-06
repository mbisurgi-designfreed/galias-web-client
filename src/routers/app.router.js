import React from 'react';
import { BrowserRouter, Switch, Route } from 'react-router-dom';

import authenticateRoute from '../components/auth/authenticate-route/authenticate-route.component';

import Header from '../components/header/header.component';
import Home from '../components/home/home.component';
import Signin from '../components/auth/signin/signin.component';
import DiariaList from '../components/diaria/diaria-list/diaria-list.component';
import DiariaCompare from '../components/diaria/diaria-compare/diaria-compare.component';
import AddDiaria from '../components/diaria/add-diaria/add-diaria.component';
import ClientesList from '../components/clientes/clientes-list/clientes-list.component';
import EditCliente from '../components/clientes/edit-cliente/edit-cliente.component';
import AddCliente from '../components/clientes/add-cliente/add-cliente.component';


const AppRouter = () => (
    <BrowserRouter>
        <div>
            <Header />
            <Switch>
                <Route exact path="/" component={Home} />
                <Route exact path="/signin" component={Signin} />
                <Route exact path="/diaria" component={authenticateRoute(DiariaList)} />
                <Route exact path="/diaria/new" component={authenticateRoute(AddDiaria)} />
                <Route exact path="/diaria/compare" component={authenticateRoute(DiariaCompare)} />
                <Route exact path="/clientes" component={authenticateRoute(ClientesList)} />
                <Route exact path="/clientes/new" component={authenticateRoute(AddCliente)} />
                <Route exact path="/clientes/:id" component={authenticateRoute(EditCliente)} />
            </Switch>
        </div>
    </BrowserRouter>
);

export default AppRouter;