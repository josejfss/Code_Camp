import { AppBar, Toolbar, Typography, Button, Badge } from "@mui/material";

import ShoppingCartIcon from "@mui/icons-material/ShoppingCart";
import HistoryIcon from "@mui/icons-material/History";
import LogoutIcon from "@mui/icons-material/Logout";
import StorefrontIcon from "@mui/icons-material/Storefront";

import { UserContext } from "../../context/UserContext";
import { useContext } from "react";
import { useNavigate } from "react-router-dom";

import { ProductContext } from "../../context/ProductContex";

function NavBarClient() {
  const navigate = useNavigate();
  const { sesionStorageLogout } = useContext(UserContext);
  const { totalQuantity } = useContext(ProductContext);

  const handleGoHome = () => {
    navigate("/home");
  };

  const handleGoCar = () => {
    navigate("/user/car");
  };

  const handleGoRecord = () => {
    navigate("/user/record");
  };

  const handleGoExit = () => {
    navigate("/");
  };

  return (
    <>
      <AppBar position="fixed" sx={{ backgroundColor: "#1976D2" }}>
        <Toolbar>
          <Typography variant="h6" sx={{ flexGrow: 1 }}>
            Mi Tienda
          </Typography>
          <Button
            color="inherit"
            startIcon={<StorefrontIcon />}
            onClick={handleGoHome}
          >
            Home
          </Button>

          <Button color="inherit" onClick={handleGoCar}>
            {totalQuantity === 0 ? (
              <ShoppingCartIcon />
            ) : (
              <Badge badgeContent={totalQuantity} color="error">
                <ShoppingCartIcon />
              </Badge>
            )}
            Carrito de Compras
          </Button>
          <Button
            color="inherit"
            startIcon={<HistoryIcon />}
            onClick={handleGoRecord}
          >
            Historial de Compra
          </Button>
          <Button
            color="inherit"
            startIcon={<LogoutIcon />}
            onClick={() => {
              sesionStorageLogout();
              handleGoExit();
            }}
          >
            Cerrar Sesión
          </Button>
        </Toolbar>
      </AppBar>
    </>
  );
}

export default NavBarClient;
