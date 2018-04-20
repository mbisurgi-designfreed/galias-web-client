import React, { Component } from 'react';
import { connect } from 'react-redux';
import { withFormik, Form, Field } from 'formik';
import { Link } from 'react-router-dom';
import Loader from 'react-loader'
import Pagination from "react-js-pagination";
import moment from 'moment';
import _ from 'lodash';

import { list, listToday } from '../../../actions/remito.action';

import RemitoListItem from './remito-list-item/remito-list-item.component';

import remitoSelector from '../../../selectors/remito.selector';

class RemitoList extends Component {
    state = {
        page: 1
    }

    componentWillMount() {
        this.props.listToday();
    }

    VIEW_PER_PAGE = 10;

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
        const SIZE = this.VIEW_PER_PAGE;

        const start = (this.state.page - 1) * SIZE;
        const end = this.state.page * SIZE;
        const remitos = _.slice(this.props.remitos, start, end)

        return _.map(remitos, (remito) => {
            return <RemitoListItem remito={remito} key={remito._id} />;
        });
    }

    onPageClicked = (page) => {
        this.setState(() => ({ page }))
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
                            <Link className="icon-medium" to="/entregas/new"><i className="fa fa-truck"></i></Link>
                        </div>
                    </Form>
                </div>
                <div className="row">
                    <ul className="list list--small">
                        <Loader className="spinner" loaded={!this.props.loading} color="#ed1c24" scale={0.5}>
                            {this.renderItems()}
                        </Loader>
                    </ul>
                </div>
                <div className="row">
                    <Pagination innerClass="pagination" itemClass="page-item" linkClass="page-link" activePage={this.state.page} itemsCountPerPage={this.VIEW_PER_PAGE} totalItemsCount={this.props.remitos.length} onChange={this.onPageClicked} />
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
    return { remitos: remitoSelector(state.remito.remitos), loading: state.remito.loading };
}

export default connect(mapStateToProps, { list, listToday })(withFormik({
    mapPropsToValues,
    handleSubmit: onSubmit
})(RemitoList));
