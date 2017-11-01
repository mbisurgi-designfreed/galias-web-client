import React, { Component } from 'react';
import { connect } from 'react-redux';
import moment from 'moment';
import numeral from 'numeral';

import { select } from '../../../../actions/info.action';

class DiariaListItem extends Component {
    renderItem = (label, value) => {
        return (
            <div className="row">
                <div className="col-md-4 text-secondary ">
                    <span>{label}</span>
                </div>
                <div className="col-md-8 input-group">
                    <span className="col-md-1">$</span>
                    <p className="col-md-11 text-right">{this.formatNumber(value)}</p>
                </div>
            </div>
        )
    }

    onItemClicked = (value) => {
        const checked = value.target.checked;

        this.props.select(this.props.diaria, checked);
    }

    formatNumber = (number) => {
        return numeral(number).format('0,0.00');
    };

    render() {
        return (
            <div className="card mt-3" >
                <div className="card-header bg-danger text-white pt-0 pb-0 pl-2">{moment(this.props.diaria.fecha).format('DD/MM/YYYY')}<input type="checkbox" className="form-check-input float-right" onChange={this.onItemClicked.bind(this)} /></div>
                <div className="card-body p-2">
                    <div className="row">
                        <div className="col-md-4">
                            <h6 className="text-danger text-center font-weight-bold">Disponibilidades</h6>
                            {this.renderItem('Caja', this.props.diaria.caja)}
                            {this.renderItem('Bancos', this.props.diaria.bancos)}
                            {this.renderItem('Cheques', this.props.diaria.cheques)}
                        </div>
                        <div className="col-md-4">
                            <h6 className="text-danger text-center font-weight-bold">Credito</h6>
                            {this.renderItem('Total', this.props.diaria.credito.total)}
                            {this.renderItem('Vencido', this.props.diaria.credito.vencido)}
                        </div>
                        <div className="col-md-4">
                            <h6 className="text-danger text-center font-weight-bold">Debito</h6>
                            {this.renderItem('Total', this.props.diaria.debito.total)}
                            {this.renderItem('Vencido', this.props.diaria.debito.vencido)}
                        </div>
                    </div>
                </div>
            </div>
        );
    }

};

export default connect(null, { select })(DiariaListItem);