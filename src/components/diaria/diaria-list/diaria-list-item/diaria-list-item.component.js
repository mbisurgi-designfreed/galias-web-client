import React from 'react';
import moment from 'moment';
import numeral from 'numeral';

const DiariaListItem = (props) => {
    const { diaria } = props;

    const formatNumber = (number) => {
        return numeral(number).format('$ 0,0.00');
    };

    return (
        <div className="card mt-3">
            <div className="card-header bg-danger text-white pt-0 pb-0 pl-2">{moment(diaria.fecha).format('DD/MM/YYYY')}</div>
            <div className="card-body p-2">
                <div className="row">
                    <div className="col-md-4">
                        <h6 className="text-danger text-center font-weight-bold">Disponibilidades</h6>
                        <div className="row">
                            <div className="col-md-4 text-secondary ">
                                <span>Caja</span>
                            </div>
                            <div className="col-md-8 text-right">
                                <p>{formatNumber(diaria.caja)}</p>
                            </div>
                        </div>
                        <div className="row">
                            <div className="col-md-4 text-secondary">
                                <span>Bancos</span>
                            </div>
                            <div className="col-md-8 text-right">
                                <p>{formatNumber(diaria.bancos)}</p>
                            </div>
                        </div>
                        <div className="row">
                            <div className="col-md-4 text-secondary">
                                <span>Cheques</span>
                            </div>
                            <div className="col-md-8 text-right">
                                <p>{formatNumber(diaria.cheques)}</p>
                            </div>
                        </div>
                    </div>
                    <div className="col-md-4">
                        <h6 className="text-danger text-center font-weight-bold">Credito</h6>
                        <div className="row">
                            <div className="col-md-4 text-secondary ">
                                <span>Total</span>
                            </div>
                            <div className="col-md-8 text-right">
                                <p>{formatNumber(diaria.credito.total)}</p>
                            </div>
                        </div>
                        <div className="row">
                            <div className="col-md-4 text-secondary">
                                <span>Vencido</span>
                            </div>
                            <div className="col-md-8 text-right">
                                <p>{formatNumber(diaria.credito.vencido)}</p>
                            </div>
                        </div>
                    </div>
                    <div className="col-md-4">
                        <h6 className="text-danger text-center font-weight-bold">Debito</h6>
                        <div className="row">
                            <div className="col-md-4 text-secondary ">
                                <span>Total</span>
                            </div>
                            <div className="col-md-8 text-right">
                                <p>{formatNumber(diaria.debito.total)}</p>
                            </div>
                        </div>
                        <div className="row">
                            <div className="col-md-4 text-secondary">
                                <span>Vencido</span>
                            </div>
                            <div className="col-md-8 text-right">
                                <p>{formatNumber(diaria.debito.vencido)}</p>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default DiariaListItem;