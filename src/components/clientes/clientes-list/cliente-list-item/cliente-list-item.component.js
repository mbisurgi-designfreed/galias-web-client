import React from 'react';
import { Link } from 'react-router-dom';

const ClienteListItem = (props) => {
    const { cliente } = props;

    const renderSync = () => {
        if (cliente.sincronizado) {
            return <i className="fa fa-cloud-upload align-self-center" />;
        }
    }

    return (
        <div className="card mt-1">
            <div className="card-header bg-danger text-white pt-0 pb-0 pl-2 d-flex">
                <Link className="text-white mr-auto" to={`/clientes/${cliente._id}`}>{cliente.razonSocial}</Link>
                {renderSync()}
            </div>
            <div className="card-body pt-0 pb-0">
                <div className="row">
                    <div className="col-md-2">
                        <div className="row">
                            <p className="font-weight-bold m-0" style={{ fontSize: 14 }}>Codigo</p>
                        </div>
                        <div className="row">
                            <p className="m-0" style={{ fontSize: 14 }}>{cliente.codigo}</p>
                        </div>
                    </div>
                    <div className="col-md-4">
                        <div className="row">
                            <p className="font-weight-bold m-0" style={{ fontSize: 14 }}>Email</p>
                        </div>
                        <div className="row">
                            <p className="m-0" style={{ fontSize: 14 }}>{cliente.email}</p>
                        </div>
                    </div>
                    <div className="col-md-6">
                        <div className="row">
                            <p className="font-weight-bold m-0" style={{ fontSize: 14 }}>Direccion</p>
                        </div>
                        <div className="row">
                            <p className="m-0" style={{ fontSize: 14 }}>{`${cliente.direccion.calle} ${cliente.direccion.altura} - ${cliente.direccion.localidad}`}</p>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default ClienteListItem;
