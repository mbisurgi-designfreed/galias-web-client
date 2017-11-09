import React from 'react';

import notification from '../notification/notification.component';

const Home = () => {
    return (
        <div className="jumbotron mt-5 bg-light ">
            <div className="container">
                <h1 className="display-3 text-dark">Galias - Distribuidor Oficial de Calsa</h1>
                <p className="lead text-danger">Sistema integral de gestion comercial.</p>
            </div>
        </div>
    );
};

export default notification(Home);