import * as React from 'react';
import { BrowserRouter, Switch, Route } from 'react-router-dom';

import Home from '../../../components/home/home.component';
import { AuthenticatedRoute } from './AuthenticatedRoute';
import {Login} from "../../../Login";

export const Shell = (): React.ReactElement<any> => {
    return (
        <BrowserRouter>
            <Switch>
                <Route path="/login" exact component={Login} />
            </Switch>
        </BrowserRouter>
    )
};
