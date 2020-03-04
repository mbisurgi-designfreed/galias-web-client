import * as React from 'react';
import * as L from 'leaflet';
import 'leaflet.markercluster';
import 'leaflet.markercluster.freezable';
import 'leaflet.markercluster.layersupport';
import 'leaflet-groupedlayercontrol';

import { Cliente } from '../types';

import { FilterPanel } from './FilterPanel';

import ClientesService from '../services/clientes';

interface MapState {
  filters: any;
  clientes: Array<Cliente>;
}

export class Map extends React.Component<any, MapState> {
  map = null;
  clusters = null;

  constructor(props) {
    super(props);

    this.state = {
      clientes: [],
      filters: {
        unidad: ['calsa', 'no calsa'],
        clasificacion: ['a', 'b', 'c']
      }
    };
  }

  async componentDidMount() {
    this.map = L.map('map').setView([-26.839895, -65.235839], 15);

    L.tileLayer('https://{s}.basemaps.cartocdn.com/rastertiles/voyager/{z}/{x}/{y}{r}.png', {
      attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors &copy; <a href="https://carto.com/attributions">CARTO</a>',
      maxZoom: 18
    }).addTo(this.map);

    let icon = L.icon({
      iconUrl: '/images/galias.png',
      iconSize: [25, 35],
      iconAnchor: [15, 25]
    });

    L.marker([-26.839895, -65.23583], { icon: icon })
      .addTo(this.map);

    this.clusters = (L as any).markerClusterGroup().addTo(this.map);

    await this.fetchClientes();
  }

  fetchClientes = async () => {
    const clientes: any = await ClientesService.getClientes();

    this.setState({
      clientes: clientes.clientes
    });
  };

  componentDidUpdate() {
    this.renderClientes();
  }

  renderClientes = () => {
    this.clusters.clearLayers();

    const { clientes } = this.state;

    let icons = {
      'calsa': L.divIcon({ className: 'calsa-div-icon' }),
      'no calsa': L.divIcon({ className: 'no-calsa-div-icon' })
    };

    const filteredClientes = this.filterClientes(clientes);

    filteredClientes.forEach(cliente => {
      if (cliente.sucursales) {
        cliente.sucursales.forEach(sucursal => {
          if (sucursal.geometry && sucursal.geometry.coordinates) {
            let coords = sucursal.geometry.coordinates;
            let point = L.marker([coords[1], coords[0]], { icon: icons[cliente.division] })
              .bindPopup(`
                                                <div>
                                                    <p>${cliente.razonSocial}</p>
                                                    <span>${sucursal.calle} ${sucursal.altura}</span>
                                                </div>
                                        `);

            this.clusters.addLayer(point);
          }
        });
      }
    });
  };

  filterClientes = (clientes: Array<Cliente>): Array<Cliente> => {
    const { filters } = this.state;

    const filter = clientes.filter(cliente => {
      let unidad = false;
      let clasificacion = false;
      if (filters.unidad.includes(cliente.division)) unidad = true;
      if (filters.clasificacion.includes(cliente.clasificacion)) clasificacion = true;

      return unidad && clasificacion;
    });

    return filter;
  };

  applyFilters = (filters) => {
    this.setState({
      filters
    });
  };

  render() {
    const { filters } = this.state;

    return (
      <div className='Map'>
        <div id='map' style={{ height: '100%' }}/>
        <FilterPanel filters={filters} onApplyFilters={this.applyFilters}/>
      </div>
    );
  }
}
