import React from 'react';
import { Link } from 'react-router-dom';

const ClienteListItem = (props) => {
    const { cliente } = props;

    const renderField = (label, value) => {
        return (
            <div>
                <div className="row">
                    <p className="font-weight-bold m-0" style={{ fontSize: 14 }}>{label}</p>
                </div>
                <div className="row">
                    <p className="m-0" style={{ fontSize: 14 }}>{value}</p>
                </div>
            </div>
        );
    }

    const renderSync = () => {
        if (cliente.sincronizado) {
            return <i className="fa fa-cloud-upload align-self-center" />;
        }
    }

    return (
        <div className="card mt-1">
            <div className="card-header bg-transparent text-danger pt-0 pb-0 pl-2 d-flex">
                <Link className="text-danger mr-auto" to={`/clientes/${cliente._id}`}>{cliente.razonSocial}</Link>
                {renderSync()}
            </div>
            <div className="card-body pt-0 pb-0">
                <div className="row">
                    <div className="col-md-2">
                        {renderField('Codigo', cliente.codigo)}
                    </div>
                    <div className="col-md-4">
                        {renderField('Email', cliente.email)}
                    </div>
                    <div className="col-md-6">
                        {renderField('Direccion', `${cliente.direccion.calle} ${cliente.direccion.altura} - ${cliente.direccion.localidad}`)}
                    </div>
                </div>
            </div>
        </div>
    );
};

export default ClienteListItem;
