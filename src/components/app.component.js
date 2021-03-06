import React, { Component } from 'react';
import { connect } from 'react-redux';
import { BrowserRouter, Route, Switch } from 'react-router-dom';

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

import { list as getCanales } from '../actions/canal.action';
import { list as getSubcanales } from '../actions/subcanal.action';

class App extends Component {
    componentWillMount() {
        console.log('componentWillMoount()', 'app');
        this.props.getCanales();
        this.props.getSubcanales();
    }

    render() {
        return (
            <div>
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
            </div>
        );
    }
};

export default connect(null, { getCanales, getSubcanales })(App);
