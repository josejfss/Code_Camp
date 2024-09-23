import { useContext, useEffect, useState } from "react";
import { getOrderAdmin, getOrderDetailAdmin } from "../../API/orderRequest";
import { UserContext } from "../../context/UserContext";
import {
  Grid2,
  IconButton,
  Paper,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  TextField,
} from "@mui/material";
import EditIcon from '@mui/icons-material/Edit';
import VisibilityIcon from "@mui/icons-material/Visibility";
import { SnackBar } from "../Snackbar";
import ModalDetailOrder from "./ModalDetailOrder";
import ModalEditOrder from "./ModalEditOrder";
import { editOrder } from "../../API/adminRequest";

function OrdersComponent() {
  const { user } = useContext(UserContext);

  const [orders, setOrders] = useState([]);
  const [order, setOrder] = useState({});
  const [searchTerm, setSearchTerm] = useState("");
  const [open, setOpen] = useState(false);
  const [detailOrder, setDetailOrder] = useState([]);

  const [openModalEdit, setOpenModalEdit] = useState(false);


  const [message, setMessage] = useState("");
  const [snackbarOpen, setSnackbarOpen] = useState(false);
  const [severity, setSeverity] = useState("success");

  let filteredOrders = orders.filter((orden) =>
    orden.nombre_completo.toLowerCase().includes(searchTerm) ||
    orden.departamento.toLowerCase().includes(searchTerm) ||
    orden.municipio.toLowerCase().includes(searchTerm) ||
    orden.estado.toLowerCase().includes(searchTerm) ||
    orden.id_orden.toString().includes(searchTerm)
  );

  const handleOpenModal = (order) => {
    getOrderDetailAdmin(user, order.id_orden)
      .then((response) => {
        
        if(response.status !== 200){
          setSeverity("error");
          setMessage(response.response_text);
          setSnackbarOpen(true);
          return;
        }
        setOrder(order);
        setDetailOrder(response.data);
        setOpen(true);
      })
  }

  const handleModalClose = () => {
    setOpen(false);
  }

  const handleSnackbarClose = () => {
    setSnackbarOpen(false);
  };

  const handleSearchChange = (event) => {
    setSearchTerm(event.target.value.toLowerCase());
  }

  const handleEditOrder = (orden) => {
    editOrder(user, orden).then((response) => {
      if (response.status === 200) {
        setSeverity("success");
        setMessage("Orden actualizada");
        setSnackbarOpen(true);
        //Actualizar ordenes
        getOrderAdmin(user).then((response) => {
          if (response.status === 200) {
            setOrders(response.data);
          }
        });

      } else {
        setSeverity("error");
        setMessage(response.response_text);
        setSnackbarOpen(true);
      }
    });
  }

  const handleOpenModalEdit = (orden) => {
    setOrder(orden);
    setOpenModalEdit(true);
  }

  const handleModalCloseEdit = () => {
    setOpenModalEdit(false);
  }
  

  useEffect(() => {
    getOrderAdmin(user).then((response) => {
      if (response.status === 200) {
        setOrders(response.data);
      }
    });
  }, [user]);
  return (
    <div style={{textAlign:"center", alignItems:"center", margin:"auto"}}>
      <h1>Gestión de pedidos</h1>
    <TextField
          fullWidth
          label="Buscar por id, nombre, departamento, municipio o estado"
          variant="outlined"
          value={searchTerm}
          onChange={handleSearchChange}
          sx={{marginBottom: 3, width: "80%"}}
        />
      <Grid2 container xs={12}>
        <TableContainer component={Paper}>
          <Table>
            <TableHead>
              <TableRow>
                <TableCell><strong>ID</strong></TableCell>
                <TableCell><strong>nombre</strong></TableCell>
                <TableCell><strong>Fecha entrega</strong></TableCell>
                <TableCell><strong>Departamento</strong></TableCell>
                <TableCell><strong>Municipio</strong></TableCell>
                <TableCell><strong>Estado</strong></TableCell>
                <TableCell><strong>Total orden</strong></TableCell>
                <TableCell><strong>Acciones</strong></TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {filteredOrders.map((order, index) => (
                <TableRow key={index}>
                  <TableCell>{order.id_orden}</TableCell>
                  <TableCell>{order.nombre_completo}</TableCell>
                  <TableCell>{order.fecha_entrega}</TableCell>
                  <TableCell>{order.departamento}</TableCell>
                  <TableCell>{order.municipio}</TableCell>
                  <TableCell>{order.estado}</TableCell>
                  <TableCell> Q {order.total_orden.toFixed(2)}</TableCell>
                  <TableCell>
                  <Grid2>
                      <IconButton
                        color="primary"
                        onClick={() => handleOpenModal(order)}
                      >
                        <VisibilityIcon />
                      </IconButton>
                      
                      <IconButton
                        color="secondary"
                        onClick={() => handleOpenModalEdit(order)}
                      >
                        <EditIcon />
                      </IconButton>
                    </Grid2>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>
      </Grid2>
      
      <ModalEditOrder open={openModalEdit} onClose={handleModalCloseEdit} orden={order} handleSave={handleEditOrder} />

      <ModalDetailOrder open={open} onClose={handleModalClose} detailOrder={detailOrder} order={order} />
      <SnackBar openS={snackbarOpen} severityS={severity} messageS={message} onClose={handleSnackbarClose} />
    </div>
  );
}

export default OrdersComponent;
