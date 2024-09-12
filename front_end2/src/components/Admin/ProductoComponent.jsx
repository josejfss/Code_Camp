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
import AttachFileIcon from "@mui/icons-material/AttachFile";

import { getProductCategory } from "../../API/categoryRequest";
import { SnackBar } from "../Snackbar";
import UploadImageModal from "../UploadImage";

const ProductoComponente = () => {
  const [products, setProducts] = useState();
  const [categories, setCategories] = useState();
  const [openModal, setOpenModal] = useState(false);
  const [selectedProduct, setSelectedProduct] = useState(null);

  const [openSnackBar, setOpenSnackBar] = useState(false);
  const [snackBarMessage, setSnackBarMessage] = useState("");
  const [snackBarSeverity, setSnackBarSeverity] = useState("success");

  const handleCloseSnackBar = () => {
    setOpenSnackBar(false);
  };

  const { user } = useContext(UserContext);

  useEffect(() => {
    const loadProducts = async () => {
      const { data } = await getProduct(user);
      setProducts(data);
    };

    const loadCategory = async () => {
      const { data } = await getProductCategory(user);
      setCategories(data);
    };

    loadProducts();
    loadCategory();
  }, [user]);

  useEffect(() => {
    const loadCategory = async () => {
      const { data } = await getProductCategory(user);
      setCategories(data);
    };
    loadCategory();
  }, [user]);

  const handleOpenModal = (product = null) => {
    setSelectedProduct(product);
    console.log("categoria: ", categories);
    setOpenModal(true);
  };

  const handleOpenModalUploadImage = (product = null) => {
    setSelectedProduct(product);
    setOpenModal(true);
  };

  const handleCloseModalUploadImage = () => {
    setOpenModal(false);
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
    // Editar producto
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
    console.log("productoData: ", productoData);
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
    <div style={{ textAlign: "center" }}>
      <h1>Gestión de Productos</h1>
      <Button
        variant="contained"
        color="primary"
        startIcon={<AddIcon />}
        onClick={() => handleOpenModal()}
      >
        Crear Producto
      </Button>

      <TableContainer
        component={Paper}
        style={{ marginTop: "20px", width: "100%" }}
      >
        <Table>
          <TableHead>
            <TableRow>
              <TableCell>Imagen</TableCell>
              <TableCell>Nombre</TableCell>
              <TableCell>Marca</TableCell>
              <TableCell>Código</TableCell>
              <TableCell>Stock</TableCell>
              <TableCell>Precio</TableCell>
              <TableCell>Acciones</TableCell>
            </TableRow>
          </TableHead>
          <TableBody key={1} direction={"row"}>
            {products
              ? products.map((product) => (
                  <TableRow key={product.id_producto} >
                    <TableCell>
                      <img src={product.foto} alt={product.nombre} width={50} />
                    </TableCell>
                    <TableCell>{product.nombre}</TableCell>
                    <TableCell>{product.marca}</TableCell>
                    <TableCell>{product.codigo}</TableCell>
                    <TableCell>{product.stock}</TableCell>
                    <TableCell>Q{product.precio}</TableCell>
                    <TableCell width={20}>
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
                      <IconButton onClick={() => handleOpenModalUploadImage(product)}>
                        <AttachFileIcon />
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

      {openModal && (
        <UploadImageModal
        open={openModal}
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
