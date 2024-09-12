import {
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  Button,
  Grid,
  TextField,
  IconButton,
} from "@mui/material";
import { useFormik } from "formik";
import * as Yup from "yup";
import CloseIcon from "@mui/icons-material/Close";
import PropTypes from "prop-types";
import { useState } from "react";

const UploadImageModal = ({ open, handleClose, currentImage, saveImage, id_product }) => {
  const [previewImage, setPreviewImage] = useState(currentImage || "");

  // Formik y Yup para gestionar el formulario y validación
  const formik = useFormik({
    initialValues: {
      image: null,
    },
    validationSchema: Yup.object({
      image: Yup.mixed().required("Debe seleccionar una imagen"),
    }),
    onSubmit: (values) => {
      const formData = new FormData();
      formData.append("id_producto", id_product);
      formData.append("image", values.image);
      console.log("Subiendo imagen: ", values.image);
      saveImage(formData);
      handleClose(); // Cerrar modal después de subir la imagen
    },
  });

  // Manejar el cambio de archivo e imagen en vista previa
  const handleFileChange = (event) => {
    const file = event.currentTarget.files[0];
    if (file) {
      formik.setFieldValue("image", file);
      const reader = new FileReader();
      reader.onload = () => {
        setPreviewImage(reader.result);
      };
      reader.readAsDataURL(file);
    }
  };

  return (
    <Dialog open={open} onClose={handleClose} maxWidth="sm" fullWidth>
      <DialogTitle>
        Subir Imagen
        <IconButton
          aria-label="close"
          onClick={handleClose}
          style={{ position: "absolute", right: 8, top: 8 }}
        >
          <CloseIcon />
        </IconButton>
      </DialogTitle>

      <form onSubmit={formik.handleSubmit}>
        <DialogContent>
          <Grid container spacing={2}>
            <Grid item xs={12}>
              {previewImage && (
                <img
                  src={previewImage}
                  alt="Vista previa"
                  style={{
                    width: "100%",
                    maxHeight: "300px",
                    objectFit: "contain",
                  }}
                />
              )}
            </Grid>
            <Grid item xs={12}>
              <TextField
                type="file"
                fullWidth
                onChange={handleFileChange}
                InputLabelProps={{ shrink: true }}
                inputProps={{ accept: "image/*" }}
                error={Boolean(formik.errors.image)}
                helperText={
                  formik.errors.image
                    ? formik.errors.image
                    : "Seleccione una imagen"
                }
              />
            </Grid>
          </Grid>
        </DialogContent>

        <DialogActions>
          <Button onClick={handleClose} color="secondary">
            Cancelar
          </Button>
          <Button type="submit" color="primary" variant="contained">
            Subir Imagen
          </Button>
        </DialogActions>
      </form>
    </Dialog>
  );
};

export default UploadImageModal;

UploadImageModal.propTypes = {
    open: PropTypes.bool.isRequired,
    handleClose: PropTypes.func.isRequired,
    currentImage: PropTypes.string,
    saveImage: PropTypes.func.isRequired,
    id_product: PropTypes.number.isRequired,
    };