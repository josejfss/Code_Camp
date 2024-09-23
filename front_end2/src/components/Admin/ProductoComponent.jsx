import { useState, useEffect, useContext } from "react";
import {
  Table,
  Button,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  IconButton,
  Grid,
  TextField,
  Grid2,
} from "@mui/material";
import ProductModal from "./ModalProduct";
import {
  deleteProduct,
  getProduct,
  postProduct,
  postUpdateImage,
  putProduct,
} from "../../API/productAdminRequest";
import { UserContext } from "../../context/UserContext";
import DeleteIcon from "@mui/icons-material/Delete";
import AddIcon from "@mui/icons-material/Add";
import EditIcon from "@mui/icons-material/Edit";

import { getProductCategory } from "../../API/categoryRequest";
import { SnackBar } from "../Snackbar";
import UploadImageModal from "../UploadImage";

const ProductoComponente = () => {
  const [products, setProducts] = useState([]);
  const [categories, setCategories] = useState();
  const [openModal, setOpenModal] = useState(false);
  const [openModalImagen, setopenModalImagen] = useState(false);
  const [selectedProduct, setSelectedProduct] = useState(null);

  const [openSnackBar, setOpenSnackBar] = useState(false);
  const [snackBarMessage, setSnackBarMessage] = useState("");
  const [snackBarSeverity, setSnackBarSeverity] = useState("success");
  const [searchTerm, setSearchTerm] = useState("");

  let filteredProducts = products.filter((product) =>
    product.nombre.toLowerCase().includes(searchTerm) ||
    product.marca.toLowerCase().includes(searchTerm) ||
    product.codigo.toLowerCase().includes(searchTerm) ||
    product.categoria.toLowerCase().includes(searchTerm)
  );

  // Función para manejar el cambio de búsqueda
  const handleSearchChange = (event) => {
    setSearchTerm(event.target.value.toLowerCase());
  };

  const handleCloseSnackBar = () => {
    setOpenSnackBar(false);
  };

  const { user } = useContext(UserContext);

  useEffect(() => {

    getProduct(user)
      .then((response) => {
       
       setProducts(response.data);
      })
  }, [user, setProducts, setCategories]);


  const handleOpenModal = (product = null) => {
    getProductCategory(user)
    .then((response) => {
      setCategories(response.data);
      setSelectedProduct(product);
      setOpenModal(true);
    }).catch((error) => {
      console.log("error", error);
    });
    
  };


  const handleCloseModalUploadImage = () => {
    setopenModalImagen(false);
  };
  
  const handleUpdateImage = async (formData) => {
    const response = await postUpdateImage(user, formData);
    if (response.status !== 200) {
      setSnackBarMessage(response.response_text);
      setSnackBarSeverity("error");
      setOpenSnackBar(true);
      return;
    }
    setSnackBarMessage("Imagen actualizada correctamente");
    setSnackBarSeverity("success");
    setOpenSnackBar(true);
  };


  const handleSaveProduct = async (productData) => {
    if (selectedProduct) {
      let { status, response_text } = await putProduct(user, productData);
      if (status !== 200) {
        setSnackBarMessage(response_text);
        setSnackBarSeverity("error");
        setOpenSnackBar(true);
        return;
      }
      setSnackBarMessage("Producto actualizado correctamente");
      setSnackBarSeverity("success");
      setOpenSnackBar(true);
    } else {
      //Crear producto
      let response = await postProduct(user, productData);
      if (response.status !== 200) {
        setSnackBarMessage(response.response_text);
        setSnackBarSeverity("error");
        setOpenSnackBar(true);
        return;
      } else {
        setSnackBarMessage("Producto creado correctamente");
        setSnackBarSeverity("success");
        setOpenSnackBar(true);
      }
    }
    // Recargar productos después de crear o editar
    const { data } = await getProduct(user);
    setProducts(data);
    setOpenModal(false);
  };

  const handleDeleteProduct = async (productoData) => {
    const { response_text, status } = await deleteProduct(user, productoData);
    if (status !== 200) {
      setSnackBarMessage(response_text);
      setSnackBarSeverity("error");
      setOpenSnackBar(true);
      return;
    }
    setSnackBarMessage("Producto eliminado correctamente");
    setSnackBarSeverity("success");
    setOpenSnackBar(true);

    const { data } = await getProduct(user);
    setProducts(data);
  };

  return (
    <div style={{ textAlign: "center", margin:"auto"}}>
      <h1>Gestión de Productos</h1>
      <Grid2 container md={11} xs={11} sx={{justifyContent:"center"}}>
        <Button
          variant="contained"
          color="primary"
          startIcon={<AddIcon />}
          onClick={() => handleOpenModal()}
          sx={{marginBottom: 3}}
        >
          Crear Producto
        </Button>
      </Grid2>
      <Grid2 container md={11} xs={11} sx={{justifyContent:"center"}}>
        <TextField
          fullWidth
          label="Buscar por nombre, código, marca o categoría"
          variant="outlined"
          value={searchTerm}
          onChange={handleSearchChange}
          sx={{marginBottom: 1, width: "80%"}}
        />
      </Grid2>
      <TableContainer
        component={Paper}
        style={{ marginTop: "20px" }}
      >
        <Table>
          <TableHead>
            <TableRow >
            <TableCell sx={{textAlign:"center"}}><strong>ID</strong></TableCell>
              <TableCell sx={{textAlign:"center"}}><strong>Imagen</strong></TableCell>
              <TableCell sx={{textAlign:"center"}}><strong>Nombre</strong></TableCell>
              <TableCell sx={{textAlign:"center"}}><strong>Marca</strong></TableCell>
              <TableCell sx={{textAlign:"center"}}><strong>Categoria</strong></TableCell>
              <TableCell sx={{textAlign:"center"}}><strong>Código</strong></TableCell>
              <TableCell sx={{textAlign:"center"}}><strong>Stock</strong></TableCell>
              <TableCell sx={{textAlign:"center"}}><strong>Precio</strong></TableCell>
              <TableCell sx={{textAlign:"center"}}><strong>Acciones</strong></TableCell>
            </TableRow>
          </TableHead>
          <TableBody key={1} direction={"row"}>
            {filteredProducts
              ? filteredProducts.map((product) => (
                  <TableRow key={product.id_producto}>
                    <TableCell>{product.id_producto}</TableCell>
                    <TableCell>
                      <img src={product.foto} alt={product.nombre} width={100} />
                    </TableCell>
                    <TableCell>{product.nombre}</TableCell>
                    <TableCell>{product.marca}</TableCell>
                    <TableCell>{product.categoria}</TableCell>
                    <TableCell>{product.codigo}</TableCell>
                    <TableCell>{product.stock}</TableCell>
                    <TableCell>Q{product.precio}</TableCell>
                    <TableCell width={100}>
                    <Grid
                    container
                    justifyContent="flex-end"
                    direction={"row"}
                    spacing={1}
                  >
                    <Grid item>
                      <IconButton
                        color="primary"
                        onClick={() => handleOpenModal(product)}
                      >
                        <EditIcon />
                      </IconButton>
                      <IconButton
                        color="secondary"
                        onClick={() => handleDeleteProduct(product)}
                      >
                        <DeleteIcon />
                      </IconButton>
                      </Grid>
                    </Grid>
                    </TableCell>
                  </TableRow>
                ))
              : console.log("No hay productos")}
          </TableBody>
        </Table>
      </TableContainer>

      {openModal && (
        <ProductModal
          open={openModal}
          onClose={() => setOpenModal(false)}
          onSave={handleSaveProduct}
          product={selectedProduct}
          categories={categories}
        />
      )}

      {openModalImagen && (
        <UploadImageModal
        open={openModalImagen}
        handleClose={handleCloseModalUploadImage}
        currentImage={selectedProduct?.foto}
        saveImage={handleUpdateImage}
        id_product={selectedProduct?.id_producto}
        />
      )}

      <SnackBar
        openS={openSnackBar}
        severityS={snackBarSeverity}
        messageS={snackBarMessage}
        onClose={handleCloseSnackBar}
      />
    </div>
  );
};

export default ProductoComponente;
