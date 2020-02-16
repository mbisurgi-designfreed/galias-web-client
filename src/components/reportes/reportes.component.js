import React, { Component } from 'react';
import { Accordion, AccordionItem, AccordionItemTitle, AccordionItemBody } from 'react-accessible-accordion';
import { Link, Route, Switch } from 'react-router-dom';
import readXlsxFile from 'read-excel-file';
import axios from 'axios';

import authenticateRoute from '../auth/authenticate-route/authenticate-route.component';

import ReportesPendientesClientes from './pendientes/reportes-pendientes-clientes.component';
import ReportesPendientesArticulos from './pendientes/reportes-pendientes-articulos.component';

const schema = {
    'FECHA_CONT': {
        prop: 'fecha',
        type: Date
    },
    'T_COMP': {
        prop: 'tipo',
        type: String
    },
    'N_COMP': {
        prop: 'comprobante',
        type: String
    },
    'COD_VENDED': {
        prop: 'codigoVendedor',
        type: String
    },
    'NOMBRE_VEN': {
        prop: 'vendedor',
        type: String
    },
    'COD_CLIENT': {
        prop: 'codigoCliente',
        type: String
    },
    'RAZON_SOCI': {
        prop: 'razonSocial',
        type: String
    },
    'COD_ARTICU': {
        prop: 'codigoArticulo',
        type: String
    },
    'DES_ARTICU': {
        prop: 'descripcion',
        type: String
    },
    'CANTIDAD': {
        prop: 'cantidad',
        type: Number
    },
    'PRECIO_NET': {
        prop: 'precio',
        type: Number
    },
    'UNIDAD_MED': {
        prop: 'unidad',
        type: String
    }
};

class Reportes extends Component {
    state = {
        loading: false
    }

    handleFile = async (e) => {
        this.setState({ loading: true });
        const file = e.target.files[0];

        try {
            const rows = await readXlsxFile(file, { schema });

            await axios.post('http://localhost:4000/api/files/ventas', rows);
            this.setState({ loading: false });
        } catch (err) {
            this.setState({ loading: false });
        }
    }

    render() {
        return (
            <div style={{ display: 'flex' }}>
                <div style={{ width: '15%', margin: 5 }}>
                    <p>
                        Importar ventas
                    </p>
                    <input type='file' onChange={this.handleFile} />
                    {this.state.loading && (
                        <p>
                            Cargando...
                        </p>
                    )}
                    <Accordion>
                        <AccordionItem>
                            <AccordionItemTitle>
                                <h4>Pendientes</h4>
                            </AccordionItemTitle>
                            <AccordionItemBody>
                                <ul className="navbar__nav">
                                    <li style={{ fontSize: 14 }} className="navbar__item navbar__item--side" >
                                        <Link to="/reportes/pendientes/clientes">Cliente</Link>
                                    </li>
                                    <li style={{ fontSize: 14 }} className="navbar__item navbar__item--side" >
                                        <Link to="/reportes/pendientes/articulos">Articulo</Link>
                                    </li>
                                </ul>
                            </AccordionItemBody>
                        </AccordionItem>
                        <AccordionItem>
                            <AccordionItemTitle>
                                <h4>Pedidos</h4>
                            </AccordionItemTitle>
                            <AccordionItemBody>
                                <ul className="navbar__nav">
                                    <li style={{ fontSize: 14 }} className="navbar__item navbar__item--side" >
                                        <Link to="/reportes/pendientes/clientes">Cliente</Link>
                                    </li>
                                    <li style={{ fontSize: 14 }} className="navbar__item navbar__item--side" >
                                        <Link to="/reportes/pendientes/articulos">Articulo</Link>
                                    </li>
                                </ul>
                            </AccordionItemBody>
                        </AccordionItem>
                    </Accordion>
                </div>
                <div style={{ width: '85%', margin: 5 }}>
                    <Switch>
                        <Route path="/reportes/pendientes/clientes" component={authenticateRoute(ReportesPendientesClientes)} />
                        <Route path="/reportes/pendientes/articulos" component={authenticateRoute(ReportesPendientesArticulos)} />
                    </Switch>
                </div>
            </div>
            // <div className="row">
            //     <ul className="navbar__nav">
            //         <li style={{ fontSize: 14 }} className="navbar__item" >
            //             <Link to="/reportes/pendientes/clientes">Pendientes por cliente</Link>
            //         </li>
            //         <li style={{ fontSize: 14 }} className="navbar__item" >
            //             <Link to="/reportes/pendientes/articulos">Pendientes por articulo</Link>
            //         </li>
            //     </ul>
            //     <Switch>
            //         <Route path="/reportes/pendientes/clientes" component={authenticateRoute(ReportesPendientesClientes)} />
            //     </Switch>
            // </div>
        )
    }
}

export default Reportes;
