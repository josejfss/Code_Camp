import { Snackbar, Alert } from '@mui/material';
import PropTypes from "prop-types";

export const SnackBar = ({openS, messageS, severityS, onClose, duracion=3000 }) => {

  return (
    <>
      <Snackbar open={openS} autoHideDuration={duracion} onClose={onClose}>
        <Alert onClose={onClose} severity={severityS} sx={{ width: "100%" }}>
          {messageS}
        </Alert>
      </Snackbar>
    </>
  );
};

// Definir las propiedades que recibe el componente
SnackBar.propTypes = {
    openS: PropTypes.bool.isRequired,
    messageS: PropTypes.string.isRequired,
    severityS: PropTypes.string.isRequired,
    onClose: PropTypes.func.isRequired,
    duracion: PropTypes.number
};