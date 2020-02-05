import React, {Component} from 'react';
import { SketchPicker } from 'react-color';
import Select from "react-select";
import {Field} from "formik";

export default class ZonaForm extends Component {
    constructor(props) {
        super(props);

        this.state = {
            color: this.props.color || '#000',
            showColorPicker: false
        };
    }

    onVendedorChange = () => {

    };

    render() {
        const vendedoresOptions = this.props.vendedores.map(v => ({
            value: v._id,
            label: `${v.nombre} ${v.apellido}`
        }));

        return (
            <div className='zona_form'>
                <label className="form__label" htmlFor="descripcion">Descripcion</label>
                <input className="form__field" id="descripcion" type="text" name="descripcion" />
                <label className="form__label" htmlFor="vendedor">Vendedor</label>
                <Select id="vendedor" options={vendedoresOptions} multi={false} value={''} onChange={this.onVendedorChange} />
                <div className='ColorPicker'>
                    <div
                        className='colorSample'
                        style={{ backgroundColor: this.state.color }}
                        onMouseDown={() => {
                            let showColorPicker = !this.state.showColorPicker;
                            this.setState({ showColorPicker });
                        }}
                    />
                    {this.state.showColorPicker && (
                        <div className='colorPopout'>
                            <SketchPicker
                                color={this.state.color}
                                onChange={(c) => {
                                    this.setState({color: c.hex})
                                }}
                                onChangeComplete={(c) => {
                                    this.setState({ showColorPicker: false });
                                    this.setState({color: c.hex})
                                }}
                            />
                        </div>
                    )}
                </div>
            </div>
        )
    }
}
