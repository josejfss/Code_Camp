import { useState, useEffect, useContext } from 'react';
import { Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper, IconButton, Button, Box } from '@mui/material';
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';
import AddIcon from '@mui/icons-material/Add';
import CategoryModal from './ModalCategory'; 
import { deleteProductCategory, getProductCategory, postProductCategory, putProductCategory } from '../../API/categoryRequest';
import {UserContext} from '../../context/UserContext';
import { CategoryContext } from '../../context/CategoryContext';
import { SnackBar } from "../Snackbar";

const CategoryCrud = () => {
  const {user} = useContext(UserContext);
  const {setCategory, category} = useContext(CategoryContext);

  const [categories, setCategories] = useState([]);
  const [openModal, setOpenModal] = useState(false);
  const [editCategory, setEditCategory] = useState(null);

  const [message, setMessage] = useState('');
  const [severity, setSeverity] = useState('success');
  const [open, setOpen] = useState(false);

  const [create, setCreate] = useState();

  const handleClose = () => {
    setOpen(false);
  };

  const loadCategories = () => {
    getProductCategory(user)
    .then((response) => {
      const {data} = response;
      setCategories(data);
    })
    .catch((error) => {
      console.error('Error al obtener las categorías:', error);
    });
  };
  
  useEffect(() => {
    getProductCategory(user)
    .then((response) => {
      const {data} = response;
      setCategories(data);
    })
    .catch((error) => {
      console.error('Error al obtener las categorías:', error);
    });
  }, [user]);

  const handleOpenModal = (category = null) => {
    if(category === null) {
      console.log('entre')
      setCreate(false);
    }else{
      console.log('entre2', category)
      setCreate(true);
    }
    
    setCategory(category);
    setEditCategory(category);
    setOpenModal(true);
  };

  const handleCloseModal = () => {
    setOpenModal(false);
    setEditCategory(null);
    setCategory(null);
  };

  const handleDelete = (categoria) => {
    deleteProductCategory(user, categoria)
    .then((response) => {
      const {response_text, status} = response;
      
      if (status === 200) {
        setMessage("Categoría eliminada con éxito");
        setSeverity('success');
        setOpen(true);
        loadCategories();
      } else {
        setMessage(response_text);
        setSeverity('error');
        setOpen(true);
      }
    })
  };

  const handleSaveCategory = () => {
    
    if (!('id_categoria_producto' in category)) {
      postProductCategory(user, category)
      .then((response) => {
        const {response_text, status} = response;
        
        if (status === 200) {
          setMessage(response_text);
          setSeverity('success');
          setOpen(true);
          loadCategories();
        } else {
          setMessage(response_text);
          setSeverity('error');
          setOpen(true);
        }
      })
    }else{
      putProductCategory(user, category)
      .then((response) => {
        const {response_text, status} = response;
        
        if (status === 200) {
          setMessage(response_text);
          setSeverity('success');
          setOpen(true);
          loadCategories();
        } else {
          setMessage(response_text);
          setSeverity('error');
          setOpen(true);
        }
      })
    }

   handleCloseModal();
  };

  return (
    <div style={{ textAlign: 'center' }}>
      <h1>Gestión de Productos</h1>
    <Box
      display="flex"
      minHeight="60vh" 
      width={"100vh"}
      flexDirection="column" 
      
      sx={{ 
        padding: 2,
        justifyContent: "center",
        alignItems: "center",
      }}
    >
      <Button variant="contained" color="primary" startIcon={<AddIcon />} onClick={() => handleOpenModal()}>
        Crear Categoría
      </Button>

      <TableContainer component={Paper} sx={{justifyContent:"center"}}>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell>ID</TableCell>
              <TableCell>Nombre de Categoría</TableCell>
              <TableCell>Acciones</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {categories.map((category) => (
              <TableRow key={category.id_categoria_producto}>
                <TableCell>{category.id_categoria_producto}</TableCell>
                <TableCell>{category.nombre}</TableCell>
                <TableCell>
                  <IconButton color="primary" onClick={() => handleOpenModal(category)}>
                    <EditIcon />
                  </IconButton>
                  <IconButton color="secondary" onClick={() => handleDelete(category)}>
                    <DeleteIcon />
                  </IconButton>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>

      <CategoryModal
        open={openModal}
        onClose={handleCloseModal}
        category={editCategory}
        onSave={handleSaveCategory}
        create={create}
      />
    </Box>
    <SnackBar
      openS={open}
      onClose={handleClose}
      severityS={severity}
      messageS={message}
    />
    </div>


  );
};

export default CategoryCrud;
