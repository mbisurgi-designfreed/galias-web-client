import React, { Component } from 'react';
import { BrowserRouter, Route, Switch } from 'react-router-dom';

import authenticateRoute from '../components/auth/authenticate-route/authenticate-route.component';

import Header from '../components/header/header.component';
import Home from '../components/home/home.component';
import Signin from '../components/auth/signin/signin.component';
import Diaria from '../components/diaria/diaria.component';
import AddDiaria from '../components/diaria/add-diaria/add-diaria.component';

class App extends Component {
    render() {
        return (
            <div>
                <BrowserRouter>
                    <div>
                        <Header />
                        <Switch>
                            <Route exact path="/" component={Home} />
                            <Route exact path="/signin" component={Signin} />
                            <Route exact path="/diaria" component={authenticateRoute(Diaria)} />
                            <Route exact path="/diaria/new" component={authenticateRoute(AddDiaria)} />
                        </Switch>
                    </div>
                </BrowserRouter>
            </div>
        );
    }
};

export default App;
