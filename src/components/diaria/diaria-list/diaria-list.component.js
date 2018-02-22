import React, { Component } from 'react';
import { connect } from 'react-redux';
import { withFormik, Form, Field } from 'formik';
import { Link } from 'react-router-dom';
import Yup from 'yup';
import Pusher from 'pusher-js';
import moment from 'moment';
import _ from 'lodash';

import { list, listLast, unselectAll } from '../../../actions/info.action';

import DiariaListItem from './diaria-list-item/diaria-list-item.component';

// import withNotification from '../../notification/notification.component';

class DiariaList extends Component {
    componentWillMount() {
        this.props.listLast();
        this.props.unselectAll();
    }

    renderBuscar() {
        const loading = this.props.info.loading;

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
        return _.map(this.props.info.infos, (info) => {
            return <DiariaListItem diaria={info} key={info._id} />;
        });
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
                            <Link className="icon-medium" to="/diaria/new"><i className="fa fa-plus-circle"></i></Link>
                            <Link className="icon-medium" to="/diaria/compare"><i className="fa fa-line-chart"></i></Link>
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
    return { info: state.info, selected: state.selectedInfo };
}

export default connect(mapStateToProps, { list, listLast, unselectAll })(withFormik({
    mapPropsToValues,
    handleSubmit: onSubmit
})(DiariaList));
