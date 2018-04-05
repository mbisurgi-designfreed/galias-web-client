import React, { Component } from 'react';
import { connect } from 'react-redux';
import { withFormik, Form, Field } from 'formik';
import Loader from 'react-loader';
import Select from 'react-select';
import moment from 'moment';
import numeral from 'numeral';
import Yup from 'yup';
import _ from 'lodash';

import ItemsModal from './items-form/items-modal.component';

import { list } from '../../../actions/cliente.action';
import { pendienteCliente } from '../../../actions/pedido.action';

class RemitoForm extends Component {
  state = {
    clientes: [],
    pendientes: [],
    pedido: null,
    agregados: {},
    items: false
  }

  componentWillMount() {
    this.props.list(1);
  }

  componentWillReceiveProps(newProps) {
    const clientes = _.map(newProps.clientes, (cliente) => {
      return {
        value: cliente._id,
        label: cliente.razonSocial
      };
    });

    const pendientes = _.map(newProps.pendientes, (pendiente) => {
      const fecha = moment(pendiente.fecha).format('DD/MM/YYYY');
      const direccion = `${pendiente.sucursal.calle} - ${pendiente.sucursal.altura}`;

      return {
        value: pendiente,
        label: `${fecha} / ${direccion}`
      };
    });

    this.setState(() => ({ clientes, pendientes }));
  }

  clienteChanged = (cliente) => {
    this.props.setFieldValue('cliente', cliente);

    this.props.pendienteCliente(cliente.value);
  }

  clienteBlur = () => {
    this.props.setFieldTouched('cliente', true);
  }

  pedidoChanged = (pedido) => {
    this.setState(() => ({ pedido: this.props.pendientes[pedido.value._id], agregados: {} }));

    this.props.setFieldValue('pedido', pedido);
  }

  pedidoBlur = () => {
    this.props.setFieldTouched('pedido', true);
  }

  onAgregarClick = () => {
    this.setState(() => ({ items: true }));
  }

  onItemAgregado = (item) => {
    const agregados = this.state.agregados;

    agregados[item._id] = item;

    this.setState(() => ({ agregados }), this.props.setFieldValue('items', agregados));
  }

  onItemBorrado = (item) => {
    const agregados = _.omit(this.state.agregados, item._id);

    this.setState(() => ({ agregados }));
  }

  onCloseModal = () => {
    this.setState(() => ({ pedido: null }));
  }

  renderAgregados = () => {
    const agregados = this.state.agregados;

    return _.map(agregados, (agregado) => {
      return (
        <tr>
          <td>{agregado.articulo.codigo}</td>
          <td>{agregado.articulo.descripcion}</td>
          <td className="text-right">{this.formatNumber(agregado.asignar)}</td>
          <td className="text-right">{this.formatNumber(agregado.articulo.kilos * agregado.asignar)}</td>
        </tr>
      );
    });
  }

  formatNumber = number => numeral(number).format('0,0.00');

  render() {
    return (
      <div>
        <Form className="form mb-xl">
          <div className="row">
            <div className="form-group col-1-of-4">
              <label className="form__label" htmlFor="fecha">Fecha</label>
              <Field className="form__field" id="fecha" type="date" name="fecha" />
              {this.props.touched.fecha && this.props.errors.fecha && (<p className="form__field-error">{this.props.errors.fecha}</p>)}
            </div>
            <div className="form-group col-1-of-4">
              <label className="form__label" htmlFor="cliente">Cliente</label>
              <Select id="cliente" options={this.state.clientes} multi={false} value={this.props.values.cliente} onChange={this.clienteChanged} onBlur={this.clienteBlur} />
              {this.props.touched.cliente && this.props.errors.cliente && (<p className="form__field-error">{this.props.errors.cliente}</p>)}
            </div>
            <div className="form-group col-2-of-4">
              <label className="form__label" htmlFor="pedido">Pedido</label>
              <Select id="pedido" options={this.state.pendientes} multi={false} value={this.props.values.pedido} onChange={this.pedidoChanged} onBlur={this.pedidoBlur} />
              {this.props.touched.pedido && this.props.errors.pedido && (<p className="form__field-error">{this.props.errors.pedido}</p>)}
            </div>
          </div>
          {/* <div className="row">
            <button className="btn-link" onClick={this.onAgregarClick}><i className="fa fa-plus-circle icon-small"></i>agregar items</button>
          </div> */}
          <div className="row">
            <table>
              <col style={{ width: '20%' }} />
              <col style={{ width: '50%' }} />
              <col style={{ width: '15%' }} />
              <col style={{ width: '15%' }} />
              <thead>
                <tr>
                  <th>Codigo</th>
                  <th>Articulo</th>
                  <th>Cantidad</th>
                  <th>Kilos</th>
                </tr>
              </thead>
              <tbody>
                {this.renderAgregados()}
              </tbody>
            </table>
          </div>
          <div className="row">
            <Loader className="spinner mt-medium" loaded={!this.props.loading} color="#ed1c24" scale={0.5}>
              <button className="btn" disabled={this.props.loading}>Generar</button>
            </Loader>
          </div>
        </Form>
        <ItemsModal pedido={this.state.pedido} isOpen={this.state.pedido} onCloseModal={this.onCloseModal} onAgregar={this.onItemAgregado} onEliminar={this.onItemBorrado} />
      </div>
    )
  }
}

const mapPropsToValues = (props) => ({
  fecha: '',
  cliente: '',
  pedido: '',
  items: ''
});

const validationSchema = () => Yup.object().shape({
  fecha: Yup
    .string()
    .required('Fecha es requerido'),
  cliente: Yup
    .string()
    .nullable()
    .required('Cliente es requerido'),
  pedido: Yup
    .string()
    .nullable()
    .required('Pedido es requerido')
});

const onSubmit = (values, { props, resetForm }) => {
  const { fecha, cliente, pedido, items } = values;

  const remito = {
    fecha: moment(fecha).valueOf(),
    pedido: pedido.value._id,
    cliente: cliente.value,
    items: _.map(items, (item) => {
      const ele = {
        item: item._id,
        articulo: item.articulo._id,
        cantidad: parseInt(item.asignar),
        precio: item.precio
      };
    
      return ele;
    }),
    kilos: _.reduce(items, (sum, item) => {
      const sub = parseInt(item.asignar) * item.articulo.kilos;

      return sum + sub;
    }, 0)
  }

  props.accion(remito);
};

const mapStateToProps = (state) => {
  return { clientes: state.cliente.clientes, pendientes: state.pedido.pendientes }
};

export default connect(mapStateToProps, { list, pendienteCliente })(withFormik({
  mapPropsToValues,
  validationSchema,
  handleSubmit: onSubmit
})(RemitoForm));