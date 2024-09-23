import { Dialog, DialogTitle, DialogContent, TextField, Button, DialogActions, Grid, MenuItem } from '@mui/material';
import { Formik, Form, Field } from 'formik';
import * as Yup from 'yup';
import PropTypes from 'prop-types';
import { departamentoMunicipio } from "../../data/departamentoMunicipo";
import { useEffect, useState } from 'react';


// Esquema de validación con Yup
const validationSchema = Yup.object({
  nombre: Yup.string().required('El nombre es obligatorio'),
  apellido: Yup.string().required('El apellido es obligatorio'),
  telefono: Yup.string()
    .matches(/^[0-9]{8}$/, 'Debe ser un número válido y 8 digitos')
    .required('El teléfono es obligatorio'),
  departamento: Yup.string().required('El departamento es obligatorio'),
  municipio: Yup.string().required('El municipio es obligatorio'),
  complemento_direccion: Yup.string().required('La dirección es obligatoria'),
  fecha_entrega: Yup.date().required('La fecha de entrega es obligatoria'),
  correo_electronico: Yup.string().email('Correo electrónico inválido'),
  zona: Yup.number()
});

const ModalEditOrder = ({ open, onClose, handleSave, orden }) => {

  const [departamento, setDepartamento] = useState([]);
  const [municipio, setMunicipio] = useState([]);
  const [municipioSeleccionado, setMunicipioSeleccionado] = useState(orden?.municipio ||"");


  const getDeparment = () => {
    const deparment = departamentoMunicipio.map((item) => item.title);
    setDepartamento(deparment);
  };
  //Cargar departamentos
  useEffect(() => {
    getDeparment();
  }, []);


  useEffect(() => {
    if(orden?.departamento){
      getMunicipality(orden.departamento);
      setMunicipioSeleccionado(orden.municipio);
    }
  }, [orden]);

  const handleMunicipio = (e) => {
    setMunicipioSeleccionado(e.target.value);
  };

  const getMunicipality = (deparment) => {
    setMunicipioSeleccionado("");
    const municipality = departamentoMunicipio.filter(
      (item) => item.title === deparment
    ) ;
    setMunicipio(municipality[0].mun);
  };

  return (
    <Dialog open={open} onClose={onClose} fullWidth maxWidth="sm">
      <DialogTitle>Editar Orden #{orden.id_orden}</DialogTitle>
      <Formik
        initialValues={{
          nombre: orden.nombre,
          apellido: orden.apellido,
          telefono: orden.telefono,
          departamento: orden.departamento,
          municipio: "",
          complemento_direccion: orden.complemento_direccion,
          fecha_entrega: new Date(orden.fecha_entrega2).toLocaleDateString('en-CA'),
          correo_electronico: orden.correo_electronico,
          zona: orden.zona,
        }}
        validationSchema={validationSchema}
        onSubmit={(values) => {
          const data ={
            nombre: values.nombre,
            apellido: values.apellido,
            telefono: values.telefono,
            departamento: values.departamento,
            municipio: values.municipio,
            complemento_direccion: values.complemento_direccion,
            fecha_entrega: values.fecha_entrega,
            id_orden: orden.id_orden,
            correo_electronico: values.correo_electronico,
            zona: values.zona,
          }
          handleSave(data);
          onClose();
        }}
      >
        {({values, errors, touched, handleChange }) => (
          <Form>
            <DialogContent>
              <Grid container spacing={2}>
                <Grid item xs={12} sm={6}>
                  <Field
                    as={TextField}
                    label="Nombre"
                    name="nombre"
                    fullWidth
                    onChange={handleChange}
                    error={touched.nombre && Boolean(errors.nombre)}
                    helperText={touched.nombre && errors.nombre}
                  />
                </Grid>
                <Grid item xs={12} sm={6}>
                  <Field
                    as={TextField}
                    label="Apellido"
                    name="apellido"
                    fullWidth
                    onChange={handleChange}
                    error={touched.apellido && Boolean(errors.apellido)}
                    helperText={touched.apellido && errors.apellido}
                  />
                </Grid>
                <Grid item xs={12}>
                  <Field
                    as={TextField}
                    label="Teléfono"
                    name="telefono"
                    fullWidth
                    onChange={handleChange}
                    error={touched.telefono && Boolean(errors.telefono)}
                    helperText={touched.telefono && errors.telefono}
                  />
                </Grid>
                <Grid item xs={12}>
                  <Field
                    as={TextField}
                    select
                    label="Departamento"
                    name="departamento"
                    fullWidth
                    onChange={(e) => {
                      handleChange(e);
                      getMunicipality(e.target.value);
                    }}
                    error={touched.departamento && Boolean(errors.departamento)}
                    helperText={touched.departamento && errors.departamento}
                    
                  >
                    {/** Crear lista desplegable de departamentos */}
                    {departamento.map((item) => (
                      <MenuItem key={item} value={item}>
                        {item}
                      </MenuItem>
                    ))}
                  </Field>
                </Grid>
                <Grid item xs={12}>
                  <Field
                    as={TextField}
                    select
                    label="Municipio"
                    name="municipio"
                    fullWidth
                    value={values.municipio = municipioSeleccionado}
                    onChange={(e) => {
                      handleChange(e);
                      handleMunicipio(e);
                    }
                    }
                    error={touched.municipio && Boolean(errors.municipio)}
                    helperText={touched.municipio && errors.municipio}
                  >
                    {/** Crear lista desplegable de municipios */}
                    {municipio.map((item) => (
                        <MenuItem key={item} value={item}>
                          {item}
                        </MenuItem>
                      ))}
                  </Field>
                </Grid>
                <Grid item xs={12}>
                  <Field
                    type="number"
                    as={TextField}
                    label="Zona"
                    name="zona"
                    fullWidth
                    onChange={handleChange}
                    error={touched.zona && Boolean(errors.zona)}
                    helperText={touched.zona && errors.zona}
                  />
                </Grid>
                <Grid item xs={12}>
                  <Field
                    as={TextField}
                    label="Dirección"
                    name="complemento_direccion"
                    fullWidth
                    onChange={handleChange}
                    error={touched.complemento_direccion && Boolean(errors.complemento_direccion)}
                    helperText={touched.complemento_direccion && errors.complemento_direccion}
                  />
                </Grid>
                <Grid item xs={12}>
                  <Field
                    as={TextField}
                    label="Correo Electrónico"
                    name="correo_electronico"
                    fullWidth
                    onChange={handleChange}
                    error={touched.correo_electronico && Boolean(errors.correo_electronico)}
                    helperText={touched.correo_electronico && errors.correo_electronico}
                  />
                </Grid>
                <Grid item xs={12}>
                  <Field
                    as={TextField}
                    label="Fecha de Entrega"
                    name="fecha_entrega"
                    type="date"
                    fullWidth
                    InputLabelProps={{ shrink: true }}
                    onChange={handleChange}
                    error={touched.fecha_entrega && Boolean(errors.fecha_entrega)}
                    helperText={touched.fecha_entrega && errors.fecha_entrega}
                  />
                </Grid>
              </Grid>
            </DialogContent>
            <DialogActions>
              <Button onClick={onClose} color="secondary">
                Cancelar
              </Button>
              <Button type="submit" color="primary">
                Guardar
              </Button>
            </DialogActions>
          </Form>
        )}
      </Formik>
    </Dialog>
  );
};

export default ModalEditOrder;

ModalEditOrder.propTypes = {
    open: PropTypes.bool.isRequired,
    onClose: PropTypes.func.isRequired,
    handleSave: PropTypes.func.isRequired,
    orden: PropTypes.object.isRequired,
    };
