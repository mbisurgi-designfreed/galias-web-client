import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Line } from 'react-chartjs-2';
import moment from 'moment';
import _ from 'lodash';

class DiariaCompare extends Component {
    generateData() {
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
            {
                label: 'Caja',
                fill: false,
                lineTension: 0.1,
                backgroundColor: 'rgba(75,192,192,0.4)',
                borderColor: 'rgba(75,192,192,1)',
                borderCapStyle: 'butt',
                borderDash: [],
                borderDashOffset: 0.0,
                borderJoinStyle: 'miter',
                pointBorderColor: 'rgba(75,192,192,1)',
                pointBackgroundColor: 'rgba(75,192,192,1)',
                pointBorderWidth: 1,
                pointHoverRadius: 5,
                pointHoverBackgroundColor: 'rgba(75,192,192,1)',
                pointHoverBorderColor: 'rgba(220,220,220,1)',
                pointHoverBorderWidth: 2,
                pointRadius: 3,
                pointHitRadius: 10,
                data: _.map(infos, (info) => info.caja)
            },
            {
                label: 'Bancos',
                fill: false,
                lineTension: 0.1,
                backgroundColor: 'rgba(75,60,192,0.4)',
                borderColor: 'rgba(75,60,192,1)',
                borderCapStyle: 'butt',
                borderDash: [],
                borderDashOffset: 0.0,
                borderJoinStyle: 'miter',
                pointBorderColor: 'rgba(75,60,192,1)',
                pointBackgroundColor: 'rgba(75,60,192,1)',
                pointBorderWidth: 1,
                pointHoverRadius: 5,
                pointHoverBackgroundColor: 'rgba(75,60,192,1)',
                pointHoverBorderColor: 'rgba(220,220,220,1)',
                pointHoverBorderWidth: 2,
                pointRadius: 3,
                pointHitRadius: 10,
                data: _.map(infos, (info) => info.bancos)
            },
            {
                label: 'Cheques',
                fill: false,
                lineTension: 0.1,
                backgroundColor: 'rgba(199,0,57,0.4)',
                borderColor: 'rgba(199,0,57,1)',
                borderCapStyle: 'butt',
                borderDash: [],
                borderDashOffset: 0.0,
                borderJoinStyle: 'miter',
                pointBorderColor: 'rgba(199,0,57,1)',
                pointBackgroundColor: 'rgba(199,0,57,1)',
                pointBorderWidth: 1,
                pointHoverRadius: 5,
                pointHoverBackgroundColor: 'rgba(199,0,57,1)',
                pointHoverBorderColor: 'rgba(220,220,220,1)',
                pointHoverBorderWidth: 2,
                pointRadius: 3,
                pointHitRadius: 10,
                data: _.map(infos, (info) => info.cheques)
            }
        ]

        const data = {
            labels,
            datasets
        }

        return data;
    }

    render() {
        this.generateData();
        return (
            <div>
                <Line data={this.generateData()} />
            </div>
        );
    }
}

const mapStateToProps = (state) => {
    return { selected: state.selectedInfo };
}

export default connect(mapStateToProps)(DiariaCompare);