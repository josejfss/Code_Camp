import { Modal, Box, Button, TextField, MenuItem } from '@mui/material';
import { Formik, Form, Field } from 'formik';
import * as Yup from 'yup';
import PropTypes from 'prop-types';

// Esquema de validación con Yup
const productSchema = Yup.object().shape({
  nombre: Yup.string().required('Nombre es requerido'),
  marca: Yup.string().required('Marca es requerida'),
  codigo: Yup.string().required('Código es requerido'),
  stock: Yup.number().required('Stock es requerido').min(0, 'Debe ser mayor o igual a 0'),
  categoria_producto: Yup.string().required('Categoría es requerida'),
  precio: Yup.number().required('Precio es requerido').min(0, 'Debe ser mayor o igual a 0'),

});

const ProductModal = ({ open, onClose, onSave, product, categories }) => {
  const initialValues = {
    nombre: product?.nombre || '',
    marca: product?.marca || '',
    codigo: product?.codigo || '',
    stock: product?.stock || 0,
    categoria_producto: product?.id_categoria_producto || 1,
    precio: product?.precio || 0,
    imagen: null, 
  };

  return (
    <Modal open={open} onClose={onClose}>
      <Box
      sx={{
        maxWidth: '50vh',
        width: '100%',
        backgroundColor: 'white',
        position: 'fixed',
        alignContent: 'center',
        alignItems: 'center',
        top: '50%',
        left: '50%',
        transform: 'translate(-50%, -50%)',
        padding: '20px',
        borderRadius: '5px',
        boxShadow: 24,
        p: 4,
        

      }}>
        <h2>{product ? 'Editar Producto' : 'Crear Producto'}</h2>
        <Formik
          initialValues={initialValues}
          validationSchema={productSchema}
          onSubmit={async (values, { setSubmitting }) => {
            const productData = { ...values };

           //Manejo de imagen
            if (product && !values.imagen) {
              delete productData.imagen;
            }
            let formData = new FormData();
            formData.append('id_producto', product?.id_producto || '');
            formData.append('nombre', values.nombre);
            formData.append('marca', values.marca);
            formData.append('codigo', values.codigo);
            formData.append('stock', values.stock);
            formData.append('id_categoria_producto', values.categoria_producto);
            formData.append('precio', values.precio);

            if (productData.imagen) {
              formData.append('imagen', values.imagen);
            }
            console.log("inicio",formData);
            await onSave(formData);
            setSubmitting(false);
          }}
        >
          {({ isSubmitting, setFieldValue, errors, touched }) => (
            <Form>
              <Field
                as={TextField}
                name="nombre"
                label="Nombre"
                fullWidth
                error={touched.nombre && Boolean(errors.nombre)}
                helperText={touched.nombre && errors.nombre}
                margin="normal"
              />

              <Field
                as={TextField}
                name="marca"
                label="Marca"
                fullWidth
                error={touched.marca && Boolean(errors.marca)}
                helperText={touched.marca && errors.marca}
                margin="normal"
              />

              <Field
                as={TextField}
                name="codigo"
                label="Código"
                fullWidth
                error={touched.codigo && Boolean(errors.codigo)}
                helperText={touched.codigo && errors.codigo}
                margin="normal"
              />

              <Field
                as={TextField}
                name="stock"
                label="Stock"
                type="number"
                fullWidth
                error={touched.stock && Boolean(errors.stock)}
                helperText={touched.stock && errors.stock}
                margin="normal"
              />

              <Field
                as={TextField}
                name="categoria_producto"
                label="Categoría"
                fullWidth
                select
                error={touched.categoria_producto && Boolean(errors.categoria_producto)}
                helperText={touched.categoria_producto && errors.categoria_producto}
                margin="normal"
              >
                { categories.length > 0 ?
                categories.map((category) => (
                  <MenuItem key={category.id_categoria_producto} value={category.id_categoria_producto}>
                    {category.nombre}
                  </MenuItem>
                ))
                : <MenuItem value={1}>Categoría 1</MenuItem>
                }
              </Field>

              <Field
                as={TextField}
                name="precio"
                label="Precio"
                type="number"
                fullWidth
                error={touched.precio && Boolean(errors.precio)}
                helperText={touched.precio && errors.precio}
                margin="normal"
              />

              <input
                id="imagen"
                name="imagen"
                type="file"
                accept="image/*"
                onChange={(event) => {
                  setFieldValue('imagen', event.currentTarget.files[0]);
                }}
                disabled={!!product} // Desactivar en modo de edición
                style={{ margin: '10px 0' }}
              />
              {errors.imagen && touched.imagen && <div>{errors.imagen}</div>}

              <Button
                type="submit"
                variant="contained"
                color="primary"
                fullWidth
                style={{ marginTop: '16px' }}
                disabled={isSubmitting}
              >
                {product ? 'Guardar Cambios' : 'Crear Producto'}
              </Button>
            </Form>
          )}
        </Formik>
      </Box>
    </Modal>
  );
};

export default ProductModal;

ProductModal.propTypes = {
    open: PropTypes.bool.isRequired,
    onClose: PropTypes.func.isRequired,
    category: PropTypes.object,
    onSave: PropTypes.func.isRequired,
    create: PropTypes.bool,
    product: PropTypes.object,
    categories: PropTypes.any.isRequired,
  };
  