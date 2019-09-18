import React, { Component } from 'react';
import L from 'leaflet';
import axios from "axios";

class Map extends Component {
    map = null;

    async componentDidMount() {
        this.map = L.map('map').setView([-26.839895, -65.235839], 15);

        L.tileLayer('https://{s}.basemaps.cartocdn.com/rastertiles/voyager/{z}/{x}/{y}{r}.png', {
            attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors &copy; <a href="https://carto.com/attributions">CARTO</a>',
            maxZoom: 18
        }).addTo(this.map);

        let icon = L.divIcon({className: 'depo-div-icon'});
        let deposito = L.marker([-26.839895, -65.23583], {icon}).addTo(this.map);

        await this.fetchClientes
    }

    fetchClientes = async () => {
        const API_URL = process.env.REACT_APP_API_URL;
        const URL = `${API_URL}/api/cliente/list`;

        let res = await axios.get(URL);
        let clientes = res.data;
        console.log('clientes', clientes);

        let iconCalsa = L.divIcon({className: 'calsa-div-icon'});
        let iconNoCalsa = L.divIcon({className: 'no-calsa-div-icon'});

        clientes.forEach(cliente => {
            if (cliente.direccion.geometry) {
                let coords = cliente.direccion.geometry.coordinates;

                if (cliente.division === 'calsa') {
                    L.marker([coords[1], coords[0]], {iconCalsa}).addTo(this.map);
                }

                if (cliente.division === 'no calsa') {
                    L.marker([coords[1], coords[0]], {iconNoCalsa}).addTo(this.map);
                }
            }
        });
    };

    render() {
        return (
            <div id='map' style={{ height: '100vh' }} />
        )
    }
}

export default Map;


