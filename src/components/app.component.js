import React, { Component } from 'react';
import { BrowserRouter, Route, Switch } from 'react-router-dom';
import { Container } from 'semantic-ui-react';

import authenticateRoute from '../components/auth/authenticate-route/authenticate-route.component';

import Header from '../components/header/header.component';
import Signin from '../components/auth/signin/signin.component';

class App extends Component {
    render() {
        return (
            <div>
                <BrowserRouter>
                    <div>
                        <Header />
                        <Switch>
                            <Route exact path="/signin" component={authenticateRoute(Signin)} />
                        </Switch>
                    </div>
                </BrowserRouter>
            </div>
        );
    }
};

export default App;
