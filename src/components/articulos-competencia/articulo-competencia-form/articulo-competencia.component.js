import React, { Component } from 'react';
import { connect } from 'react-redux';
import { withFormik, Form, Field } from 'formik';
import Loader from 'react-loader';
import Select from 'react-select';
import Yup from 'yup';

import proveedorSelector from '../../../selectors/proveedor.selector';

class ArticuloCompetenciaForm extends Component {
    state = {
        familias: [],
        grupos: [],
        subgrupos: []
    };

    componentWillMount() {
        const familias = this.props.familias.map((familia) => {
            return {
                value: familia._id,
                label: familia.nombre
            };
        });

        const grupos = this.props.grupos.map((grupo) => {
            return {
                value: grupo._id,
                label: grupo.nombre
            };
        });

        if (this.props.articulo) {
            const grupos = this.props.grupos.filter((grupo) => {
                return grupo.familia === this.props.articulo.familia;
            }).map((grupo) => {
                return {
                    value: grupo._id,
                    label: grupo.nombre
                };
            });


            const subgrupos = this.props.subgrupos.filter((subgrupo) => {
                return subgrupo.grupo === this.props.articulo.grupo;
            }).map((subgrupo) => {
                return {
                    value: subgrupo._id,
                    label: subgrupo.nombre
                };
            });

            this.setState(() => ({ grupos, subgrupos }));
        }

        this.setState(() => ({ familias }));
    };

    componentWillReceiveProps(nextProps) {

    };

    familiaChanged = (familia) => {
        this.props.setFieldValue('familia', familia.value);
        this.props.setFieldValue('grupo', '');
        this.props.setFieldValue('subgrupo', '');

        if (familia) {
            const grupos = this.props.grupos.filter((grupo) => {
                return grupo.familia === familia.value;
            }).map((grupo) => {
                return {
                    value: grupo._id,
                    label: grupo.nombre
                };
            });

            this.setState(() => ({ grupos }));
        }
    };

    familiaBlur = () => {
        this.props.setFieldTouched('familia', true);
    };

    grupoChanged = (grupo) => {
        this.props.setFieldValue('grupo', grupo.value);
        this.props.setFieldValue('subgrupo', '');

        if (grupo) {
            const subgrupos = this.props.subgrupos.filter((subgrupo) => {
                return subgrupo.grupo === grupo.value;
            }).map((subgrupo) => {
                return {
                    value: subgrupo._id,
                    label: subgrupo.nombre
                };
            });

            this.setState(() => ({ subgrupos }));
        }
    };

    grupoBlur = () => {
        this.props.setFieldTouched('grupo', true);
    };

    subgrupoChanged = (subgrupo) => {
        this.props.setFieldValue('subgrupo', subgrupo.value);
    };

    subgrupoBlur = () => {
        this.props.setFieldTouched('subgrupo', true);
    };

    render() {
        return (
            <div>
                <Form className="form mb-xl">
                    <div className="row">
                        <div className="form-group col-1-of-4">
                            <label className="form__label" htmlFor="codigo">Codigo</label>
                            <Field className="form__field" id="codigo" type="text" name="codigo" disabled style={{ cursor: 'auto' }} />
                        </div>
                        <div className="form-group col-2-of-4">
                            <label className="form__label" htmlFor="descripcion">Descripcion</label>
                            <Field className="form__field" id="descripcion" type="text" name="descripcion" />
                            {this.props.touched.descripcion && this.props.errors.descripcion && (<p className="form__field-error">{this.props.errors.descripcion}</p>)}
                        </div>
                    </div>
                    <div className="row">
                        <div className="form-group col-1-of-4">
                            <label className="form__label" htmlFor="grupo">Familia</label>
                            <Select id="familia" options={this.state.familias} multi={false} value={this.props.values.familia} onChange={this.familiaChanged} onBlur={this.familiaBlur} />
                            {this.props.touched.familia && this.props.errors.familia && (<p className="form__field-error">{this.props.errors.familia}</p>)}
                        </div>
                        <div className="form-group col-1-of-4">
                            <label className="form__label" htmlFor="grupo">Grupo</label>
                            <Select id="grupo" options={this.state.grupos} multi={false} value={this.props.values.grupo} onChange={this.grupoChanged} onBlur={this.grupoBlur} />
                            {this.props.touched.grupo && this.props.errors.grupo && (<p className="form__field-error">{this.props.errors.grupo}</p>)}
                        </div>
                        <div className="form-group col-1-of-4">
                            <label className="form__label" htmlFor="subgrupo">Sub Grupo</label>
                            <Select id="subgrupo" options={this.state.subgrupos} multi={false} value={this.props.values.subgrupo} onChange={this.subgrupoChanged} onBlur={this.subgrupoBlur} />
                            {this.props.touched.subgrupo && this.props.errors.subgrupo && (<p className="form__field-error">{this.props.errors.subgrupo}</p>)}
                        </div>
                    </div>
                    <div className="row">
                        <Loader className="spinner mt-medium" loaded={!this.props.loading} color="#ed1c24" scale={0.5}>
                            <button className="btn" disabled={this.props.loading}>{this.props.articulo ? 'Editar' : 'Agregar'}</button>
                        </Loader>
                    </div>
                </Form>
            </div>
        );
    }
}

const mapPropsToValues = ({ articulo }) => {
    return {
        codigo: articulo ? articulo.codigo : '',
        descripcion: articulo ? articulo.descripcion : '',
        proveedor: articulo ? articulo.proveedor : '',
        familia: articulo ? articulo.familia : '',
        grupo: articulo ? articulo.grupo : '',
        subgrupo: articulo ? articulo.subgrupo : ''
    }
};

const validationSchema = () => Yup.object().shape({
    descripcion: Yup
        .string()
        .required('Descripcion es requerido'),
    familia: Yup
        .string()
        .nullable()
        .required('Familia es requerido'),
    grupo: Yup
        .string()
        .nullable()
        .required('Grupo es requerido'),
    subgrupo: Yup
        .string()
        .nullable()
        .required('Subgrupo es requerido')
});

const onSubmit = (values, { props, resetForm }) => {
    const { descripcion } = values;

    const articulo = {
        descripcion,
        familia: values.familia,
        grupo: values.grupo,
        subgrupo: values.subgrupo
    };

    props.accion(articulo);
};

const mapStateToProps = (state) => {
    return { proveedores: proveedorSelector(state.proveedor.proveedores), familias: state.familia, grupos: state.grupo, subgrupos: state.subgrupo, loading: state.articulo.loading }
};

export default connect(mapStateToProps)(withFormik({
    mapPropsToValues,
    validationSchema,
    handleSubmit: onSubmit
})(ArticuloCompetenciaForm));