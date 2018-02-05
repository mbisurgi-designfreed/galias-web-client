import React, { Component } from 'react';
import { StandaloneSearchBox } from 'react-google-maps/lib/components/places/StandaloneSearchBox';

class SearchPlace extends Component {
    state = {
        places: [],
        ref: undefined
    }

    onSearchBoxMounted = (ref) => {
        this.setState(() => ({ ref }));
    }

    onPlaceChanged = () => {
        const address = this.state.ref.getPlaces()[0];

        if (address === undefined) {
            this.props.placeChanged(undefined);
        } else {
            const calle = this.getAddressComponent(address.address_components, 'route');
            const altura = this.getAddressComponent(address.address_components, 'street_number');
            const localidad = this.getAddressComponent(address.address_components, 'locality');
            const codigoPostal = this.getAddressComponent(address.address_components, 'postal_code');
            const lat = (address.geometry.location.lat());
            const lng = (address.geometry.location.lng());

            const place = {
                calle: calle ? calle.long_name : '',
                altura: altura ? altura.long_name : '',
                localidad: localidad ? localidad.long_name : '',
                codigoPostal: codigoPostal ? codigoPostal.long_name : '',
                ubicacion: { lat, lng }
            };

            this.props.placeChanged(place);
        }
    }

    getAddressComponent = (addressComponents, component) => {
        return addressComponents.find((addressComponent) => {
            return addressComponent.types.find((type) => {
                return type === component;
            });
        });
    };

    render() {
        return (
            <StandaloneSearchBox ref={this.onSearchBoxMounted} onPlacesChanged={this.onPlaceChanged} style={{ width: '100%' }} >
                <input className="search-place" type="text" placeholder="Ingrese una direccion" />
            </StandaloneSearchBox>
        )
    }
}

export default SearchPlace;