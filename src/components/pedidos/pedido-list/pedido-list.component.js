import React, { Component } from 'react';
import { connect } from 'react-redux';
import { withFormik, Form, Field } from 'formik';
import { Link } from 'react-router-dom';
import Loader from 'react-loader'
import Pagination from "react-js-pagination";
import Yup from 'yup';
import moment from 'moment';
import _ from 'lodash';

import { list, listToday } from '../../../actions/pedido.action';
import { setTextFilter, searchByCliente, searchByEstado } from '../../../actions/pedido-filters.action';

import Filters from '../../filters/filters.component';
import PedidoListItem from './pedido-list-item/pedido-list-item.component';

import pedidoSelector from '../../../selectors/pedido.selector';

import withRefresh from '../../notification/refresh.component';
// import withNotification from '../../notification/notification.component';

class PedidoList extends Component {
    state = {
        page: 1
    }

    componentWillMount() {
        this.props.listToday();
    }

    VIEW_PER_PAGE = 10;

    options = [{
        value: 'cliente',
        label: 'Cliente'
    }, {
        value: 'estado',
        label: 'Estado'
    }];

    onFilterChanged = (selectedOption) => {
        this.props.setTextFilter('');

        switch (selectedOption.value) {
            case 'cliente':
                return this.props.searchByCliente();
            case 'estado':
                return this.props.searchByEstado();
        }
    };

    onTextChanged = (e) => {
        this.setState(() => ({ page: 1 }))
        this.props.setTextFilter(e.target.value);
    };

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
        return _.map(this.props.pedidos, (pedido) => {
            return <PedidoListItem pedido={pedido} key={pedido._id} />;
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
                            <Link className="icon-medium" to="/pedidos/new"><i className="fa fa-plus-circle"></i></Link>
                            <Link className="icon-medium" to="/pedidos/new"><i className="fa fa-download"></i></Link>
                        </div>
                    </Form>
                </div>
                <div className="row">
                    <Filters filterValue={this.props.filters.searchBy} textValue={this.props.filters.text} options={this.options} onFilterChange={this.onFilterChanged} onTextChange={this.onTextChanged} />
                </div>
                <div className="row">
                    <ul className="list list--small">
                        <Loader className="spinner" loaded={!this.props.loading} color="#ed1c24" scale={0.5}>
                            {this.renderItems()}
                        </Loader>
                    </ul>
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
    return { info: state.info, pedidos: pedidoSelector(state.pedido.pedidos, state.pedidoFilters), loading: state.pedido.loading, filters: state.pedidoFilters };
}

export default connect(mapStateToProps, { list, listToday, setTextFilter, searchByCliente, searchByEstado })(withFormik({
    mapPropsToValues,
    handleSubmit: onSubmit
})(withRefresh(PedidoList)));
