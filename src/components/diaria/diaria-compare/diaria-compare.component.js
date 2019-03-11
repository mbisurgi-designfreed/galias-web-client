import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Line, Bar } from 'react-chartjs-2';
import { Carousel } from 'react-responsive-carousel';
import moment from 'moment';
import numeral from 'numeral';
import _ from 'lodash';

import notification from '../../notification/notification.component';

class DiariaCompare extends Component {
    scales = {
        yAxes: [{
            ticks: {
                callback: function (label, index, labels) {
                    return numeral(label).format('0,0.00');
                }
            }
        }]
    };

    tooltips = {
        callbacks: {
            label: function (label, data) {
                return numeral(label.yLabel).format('0,0.00');
            }
        }
    };

    sortInfo() {
        return _.map(this.props.selected, (info) => {
            return info
        }).sort((a, b) => {
            const fecha1 = new Date(a.fecha);
            const fecha2 = new Date(b.fecha);

            return fecha1 - fecha2;
        });
    }

    configData(label, color, data) {
        return {
            label,
            fill: false,
            lineTension: 0.1,
            backgroundColor: `rgba(${color},0.4)`,
            borderColor: `rgba(${color},1)`,
            borderCapStyle: 'butt',
            borderDash: [],
            borderDashOffset: 0.0,
            borderJoinStyle: 'miter',
            pointBorderColor: `rgba(${color},1)`,
            pointBackgroundColor: `rgba(${color},1)`,
            pointBorderWidth: 1,
            pointHoverRadius: 5,
            pointHoverBackgroundColor: `rgba(${color},1)`,
            pointHoverBorderColor: 'rgba(220,220,220,1)',
            pointHoverBorderWidth: 2,
            pointRadius: 3,
            pointHitRadius: 10,
            data
        }
    };

    generateDataDisponibilidades() {
        const infos = this.sortInfo();

        const labels = _.map(infos, (info) => {
            return moment(info.fecha).format('DD/MM/YYYY');
        });

        const datasets = [
            this.configData('CJA', '231,76,60', _.map(infos, (info) => info.caja)),
            this.configData('BCO', '39,174,96', _.map(infos, (info) => info.bancos)),
            this.configData('CHQ', '241,196,15', _.map(infos, (info) => info.cheques)),
            this.configData('TOT', '41,128,185', _.map(infos, (info) => info.caja + info.bancos + info.cheques))
        ];

        return {
            labels,
            datasets
        };
    }

    generateDataCreditos() {
        const infos = this.sortInfo();

        const labels = _.map(infos, (info) => {
            return moment(info.fecha).format('DD/MM/YYYY');
        });

        const datasets = [
            this.configData('TOT', '39,174,96', _.map(infos, (info) => info.credito.total)),
            this.configData('VEN', '231,76,60', _.map(infos, (info) => info.credito.vencido)),
            this.configData('CHQ', '241,196,15', _.map(infos, (info) => info.cheques))
        ];

        return {
            labels,
            datasets
        };
    }

    generateDataDeudas() {
        const infos = this.sortInfo();

        const labels = _.map(infos, (info) => {
            return moment(info.fecha).format('DD/MM/YYYY');
        });

        const datasets = [
            this.configData('TOT', '39,174,96', _.map(infos, (info) => info.debito.total - info.debito.nc)),
            this.configData('VEN', '231,76,60', _.map(infos, (info) => info.debito.vencido - info.debito.nc))
        ];

        return {
            labels,
            datasets
        };
    }

    generateDataPorce() {
        const infos = this.sortInfo();

        const labels = _.map(infos, (info) => {
            return moment(info.fecha).format('DD/MM/YYYY');
        });

        const datasets = [
            this.configData('% CRE', '39,174,96', _.map(infos, (info) => info['%vencidoCredito'])),
            this.configData('% DEB', '231,76,60', _.map(infos, (info) => info['%vencidoDebito']))
        ];

        return {
            labels,
            datasets
        };
    }

    render() {
        return (
            <div className="graphics mt-sm">
                <div className="row">
                    <div className="col-1-of-2">
                        <Line data={this.generateDataDisponibilidades()} options={{ title: { display: true, text: 'Disponibilidades' }, scales: this.scales, tooltips: this.tooltips }} legend={{ position: 'bottom' }} />
                    </div>
                    <div className="col-1-of-2">
                        <Bar data={this.generateDataCreditos()} options={{ title: { display: true, text: 'Creditos' }, scales: this.scales, tooltips: this.tooltips }} legend={{ position: 'bottom' }} />
                    </div>
                </div>
                <div className="row">
                    <div className="col-1-of-2">
                        <Bar data={this.generateDataDeudas()} options={{ title: { display: true, text: 'Deudas' }, scales: this.scales, tooltips: this.tooltips }} legend={{ position: 'bottom' }} />
                    </div>
                    <div className="col-1-of-2">
                        <Line data={this.generateDataPorce()} options={{ title: { display: true, text: '% Vencido' }, scales: this.scales, tooltips: this.tooltips }} legend={{ position: 'bottom' }} />
                    </div>
                </div>
            </div>
        );
    }
}

const mapStateToProps = (state) => {
    return { selected: state.selectedInfo };
}

export default connect(mapStateToProps)(notification(DiariaCompare));