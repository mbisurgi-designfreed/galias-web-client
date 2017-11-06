import React, { Component } from 'react';
import { connect } from 'react-redux';
import moment from 'moment';
import numeral from 'numeral';

import { select } from '../../../../actions/info.action';

class DiariaListItem extends Component {
    renderItem = (label, simbol, value) => {
        return (
            <div className="row">
                <div className="col-md-4 text-secondary ">
                    <span>{label}</span>
                </div>
                <div className="col-md-8 input-group">
                    <span className="col-md-1">{simbol}</span>
                    <p className={`col-md-11 text-right ${simbol === '%' ? this.formatColor(value) : ''}`}>{this.formatNumber(value)}</p>
                </div>
            </div>
        )
    }

    onItemClicked = (value) => {
        const checked = value.target.checked;

        this.props.select(this.props.diaria, checked);
    }

    formatDate = (date) => {
        return moment(date).utc().format('DD/MM/YYYY');
    }

    formatNumber = (number) => {
        return numeral(number).format('0,0.00');
    };

    formatColor = (number) => {
        if (number < 10) {
            return 'text-success';
        }

        if (number >= 10 && number <= 20) {
            return 'text-warning';
        }

        if (number > 20) {
            return 'text-danger';
        }
    }

    render() {
        return (
            <div className="card mt-3" >
                <div className="card-header bg-danger text-white pt-0 pb-0 pl-2">{this.formatDate(this.props.diaria.fecha)}<input type="checkbox" className="form-check-input float-right" onChange={this.onItemClicked.bind(this)} /></div>
                <div className="card-body p-2">
                    <div className="row">
                        <div className="col-md-4">
                            <h6 className="text-danger text-center font-weight-bold">Disponibilidades</h6>
                            {this.renderItem('Caja', '$', this.props.diaria.caja)}
                            {this.renderItem('Bancos', '$', this.props.diaria.bancos)}
                            {this.renderItem('Cheques', '$', this.props.diaria.cheques)}
                        </div>
                        <div className="col-md-4">
                            <h6 className="text-danger text-center font-weight-bold">Credito</h6>
                            {this.renderItem('Total', '$', this.props.diaria.credito.total)}
                            {this.renderItem('Vencido', '$', this.props.diaria.credito.vencido)}
                            {this.renderItem('Vencido', '%', this.props.diaria['%vencidoCredito'])}
                        </div>
                        <div className="col-md-4">
                            <h6 className="text-danger text-center font-weight-bold">Debito</h6>
                            {this.renderItem('Total', '$', this.props.diaria.debito.total)}
                            {this.renderItem('Vencido', '$', this.props.diaria.debito.vencido)}
                            {this.renderItem('Vencido', '%', this.props.diaria['%vencidoDebito'])}
                        </div>
                    </div>
                </div>
            </div>
        );
    }

};

export default connect(null, { select })(DiariaListItem);