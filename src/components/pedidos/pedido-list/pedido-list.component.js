import React, { Component } from 'react';
import { connect } from 'react-redux';
import { withFormik, Form, Field } from 'formik';
import { Link } from 'react-router-dom';
import Pagination from "react-js-pagination";
import Yup from 'yup';
import moment from 'moment';
import _ from 'lodash';

import { list, listLast, unselectAll } from '../../../actions/info.action';

import PedidoListItem from './pedido-list-item/pedido-list-item.component';

import withNotification from '../../notification/notification.component';

class PedidoList extends Component {
    state = {
        page: 1
    }

    componentWillMount() {
        this.props.listLast();
        this.props.unselectAll();
    }

    VIEW_PER_PAGE = 10;

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
        const PEDIDOS = [{
            _id: '1235afsegsa',
            fecha: '22/02/2018',
            cliente: 'Maximiliano Bisurgi',
            total: 1454.50,
            estado: 'generado'
        }, {
            _id: '1234asdasf',
            fecha: '22/02/2018',
            cliente: 'Claudio Bisurgi',
            total: 1200.50,
            estado: 'generado'
        }]

        return _.map(PEDIDOS, (pedido) => {
            return <PedidoListItem pedido={pedido} key={pedido._id} />;
        });

        // return _.map(this.props.pedido.pedidos, (pedido) => {
        //     return <PedidoListItem pedido={pedido} key={pedido._id} />;
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
                            <Link className="icon-medium" to="/pedidos/new"><i className="fa fa-plus-circle"></i></Link>
                            <Link className="icon-medium" to="/pedidos/new"><i className="fa fa-download"></i></Link>
                        </div>
                    </Form>
                </div>
                <div className="row">
                    {this.renderItems()}
                </div>
                <div className="row">
                    <Pagination innerClass="pagination" itemClass="page-item" linkClass="page-link" activePage={this.state.page} itemsCountPerPage={this.VIEW_PER_PAGE} totalItemsCount={this.props.pedidos.length} onChange={this.onPageClicked} />
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
    return { info: state.info, pedidos: [] };
}

export default connect(mapStateToProps, { list, listLast, unselectAll })(withFormik({
    mapPropsToValues,
    handleSubmit: onSubmit
})(PedidoList));
