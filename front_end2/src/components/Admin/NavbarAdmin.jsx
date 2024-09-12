import { useContext } from 'react';
import { AppBar, Toolbar, Typography, Button } from '@mui/material';
import LogoutIcon from '@mui/icons-material/Logout';
import { UserContext } from "../../context/UserContext";
import { useNavigate } from 'react-router-dom';

function NavbarAdmin() {
    const navigate = useNavigate();

    const { sesionStorageLogout } = useContext(UserContext);

    const handleGoHome = () => {
        navigate('/');
      };
    
      const handleGoCategory = () => {
        navigate('/admin/category');
      };

      const handleGoProducts = () => {
        navigate('/admin/product');
      };
      
      
    return (
      <AppBar position="fixed">
        <Toolbar>
          <Typography variant="h6" style={{ flexGrow: 1 }}>
            Admin Dashboard
          </Typography>
          
          <Button color="inherit" onClick={handleGoHome}>
            Home
          </Button>
          <Button color="inherit" onClick={handleGoProducts}>
            Producto
          </Button>
          <Button color="inherit" onClick={handleGoCategory}>
            Categoria
          </Button>
  
          <Button color="inherit" startIcon={<LogoutIcon />} onClick={() => {sesionStorageLogout()
            handleGoHome()
          }}>
            Cerrar Sesión
          </Button>
        </Toolbar>
      </AppBar>
    );
}

export default NavbarAdmin