import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Button,
  TextField,
} from "@mui/material";
import { useFormik } from "formik";
import * as Yup from "yup";

import PropTypes from "prop-types";
import { CategoryContext } from "../../context/CategoryContext";
import { useContext } from "react";

const CategoryModal = ({ open, onClose, onSave, create }) => {
  const { category, setCategory } = useContext(CategoryContext);
  // const [create, setCreate] = useState(true);
  // const [count, setCount] = useState(0);

 

  const handleCategory = (e) => {
    const temp = { ...category };
    temp.nombre = e.target.value;
    setCategory(temp);
  };

  const formik = useFormik({
    initialValues: {
      nombre_categoria: category?.nombre || "",
    },
    validationSchema: Yup.object({
      nombre_categoria: Yup.string().required(
        "El nombre de la categoría es obligatorio"
      ),
    }),
    onSubmit: () => {
      // onSave({'hola': 'pelo'});
    },
  });

  return (
    <Dialog open={open} onClose={onClose}>
      <DialogTitle>
        {create ? "Editar Categoría" : "Crear Categoría"}
      </DialogTitle>
      <form onSubmit={formik.handleSubmit}>
        <DialogContent>
          <TextField
            fullWidth
            label="Nombre de la Categoría"
            name="nombre_categoria"
            value={
              (formik.values.nombre_categoria = category ? category.nombre : "")
            }
            onChange={(e) => {
              formik.handleChange(e);
              handleCategory(e);
            }}
            onBlur={formik.handleBlur}
            error={
              formik.touched.nombre_categoria &&
              Boolean(formik.errors.nombre_categoria)
            }
            helperText={
              formik.touched.nombre_categoria && formik.errors.nombre_categoria
            }
            margin="normal"
          />
        </DialogContent>
        <DialogActions>
          <Button onClick={onClose} color="error">
            Cancelar
          </Button>
          <Button
            type="submit"
            variant="contained"
            color="primary"
            onClick={() => {
              onSave(category);
            }}
          >
            {create ? "Actualizar" : "Crear"}
          </Button>
        </DialogActions>
      </form>
    </Dialog>
  );
};

export default CategoryModal;

CategoryModal.propTypes = {
  open: PropTypes.bool.isRequired,
  onClose: PropTypes.func.isRequired,
  category: PropTypes.object,
  onSave: PropTypes.func.isRequired,
  create: PropTypes.bool,
};
