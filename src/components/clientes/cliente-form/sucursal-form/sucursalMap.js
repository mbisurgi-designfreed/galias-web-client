import React, {Component} from 'react';
import L from 'leaflet';
import {GeoSearchControl, EsriProvider} from 'leaflet-geosearch';

const provider = new EsriProvider();

export default class SucursalMap extends Component {
    map = null;
    marker = null;
    searchControl = null;

    constructor(props) {
        super(props);

        this.searchControl = new GeoSearchControl({
            provider,
            showMarker: true,
            marker: {
                icon: new L.Icon.Default(),
                draggable: true,
            },
            style: 'bar',
            autoClose: true,
            keepResult: true,
            searchLabel: 'Buscar direccion'
        });
    }

    onLocationFound = (e) => {
        if (this.marker) {
            this.marker.remove();
        }

        const lat = e.location.y;
        const lng = e.location.x;
        this.props.setCoords(lat, lng);
    };

    onSearchMarkerMove = (e) => {
        const lat = e.location.lat;
        const lng = e.location.lng;
        this.props.setCoords(lat, lng);
    };

    onMarkerMove = (e) => {
        const {lat, lng} = e.target.getLatLng();
        this.props.setCoords(lat, lng);
    };

    componentDidMount() {
        const {lat, lng} = this.props;

        this.map = L.map('sucursalmap', {
            center: [-26.839895, -65.235839],
            zoom: 16,
            zoomControl: false
        });

        L.tileLayer('https://{s}.basemaps.cartocdn.com/rastertiles/voyager/{z}/{x}/{y}{r}.png', {
            attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors &copy; <a href="https://carto.com/attributions">CARTO</a>',
            maxZoom: 18
        }).addTo(this.map);

        this.map.addControl(this.searchControl);

        this.map.on('geosearch/showlocation', this.onLocationFound);
        this.map.on('geosearch/marker/dragend', this.onSearchMarkerMove);

        if (lat && lng) {
            this.marker = L.marker([lat, lng], {draggable: true})
                .addTo(this.map);

            this.marker.on('dragend', this.onMarkerMove);

            this.map.setView([lat, lng]);
        }
    }

    render() {
        return (
            <div id='sucursalmap' style={{width: '100%', height: '100%'}} />
        )
    }
}
