import React, { Component } from 'react';
import { connect } from 'react-redux';
import { withFormik, Form, Field } from 'formik';

import { signin } from '../../../actions/auth.action';

class Signin extends Component {
    onIngresar(values) {
        this.props.signin(values, this.props.history);
    }

    render() {
        return (
            <Form className="login">
                <div className="form-group">
                    <label className="form__label" htmlFor="email">Email</label>
                    <Field className="form__field" id="email" type="email" name="email" />
                </div>
                <div className="form-group">
                    <label className="form__label" htmlFor="password">Password</label>
                    <Field className="form__field" id="password" type="password" name="password" />
                </div>
                <div className="form-group">
                    {this.props.error && (<p className="form__field-error">{this.props.error}</p>)}
                </div>
                <div className="row text-center">
                    <button className="btn mt-small" >Ingresar</button>
                </div>
            </Form>
        );
    }
}

const onSubmit = (values, { props, resetForm }) => {
    const { email, password } = values;

    props.signin({ email, password }, props.history);
};

const mapPropsToValues = (props) => ({
    email: '',
    password: ''
});

const mapStateToProps = (state) => {
    return { error: state.auth.error };
}

export default connect(mapStateToProps, { signin })(withFormik({
    mapPropsToValues,
    handleSubmit: onSubmit
})(Signin));