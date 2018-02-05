import React, { Component } from 'react';
import { withGoogleMap, GoogleMap, Marker } from 'react-google-maps';

class Map extends Component {
    render() {
        const loc = this.props.ubicacion;

        return (
            <div>
                <GoogleMap defaultZoom={16} defaultCenter={{ lat: loc.lat, lng: loc.lng }} >
                    <Marker position={{ lat: loc.lat, lng: loc.lng }} />
                </GoogleMap>
            </div>
        )
    }
}

export default withGoogleMap(Map);