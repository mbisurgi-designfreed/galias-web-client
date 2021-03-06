import React from 'react';

import notification from '../notification/notification.component';

const Home = () => {
    return (
        <div className="home">
            <div className="home__heading-box">
                <h1 className="home__heading">Galias<br/>Distribuidor Oficial</h1>
                <p className="home__subheading">Sistema integral de gestion comercial</p>
            </div>
        </div>
    );
};

export default notification(Home);