import React, {Component} from 'react';
import axios from 'axios';
import L from 'leaflet';
import '@geoman-io/leaflet-geoman-free';
import '@geoman-io/leaflet-geoman-free/dist/leaflet-geoman.css';

import ZonaForm from "./ZonaForm";

const API_URL = process.env.REACT_APP_API_URL;

export default class Zonas extends Component {
    map = null;

    constructor(props) {
        super(props);
        this.state = {
            new: false,
            zonas: [],
            vendedores: []
        }
    }

    async componentDidMount() {
        this.map = L.map('zonamap', {
            center: [-26.839895, -65.235839],
            zoom: 16,
            zoomControl: false
        });

        L.tileLayer('https://{s}.basemaps.cartocdn.com/rastertiles/voyager/{z}/{x}/{y}{r}.png', {
            attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors &copy; <a href="https://carto.com/attributions">CARTO</a>',
            maxZoom: 18
        }).addTo(this.map);

        let greenIcon = L.icon({
            iconUrl: '/images/galias.png',
            iconSize: [25, 35], // size of the icon
            iconAnchor: [15, 25], // point of the icon which will correspond to marker's location
        });

        L.marker([-26.839895, -65.23583], {icon: greenIcon})
            .addTo(this.map);

        this.map.pm.addControls({
            position: 'topleft',
            drawMarker: false,
            drawCircleMarker: false,
            drawPolyline: false,
            drawRectangle: false,
            drawCircle: false,
            dragMode: false,
            cutPolygon: false
        });

        await this.fetchVendedores();
        this.fetchZonas();
    }

    fetchVendedores = async () => {
        const URL = `${API_URL}/api/vendedor/list?page=0`;
        const res = await axios.get(URL);

        if (res) {
            this.setState({vendedores: res.data.vendedores});
        }
    };

    fetchZonas = () => {

    };

    newZona = () => {
        this.setState({new: true});
    };

    render() {
        return (
            <div style={{position: 'relative'}} className='zonas'>
                <div className='zonas_sidebar'>
                    <div className='titulo'>Zonas</div>
                    {this.state.new && <ZonaForm vendedores={this.state.vendedores} />}
                    <div>
                        Listado de Zonas
                    </div>
                    <button className="btn" onClick={this.newZona}>Agregar Zona</button>
                </div>
                <div id='zonamap' style={{height: '100%', width: '100%'}}/>
            </div>
        )
    }
}


