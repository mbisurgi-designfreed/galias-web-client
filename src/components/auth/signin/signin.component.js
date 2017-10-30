import React, { Component } from 'react';
import { connect } from 'react-redux';
import { reduxForm, Field } from 'redux-form';

import { signin } from '../../../actions/auth.action';

class Signin extends Component {
    renderField({ input, label, type, meta: { touched, error, valid } }) {
        return (
            <div className="form-group">
                <label>{label}</label>
                <input {...input} className={`form-control ${touched && !valid ? 'is-invalid' : ''}`} type={type} />
                {touched && error && <span className="invalid-feedback">{error}</span>}
            </div>
        );
    }

    renderError() {
        const { errorMessage } = this.props;

        if (this.props.errorMessage) {
            return (
                <div className="alert alert-danger text-center">{errorMessage}</div>
            );
        }
    }

    onIngresar(values) {
        this.props.signin(values, this.props.history);
    }

    render() {
        const { handleSubmit, valid } = this.props;

        return (
            <div className="row justify-content-center mt-5">
                <form className="col-md-4" onSubmit={handleSubmit(this.onIngresar.bind(this))} noValidate >
                    <Field name="email" component={this.renderField} type="email" label="Email" />
                    <Field name="password" component={this.renderField} type="password" label="Contraseña" />
                    {this.renderError()}
                    <button type="submit" className="btn btn-danger btn-block" disabled={!valid}>Ingresar</button>
                </form>
            </div>
        );
    }
}

const validate = (values) => {
    const errors = {};

    if (!values.email) {
        errors.email = 'Email es requerido'
    }

    if (!values.password) {
        errors.password = 'Contraseña es requerido'
    }

    return errors;
}

const mapStateToProps = (state) => {
    return { errorMessage: state.auth.error };
}

export default reduxForm({ form: 'signin', validate })(connect(mapStateToProps, { signin })(Signin));