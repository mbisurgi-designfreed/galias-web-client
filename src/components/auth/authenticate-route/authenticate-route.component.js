import React, { Component } from 'react';
import {connect} from 'react-redux';

export default (Route) => {
    class AuthenticateRoute extends Component {
        render() {
            return (
                <Route {...this.props} />
            );
        }
    }

    return connect(null)(AuthenticateRoute);
}