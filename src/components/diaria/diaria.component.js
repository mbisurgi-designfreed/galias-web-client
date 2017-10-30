import React, { Component } from 'react';
import { Link } from 'react-router-dom';

class Diaria extends Component {
    render() {
        return (
            <div className="mt-3">
                <Link className="text-danger float-right" to="/diaria/new"><i className="fa fa-plus-circle fa-2x"></i></Link>
                <h2>Diaria Component</h2>
            </div>
        )
    }
}

export default Diaria;
