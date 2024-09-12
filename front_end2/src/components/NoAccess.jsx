import { Container, Typography, Button, Box } from '@mui/material';
import LockOutlinedIcon from '@mui/icons-material/LockOutlined';

import { useNavigate } from 'react-router-dom';

const NoAccess = () => {
    const navigate = useNavigate();
    const handleGoNoAccess = () => {
        navigate('/');
      };
  return (
    <Container maxWidth="sm" style={{ textAlign: 'center', marginTop: '100px' }}>
      <Box display="flex" justifyContent="center" mb={3}>
        <LockOutlinedIcon color="error" style={{ fontSize: 60 }} />
      </Box>
      <Typography variant="h4" gutterBottom>
        Acceso Denegado
      </Typography>
      <Typography variant="body1" color="textSecondary" paragraph>
        No tienes permisos para acceder a este recurso. Si crees que esto es un error, por favor contacta al administrador del sistema.
      </Typography>
      <Button
        variant="contained"
        color="primary"
        onClick={handleGoNoAccess}
        style={{ marginTop: '20px' }}
      >
        Volver
      </Button>
    </Container>
  );
};

export default NoAccess;