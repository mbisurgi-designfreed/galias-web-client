import React, { Component } from 'react';
import { connect } from 'react-redux';
import { withFormik, Form, Field } from 'formik';

import { signin } from '../../../actions/auth.action';

class Signin extends Component {
    // renderError() {
    //     const { errorMessage } = this.props;

    //     if (this.props.errorMessage) {
    //         return (
    //             <div className="alert alert-danger text-center">{errorMessage}</div>
    //         );
    //     }
    // }

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
    return { errorMessage: state.auth.error };
}

export default connect(mapStateToProps, { signin })(withFormik({
    mapPropsToValues,
    handleSubmit: onSubmit
})(Signin));