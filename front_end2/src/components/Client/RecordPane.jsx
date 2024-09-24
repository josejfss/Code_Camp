import { useContext, useEffect, useState } from "react";
import {
  Card,
  CardContent,
  Typography,
  Button,
  Grid
} from "@mui/material";
import { UserContext } from "../../context/UserContext";
import { getOrderDetail, getOrderUser } from "../../API/orderRequest";
import { useNavigate } from 'react-router-dom';
import { SnackBar } from "../Snackbar";

function RecordPane() {

  const navigate = useNavigate();

  const { user } = useContext(UserContext);
  const [data, setData] = useState([]);
  
  const [message, setMessage] = useState("");
  const [snackbarOpen, setSnackbarOpen] = useState(false);
  const [severity, setSeverity] = useState("success");

  useEffect(() => {
    getOrderUser(user)
      .then((response) => {
        setData(response.data);
      })
      .catch((error) => {
        console.error("Error al obtener las ordenes:", error);
      });
  }, [user]);

  const handleSnackbarClose = () => {
    setSnackbarOpen(false);
  };

  // Abrir el modal con el detalle de la orden seleccionada
  const handleOpenBill = (orden) => {
    const bill = data.find((order) => order.id_orden === orden);
    

    getOrderDetail(user, orden)
      .then((response) => {
        
        if(response.status !== 200){
          setSeverity("error");
          setMessage(response.response_text);
          setSnackbarOpen(true);
          return;
        }

        navigate('/user/bill', {state: {detail: response.data, bill: bill}});
      })
      .catch((error) => {
        console.error("Error al obtener el detalle de la orden:", error);
      });
  };


  return (
    <div style={{ paddingTop: '64px' }}>
      <Grid container spacing={2}>
      {data.length === 0 ? <Typography sx={{alignContent: "center", margin:7}} variant="h6">No hay ordenes</Typography> :
        (data.map((orden) => (
          <Grid item xs={12} md={data.length === 1 ? 11 : 5} key={orden.id_orden} sx={{marginTop:3}}>
            <Card
              style={{
                display: "flex",
                flexDirection: "column",
                height: "100%",
                minWidth: "100px",
                margin: "10px",
                padding: "10px",
              }}
            >
              <CardContent>
                <Typography variant="h6" textAlign={"center"}>Orden #{orden.id_orden}</Typography>
                <Typography variant="body2">
                <strong>Nombre:</strong> {orden.nombre_completo}
                </Typography>
                <Typography variant="body2">
                <strong>Dirección: </strong> {orden.direccion}
                </Typography>
                <Typography variant="body2">
                <strong>Fecha de Entrega:</strong> {orden.fecha_entrega}
                </Typography>
                <Typography variant="body2"><strong>Estado: </strong>{orden.estado}</Typography>
                <Typography variant="body2">
                <strong>Total Orden: </strong> Q{orden.total_orden}
                </Typography>
                <Button
                  variant="contained"
                  color="primary"
                  onClick={() => handleOpenBill(orden.id_orden)}
                  style={{ marginTop: "16px" }}
                >
                  Ver Detalles
                </Button>
              </CardContent>
            </Card>
          </Grid>
        )))}
      </Grid>

      <SnackBar openS={snackbarOpen} severityS={severity} messageS={message} onClose={handleSnackbarClose} />

    </div>
  );
}

export default RecordPane;
