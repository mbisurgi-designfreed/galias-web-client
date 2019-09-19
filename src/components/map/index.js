import React, { Component } from 'react';
import L from 'leaflet';
import axios from "axios";
import 'leaflet.markercluster';
import 'leaflet.markercluster.freezable';
import 'leaflet.markercluster.layersupport';

class Map extends Component {
    map = null;
    clusters = null;

    constructor(props) {
        super(props);

        this.state = {
            enableClusters: true
        }
    }

    async componentDidMount() {
        this.map = L.map('map').setView([-26.839895, -65.235839], 15);

        L.tileLayer('https://{s}.basemaps.cartocdn.com/rastertiles/voyager/{z}/{x}/{y}{r}.png', {
            attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors &copy; <a href="https://carto.com/attributions">CARTO</a>',
            maxZoom: 18
        }).addTo(this.map);

        let greenIcon = L.icon({
            iconUrl: '/images/galias.png',
            iconSize:     [25, 35], // size of the icon
            iconAnchor:   [15, 25], // point of the icon which will correspond to marker's location
        });

        let icon = L.divIcon({className: 'depo-div-icon'});
        let deposito = L.marker([-26.839895, -65.23583], {icon: greenIcon}).addTo(this.map);

        await this.fetchClientes()
    }

    componentDidUpdate() {
        if (this.clusters && this.state.enableClusters) {
            this.clusters.enableClustering();
        }

        if (this.clusters && !this.state.enableClusters) {
            this.clusters.disableClustering();
        }
    }

    fetchClientes = async () => {
        const API_URL = process.env.REACT_APP_API_URL;
        const URL = `${API_URL}/api/cliente/list`;

        let res = await axios.get(URL);
        let clientes = res.data.clientes;

        let iconCalsa = L.divIcon({className: 'calsa-div-icon'});
        let iconNoCalsa = L.divIcon({className: 'no-calsa-div-icon'});

        this.clusters = L.markerClusterGroup.layerSupport().addTo(this.map);

        let layerCalsa = L.layerGroup();
        let layerNoCalsa = L.layerGroup();

        clientes.forEach(cliente => {
            if (cliente.sucursales) {
                cliente.sucursales.forEach(sucursal => {
                    if (sucursal.geometry) {
                        let coords = sucursal.geometry.coordinates;

                        if (cliente.division === 'calsa') {
                            layerCalsa.addLayer(L.marker([coords[1], coords[0]], {icon: iconCalsa}));
                            //markers.addLayer(L.marker([coords[1], coords[0]], {icon: iconCalsa}));
                            //L.marker([coords[1], coords[0]], {icon: iconCalsa}).addTo(this.map);
                        }

                        if (cliente.division === 'no calsa') {
                            layerNoCalsa.addLayer(L.marker([coords[1], coords[0]], {icon: iconNoCalsa}));
                            //markers.addLayer(L.marker([coords[1], coords[0]], {icon: iconNoCalsa}));
                            //L.marker([coords[1], coords[0]], {icon: iconNoCalsa}).addTo(this.map);
                        }
                    }
                })
            }

            // if (cliente.direccion.geometry) {
            //     let coords = cliente.direccion.geometry.coordinates;
            //
            //     if (cliente.division === 'calsa') {
            //         layerCalsa.addLayer(L.marker([coords[1], coords[0]], {icon: iconCalsa}));
            //         //markers.addLayer(L.marker([coords[1], coords[0]], {icon: iconCalsa}));
            //         //L.marker([coords[1], coords[0]], {icon: iconCalsa}).addTo(this.map);
            //     }
            //
            //     if (cliente.division === 'no calsa') {
            //         layerNoCalsa.addLayer(L.marker([coords[1], coords[0]], {icon: iconNoCalsa}));
            //         //markers.addLayer(L.marker([coords[1], coords[0]], {icon: iconNoCalsa}));
            //         //L.marker([coords[1], coords[0]], {icon: iconNoCalsa}).addTo(this.map);
            //     }
            // }
        });

        this.clusters.checkIn([layerCalsa, layerNoCalsa]);

        let overlays = {
          'Calsa': layerCalsa,
          'Consumo Masivo': layerNoCalsa
        };

        L.control.layers(null, overlays).addTo(this.map);
    };

    render() {
        return (
            <div style={{position: 'relative'}}>
                <div id='map' style={{ height: '100vh' }} />
                <input
                    type='checkbox'
                    className='map-checkbox'
                    checked={this.state.enableClusters}
                    onChange={e => this.setState({enableClusters: !this.state.enableClusters})}
                />
            </div>
        )
    }
}

export default Map;


