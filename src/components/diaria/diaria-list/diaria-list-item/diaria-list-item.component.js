import React, { Component } from 'react';
import { connect } from 'react-redux';
import moment from 'moment';
import numeral from 'numeral';

import { select } from '../../../../actions/info.action';

class DiariaListItem extends Component {
    onItemClicked = (value) => {
        const checked = value.target.checked;

        this.props.select(this.props.diaria, checked);
    }

    formatDate = () => {
        return moment(this.props.diaria.fecha).format('DD/MM/YYYY');
    }

    formatNumber = (number) => {
        return numeral(number).format('0,0.00');
    };

    formatColor = (number) => {
        if (number < 10) {
            return 'info__value--success';
        }

        if (number >= 10 && number <= 20) {
            return 'info__value--warning';
        }

        if (number > 20) {
            return 'info__value--danger';
        }
    }

    render() {
        return (
            // <div className="card mt-3" >
            //     <div className="card-header bg-danger text-white pt-0 pb-0 pl-2">{this.formatDate(this.props.diaria.fecha)}<input type="checkbox" className="form-check-input float-right" onChange={this.onItemClicked.bind(this)} /></div>
            //     <div className="card-body p-2">
            //         <div className="row">
            //             <div className="col-md-4">
            //                 <h6 className="text-danger text-left text-md-center font-weight-bold">Disponibilidades</h6>
            //                 {this.renderItem('Caja', '$', this.props.diaria.caja)}
            //                 {this.renderItem('Bancos', '$', this.props.diaria.bancos)}
            //                 {this.renderItem('Cheques', '$', this.props.diaria.cheques)}
            //                 {this.renderItem('Total', '$', this.props.diaria.caja + this.props.diaria.bancos + this.props.diaria.cheques)}
            //             </div>
            //             <div className="col-md-4">
            //                 <h6 className="text-danger text-left text-md-center font-weight-bold">Debito</h6>
            //                 {this.renderItem('Total', '$', this.props.diaria.debito.total)}
            //                 {this.renderItem('Vencido', '$', this.props.diaria.debito.vencido)}
            //                 {this.renderItem('N/C', '$', this.props.diaria.debito.nc)}
            //                 {this.renderItem('', '%', this.props.diaria['%vencidoDebito'])}
            //             </div>
            //             <div className="col-md-4">
            //                 <h6 className="text-danger text-left text-md-center font-weight-bold">Credito</h6>
            //                 {this.renderItem('Total', '$', this.props.diaria.credito.total)}
            //                 {this.renderItem('Vencido', '$', this.props.diaria.credito.vencido)}
            //                 {this.renderItem('N/C', '$', this.props.diaria.credito.nc)}
            //                 {this.renderItem('', '%', this.props.diaria['%vencidoCredito'])}
            //             </div>
            //         </div>
            //     </div>
            // </div>

            <div className="card">
                <div className="card__header">
                    <h6 className="list__item-title">{this.formatDate()}</h6>
                    <input type="checkbox" className="" onChange={this.onItemClicked} />
                </div>
                <div className="card__body">
                    <div className="row">
                        <div className="col-1-of-3">
                            <h6 className="info__header">Disponibilidades</h6>
                            <div className="form__group form__group--inline">
                                <label className="info__subheader col-1-of-4" >Caja</label>
                                <p className="info__value col-1-of-4" >$</p>
                                <p className="info__value col-2-of-4" >{this.formatNumber(this.props.diaria.caja)}</p>
                            </div>
                            <div className="form__group form__group--inline">
                                <label className="info__subheader col-1-of-4" >Bancos</label>
                                <p className="info__value col-1-of-4" >$</p>
                                <p className="info__value col-2-of-4" >{this.formatNumber(this.props.diaria.bancos)}</p>
                            </div>
                            <div className="form__group form__group--inline">
                                <label className="info__subheader col-1-of-4" >Cheques</label>
                                <p className="info__value col-1-of-4" >$</p>
                                <p className="info__value col-2-of-4" >{this.formatNumber(this.props.diaria.cheques)}</p>
                            </div>
                            <div className="form__group form__group--inline">
                                <label className="info__subheader info__subheader--total col-1-of-4" >Total</label>
                                <p className="info__value info__value--total col-1-of-4" >$</p>
                                <p className="info__value info__value--total col-2-of-4" >{this.formatNumber(this.props.diaria.caja + this.props.diaria.bancos + this.props.diaria.cheques)}</p>
                            </div>
                        </div>
                        <div className="col-1-of-3">
                            <h6 className="info__header">Debito</h6>
                            <div className="form__group form__group--inline">
                                <label className="info__subheader col-1-of-4" >Total</label>
                                <p className="info__value col-1-of-4" >$</p>
                                <p className="info__value col-2-of-4" >{this.formatNumber(this.props.diaria.debito.total)}</p>
                            </div>
                            <div className="form__group form__group--inline">
                                <label className="info__subheader col-1-of-4" >Vencido</label>
                                <p className="info__value col-1-of-4" >$</p>
                                <p className="info__value col-2-of-4" >{this.formatNumber(this.props.diaria.debito.vencido)}</p>
                            </div>
                            <div className="form__group form__group--inline">
                                <label className="info__subheader col-1-of-4" >N/C</label>
                                <p className="info__value col-1-of-4" >$</p>
                                <p className="info__value col-2-of-4" >{this.formatNumber(this.props.diaria.debito.nc)}</p>
                            </div>
                            <div className="form__group form__group--inline">
                                <label className="info__subheader info__subheader--total col-1-of-4" ></label>
                                <p className="info__value info__value--total col-1-of-4" >%</p>
                                <p className={`info__value info__value--total col-2-of-4 ${this.formatColor(this.props.diaria['%vencidoDebito'])}`} >{this.formatNumber(this.props.diaria['%vencidoDebito'])}</p>
                            </div>
                        </div>
                        <div className="col-1-of-3">
                            <h6 className="info__header">Credito</h6>
                            <div className="form__group form__group--inline">
                                <label className="info__subheader col-1-of-4" >Total</label>
                                <p className="info__value col-1-of-4" >$</p>
                                <p className="info__value col-2-of-4" >{this.formatNumber(this.props.diaria.credito.total)}</p>
                            </div>
                            <div className="form__group form__group--inline">
                                <label className="info__subheader col-1-of-4" >Vencido</label>
                                <p className="info__value col-1-of-4" >$</p>
                                <p className="info__value col-2-of-4" >{this.formatNumber(this.props.diaria.credito.vencido)}</p>
                            </div>
                            <div className="form__group form__group--inline">
                                <label className="info__subheader col-1-of-4" >N/C</label>
                                <p className="info__value col-1-of-4" >$</p>
                                <p className="info__value col-2-of-4" >{this.formatNumber(this.props.diaria.credito.nc)}</p>
                            </div>
                            <div className="form__group form__group--inline">
                                <label className="info__subheader info__subheader--total col-1-of-4" ></label>
                                <p className="info__value info__value--total col-1-of-4" >%</p>
                                <p className={`info__value info__value--total col-2-of-4 ${this.formatColor(this.props.diaria['%vencidoCredito'])}`} >{this.formatNumber(this.props.diaria['%vencidoCredito'])}</p>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        );
    }

};

export default connect(null, { select })(DiariaListItem);