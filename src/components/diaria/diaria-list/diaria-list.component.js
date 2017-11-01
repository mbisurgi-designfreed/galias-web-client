import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import moment from 'moment';
import _ from 'lodash';

import { list, listLast, unselectAll } from '../../../actions/info.action';

import DiariaListItem from './diaria-list-item/diaria-list-item.component';

class DiariaList extends Component {
    constructor(props) {
        super(props);

        this.state = { desde: '', hasta: ''};
    }

    componentWillMount() {
        this.props.listLast();
        this.props.unselectAll();
    }

    renderBuscar() {
        const loading = this.props.info.loading;

        if (loading) {
            return (
                <button type="submit" className="btn btn-danger btn-sm" disabled ><i className="fa fa-circle-o-notch fa-spin" /> Buscando...</button>
            );
        }

        return (
            <button type="submit" className="btn btn-danger btn-sm" >Buscar</button>
        );
    }

    renderItems() {
        return _.map(this.props.info.infos, (info) => {
            return <DiariaListItem diaria={info} key={info._id} />;
        });
    }

    onDesdeChange(event) {
        const desde = moment(event.target.value).format('DD/MM/YYYY');
        this.setState({ desde });
    }

    onHastaChange(event) {
        const hasta = moment(event.target.value).format('DD/MM/YYYY');
        this.setState({ hasta });
    }

    onBuscar(event) {
        event.preventDefault();

        const desde = this.state.desde;
        const hasta = this.state.hasta;

        this.props.list(desde, hasta);
    }

    render() {
        return (
            <div className="mt-3">
                <Link className="text-dark float-right mr-1" to="/diaria/compare"><i className="fa fa-line-chart fa-2x"></i></Link>
                <Link className="text-dark float-right mr-1" to="/diaria/new"><i className="fa fa-plus-circle fa-2x"></i></Link>
                <div className="clearfix">
                    <div className="float-left">
                        <form onSubmit={this.onBuscar.bind(this)} className="form-inline">
                            <div className="input-group">
                                <input type="date" className="form-control form-control-sm mr-sm-2" onChange={this.onDesdeChange.bind(this)} placeholder="Desde" />
                            </div>
                            <div className="input-group">
                                <input type="date" className="form-control form-control-sm mr-sm-2" onChange={this.onHastaChange.bind(this)} placeholder="Hasta" />
                            </div>
                            {this.renderBuscar()}
                        </form>
                    </div>
                </div>
                {this.renderItems()}
            </div>
        );
    }
}

const mapStateToProps = (state) => {
    return { info: state.info, selected: state.selectedInfo };
}

export default connect(mapStateToProps, { list, listLast, unselectAll })(DiariaList);
