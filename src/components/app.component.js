import React, { Component } from 'react';
import { connect } from 'react-redux';
import { BrowserRouter, Route, Switch } from 'react-router-dom';

import Signin from '../components/auth/signin';

class App extends Component {
    render() {
        return (
            <div className="container">
                <BrowserRouter>
                    <div>
                        <Header />
                        <Switch>
                            <Route exact path="/" component={Landing} />
                            <Route exact path="/signin" component={Signin} />
                        </Switch>
                    </div>
                </BrowserRouter>
            </div>
        );
    }
};

export default App;
