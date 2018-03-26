import React, { Component } from 'react';
import { connect } from 'react-redux';
import { withFormik, Form, Field } from 'formik';
import { Link } from 'react-router-dom';
import moment from 'moment';
import _ from 'lodash';

import { list } from '../../../actions/remito.action';

import RemitoListItem from './remito-list-item/remito-list-item.component';

class RemitoList extends Component {
    renderBuscar() {
        const loading = this.props.loading;

        if (loading) {
            return (
                <button type="submit" className="btn btn--small" disabled ><i className="fa fa-circle-o-notch fa-spin" /> Buscando...</button>
            );
        }

        return (
            <button className="btn btn--small" >Buscar</button>
        );
    }

    renderItems() {
        // return _.map(this.props.remitos, (remito) => {
        //     return <RemitoListItem remito={remito} key={remito._id} />;
        // });
    }

    render() {
        return (
            <div className="row">
                <div className="row">
                    <Form className="form form--inline">
                        <div className="form__group form__group--inline">
                            <label className="form__label form__label--inline" htmlFor="desde">Desde</label>
                            <Field className="form__field form__field--inline" type="date" id="desde" name="desde" />
                        </div>
                        <div className="form__group form__group--inline">
                            <label className="form__label form__label--inline" htmlFor="hasta">Hasta</label>
                            <Field className="form__field form__field--inline" type="date" id="hasta" name="hasta" />
                        </div>
                        {this.renderBuscar()}
                        <div className="form__icon-container">
                            <Link className="icon-medium" to="/remitos/new"><i className="fa fa-plus-circle"></i></Link>
                        </div>
                    </Form>
                </div>
                <div className="row">
                    {this.renderItems()}
                </div>
            </div>
        );
    }
}

const onSubmit = (values, { props }) => {
    const { desde, hasta } = values;

    props.list(moment(desde).valueOf(), moment(hasta).valueOf());
};

const mapPropsToValues = (props) => ({
    desde: '',
    hasta: ''
});

const mapStateToProps = (state) => {
    return { remitos: state.remito.remitos, loading: state.remito.loading };
}

export default connect(mapStateToProps, { list })(withFormik({
    mapPropsToValues,
    handleSubmit: onSubmit
})(RemitoList));
