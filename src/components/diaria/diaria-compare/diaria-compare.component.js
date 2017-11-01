import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Line, Bar } from 'react-chartjs-2';
import moment from 'moment';
import _ from 'lodash';

class DiariaCompare extends Component {
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
    }

    generateDataDisponibilidades() {
        const infos = _.map(this.props.selected, (info) => {
            return info
        }).sort((a, b) => {
            const fecha1 = new Date(a.fecha);
            const fecha2 = new Date(b.fecha);

            return fecha1 - fecha2;
        });

        const labels = _.map(infos, (info) => {
            return moment(info.fecha).format('DD/MM/YYYY');
        });

        const datasets = [
            this.configData('Caja', '75,192,192', _.map(infos, (info) => info.caja)),
            this.configData('Bancos', '75,60,192', _.map(infos, (info) => info.bancos)),
            this.configData('Cheques', '199,0,57', _.map(infos, (info) => info.cheques))
        ]

        return {
            labels,
            datasets
        };
    }

    generateDataCreditos() {
        const infos = _.map(this.props.selected, (info) => {
            return info
        }).sort((a, b) => {
            const fecha1 = new Date(a.fecha);
            const fecha2 = new Date(b.fecha);

            return fecha1 - fecha2;
        });

        const labels = _.map(infos, (info) => {
            return moment(info.fecha).format('DD/MM/YYYY');
        });

        const datasets = [
            this.configData('Total', '75,192,192', _.map(infos, (info) => info.credito.total)),
            this.configData('Vencido', '75,60,192', _.map(infos, (info) => info.credito.vencido))
        ]

        return {
            labels,
            datasets
        };
    }

    generateDataDeudas() {
        const infos = _.map(this.props.selected, (info) => {
            return info
        }).sort((a, b) => {
            const fecha1 = new Date(a.fecha);
            const fecha2 = new Date(b.fecha);

            return fecha1 - fecha2;
        });

        const labels = _.map(infos, (info) => {
            return moment(info.fecha).format('DD/MM/YYYY');
        });

        const datasets = [
            this.configData('Total', '75,192,192', _.map(infos, (info) => info.debito.total)),
            this.configData('Vencido', '75,60,192', _.map(infos, (info) => info.debito.vencido))
        ]

        return {
            labels,
            datasets
        };
    }

    render() {
        return (
            <div className="mt-3">
                <div id="carouselExampleControls" className="carousel slide" data-ride="carousel">
                    <div className="carousel-inner">
                        <div className="carousel-item active">
                            <Line data={this.generateDataDisponibilidades()} options={{ title: { display: true, text: 'Disponibilidades' } }} legend={{ position: 'bottom' }} />
                        </div>
                        <div className="carousel-item">
                            <Bar data={this.generateDataCreditos()} options={{ title: { display: true, text: 'Creditos' } }} legend={{ position: 'bottom' }} />
                        </div>
                        <div className="carousel-item">
                            <Bar data={this.generateDataDeudas()} options={{ title: { display: true, text: 'Deudas' } }} legend={{ position: 'bottom' }} />
                        </div>
                    </div>
                    <a className="carousel-control-prev" href="#carouselExampleControls" role="button" data-slide="prev">
                        <span className="carousel-control-prev-icon" aria-hidden="true"></span>
                    </a>
                    <a className="carousel-control-next" href="#carouselExampleControls" role="button" data-slide="next">
                        <span className="carousel-control-next-icon" aria-hidden="true"></span>
                    </a>
                </div>
            </div>
        );
    }
}

const mapStateToProps = (state) => {
    return { selected: state.selectedInfo };
}

export default connect(mapStateToProps)(DiariaCompare);