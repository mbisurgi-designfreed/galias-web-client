import React, { Component } from 'react';
import { connect } from 'react-redux';

export default (Route) => {
    class AuthenticateRoute extends Component {
        componentWillMount() {
            if (!this.props.auth) {
                this.props.history.push('/signin');
            }
        }

        componentWillUpdate(nextProps) {
            if (!nextProps.auth) {
                this.props.history.push('/signin');
            }
        }

        render() {
            return (
                <Route {...this.props} />
            );
        }
    }

    const mapStateToProps = (state) => {
        return { auth: state.auth.authenticate };
    }

    return connect(mapStateToProps)(AuthenticateRoute);
}