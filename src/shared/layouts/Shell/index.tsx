import * as React from 'react';
import { BrowserRouter, Switch } from 'react-router-dom';

import Home from '../../../components/home/home.component';
import ClientesList from '../../../components/clientes/clientes-list/clientes-list.component';
import { AuthenticatedRoute } from './AuthenticatedRoute';
import { enhanceWithHeader } from '../HeaderNavBar';

const AuthenticatedRoutes = enhanceWithHeader(() => (
    <React.Fragment>
        <AuthenticatedRoute path="/" exact component={Home} />
        <AuthenticatedRoute path="/clientes" exact component={ClientesList} />
    </React.Fragment>
));

export const Shell = (): React.ReactElement<any> => {
    return (
        <BrowserRouter>
            <Switch>
                <AuthenticatedRoutes />
            </Switch>
        </BrowserRouter>
    )
}