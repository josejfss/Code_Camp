import { useState, useEffect, useContext } from 'react';
import { Table, Button, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper, IconButton } from '@mui/material';
import ProductModal from './ModalProduct';
import {deleteProduct, getProduct, postProduct, putProduct } from '../../API/productAdminRequest';
import { UserContext } from '../../context/UserContext';
import DeleteIcon from '@mui/icons-material/Delete';
import AddIcon from '@mui/icons-material/Add';
import EditIcon from '@mui/icons-material/Edit';

const ProductoComponente = () => {
  const [products, setProducts] = useState([]);
  const [openModal, setOpenModal] = useState(false);
  const [selectedProduct, setSelectedProduct] = useState(null);

    const {user} = useContext(UserContext);

  useEffect(() => {
    const loadProducts = async () => {
      const {data} = await getProduct(user);
      setProducts(data);
    };

    loadProducts();
  }, [user]);

  const handleOpenModal = (product = null) => {
    setSelectedProduct(product);
    setOpenModal(true);
  };

  const handleSaveProduct = async (productData) => {
    if (selectedProduct) {
      await putProduct(user, productData);
    } else {
      await postProduct(user, productData);
    }
    // Recargar productos después de crear o editar
    const {data} = await getProduct(user);
    setProducts(data);
    setOpenModal(false);
  };

  const handleDeleteProduct = async (productoData) => {
    await deleteProduct(user, productoData);
    const {data} = await getProduct(user);
    setProducts(data);
  };

  return (
    <div style={{ textAlign: 'center' }}>
      <h1>Gestión de Productos</h1>
      <Button variant="contained" color="primary" startIcon={<AddIcon />} onClick={() => handleOpenModal()}>
        Crear Producto
      </Button>

      <TableContainer component={Paper} style={{ marginTop: '20px', width: '100%' }}>
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
          <TableBody key={1}>
            {products.map((product) => (
              <TableRow key={product.id_producto}>
                <TableCell><img src={product.foto} alt={product.nombre} width={50} /></TableCell>
                <TableCell>{product.nombre}</TableCell>
                <TableCell>{product.marca}</TableCell>
                <TableCell>{product.codigo}</TableCell>
                <TableCell>{product.stock}</TableCell>
                <TableCell>Q{product.precio}</TableCell>
                <TableCell width={20}>
                <IconButton color="primary" onClick={() => handleOpenModal(product)}>
                    <EditIcon />
                  </IconButton>
                  <IconButton color="secondary" onClick={() => handleDeleteProduct(product)}>
                    <DeleteIcon />
                  </IconButton>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>

      {openModal && (
        <ProductModal
          open={openModal}
          onClose={() => setOpenModal(false)}
          onSave={handleSaveProduct}
          product={selectedProduct}
        />
      )}
    </div>
  );
};

export default ProductoComponente;
