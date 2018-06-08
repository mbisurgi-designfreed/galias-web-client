import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import Loader from 'react-loader'
import _ from 'lodash';

import { list } from '../../../actions/talonario.action';

import TalonarioListItem from './talonario-list-item/talonario-list-item.component';

class TalonarioList extends Component {
    componentWillMount() {
        this.props.list();
    }

    renderItems() {
        const talonarios = this.props.talonarios;

        return _.map(talonarios, (talonario) => {
            return <TalonarioListItem talonario={talonario} key={talonario._id} />;
        });
    }

    render() {
        return (
            <div className="row">
                <div className="row">
                    <div className="form__icon-container">
                        <Link className="icon-medium" to="/talonarios/new"><i className="fas fa-plus-circle"></i></Link>
                    </div>
                </div>
                <div className="row">
                    <ul className="list list--small">
                        <Loader className="spinner" loaded={!this.props.loading} color="#ed1c24" scale={0.5}>
                            {this.renderItems()}
                        </Loader>
                    </ul>
                </div>
            </div>
        );
    }
}

const mapStateToProps = (state) => {
    return { talonarios: state.talonario.talonarios , loading: state.talonario.loading };
}

export default connect(mapStateToProps, { list })(TalonarioList);
