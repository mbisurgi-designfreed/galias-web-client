import React, { Component } from 'react';
import { Accordion, AccordionItem, AccordionItemTitle, AccordionItemBody } from 'react-accessible-accordion';
import { Link, Route, Switch } from 'react-router-dom';

import authenticateRoute from '../auth/authenticate-route/authenticate-route.component';

import ReportesPendientesClientes from './pendientes/reportes-pendientes-clientes.component';
import ReportesPendientesArticulos from './pendientes/reportes-pendientes-articulos.component';

class Reportes extends Component {
    render() {
        return (
            <div style={{ height: '100vh', display: 'flex' }}>
                <div style={{ width: '15%', margin: 5 }}>
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