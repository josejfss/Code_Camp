import { useState, useEffect, useContext } from 'react';
import { Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper, IconButton, Button, Box, TextField } from '@mui/material';
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

  const [searchTerm, setSearchTerm] = useState("");

  let filteredCategories = categories.filter((category) =>
    category.nombre.toLowerCase().includes(searchTerm)
  );

  // Función para manejar el cambio de búsqueda
  const handleSearchChange = (event) => {
    setSearchTerm(event.target.value.toLowerCase());
  };

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
      setCreate(false);
    }else{
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
    <div style={{textAlign:"center", alignItems:"center", margin:"auto"}}>
      <h1>Gestión de Categoria</h1>
    <Box
      display="flex"
      minHeight="60vh" 
      width={"70vh"}
      flexDirection="column" 
      alignSelf={"center"}
      
      sx={{ 
        justifyContent: "center",
        alignItems: "center",
        direction: "column",
      }}
    >
      <Button variant="contained" color="primary" startIcon={<AddIcon />} onClick={() => handleOpenModal()}
      sx={{marginBottom:3}}>
        Crear Categoría
      </Button>

      <TextField
          fullWidth
          label="Buscar por nombre de categoría"
          variant="outlined"
          value={searchTerm}
          onChange={handleSearchChange}
          sx={{marginBottom: 3, width: "80%"}}
        />
      <TableContainer component={Paper} sx={{alignContent:"center", textAlign:"center"}}>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell><strong>ID</strong></TableCell>
              <TableCell><strong>Nombre de Categoría</strong></TableCell>
              <TableCell><strong>Acciones</strong></TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {filteredCategories.map((category) => (
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
      duracion={4000}
    />
    </div>


  );
};

export default CategoryCrud;
