import React, { useState, useEffect } from 'react';
import { Typography, Button, Box, TextField, Dialog, DialogActions, DialogContent, DialogTitle, IconButton } from '@mui/material';
import { Delete as DeleteIcon, Edit as EditIcon } from '@mui/icons-material';
import PageContainer from 'src/components/container/PageContainer';
import DashboardCard from '../../components/shared/DashboardCard';
import FornecedorService from '../../services/fornecedor.service';

const SamplePage = () => {
  const [fornecedores, setFornecedores] = useState([]);
  const [open, setOpen] = useState(false);
  const [editMode, setEditMode] = useState(false);
  const [currentFornecedor, setCurrentFornecedor] = useState({ id: null, nome: '', email: '', cnpj: '', telefone: '', tipoProduto: '' });

  useEffect(() => {
    retrieveFornecedores();
  }, []);

  const retrieveFornecedores = () => {
    FornecedorService.getAll()
      .then(response => {
        setFornecedores(response.data);
      })
      .catch(e => {
        console.log(e);
      });
  };

  const handleClickOpen = () => {
    setEditMode(false);
    setCurrentFornecedor({ id: null, nome: '', email: '', cnpj: '', telefone: '', tipoProduto: '' });
    setOpen(true);
  };

  const handleClickEdit = (fornecedor) => {
    setEditMode(true);
    setCurrentFornecedor(fornecedor);
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setCurrentFornecedor({ ...currentFornecedor, [name]: value });
  };

  const saveFornecedor = () => {
    if (editMode) {
      FornecedorService.update(currentFornecedor.id, currentFornecedor)
        .then(response => {
          retrieveFornecedores();
          handleClose();
        })
        .catch(e => {
          console.log(e);
        });
    } else {
      FornecedorService.create(currentFornecedor)
        .then(response => {
          retrieveFornecedores();
          handleClose();
        })
        .catch(e => {
          console.log(e);
        });
    }
  };

  const deleteFornecedor = (id) => {
    FornecedorService.delete(id)
      .then(response => {
        retrieveFornecedores();
      })
      .catch(e => {
        console.log(e);
      });
  };

  return (
    <PageContainer title="Fornecedores" description="this is Sample page">
      <DashboardCard title="Fornecedores">
        <Box>
          <Button variant="contained" color="primary" onClick={handleClickOpen}>
            Criar Fornecedor
          </Button>
        </Box>
        <Box mt={2}>
          {fornecedores.map(fornecedor => (
            <Box key={fornecedor.id} display="flex" alignItems="center" justifyContent="space-between" p={2} borderBottom="1px solid #ccc">
              <Box>
                <Typography variant="h6">{fornecedor.nome}</Typography>
                <Typography variant="body2">Email: {fornecedor.email}</Typography>
                <Typography variant="body2">CNPJ: {fornecedor.cnpj}</Typography>
                <Typography variant="body2">Telefone: {fornecedor.telefone}</Typography>
                <Typography variant="body2">Tipo de Produto: {fornecedor.tipoProduto}</Typography>
              </Box>
              <Box>
                <IconButton color="primary" onClick={() => handleClickEdit(fornecedor)}>
                  <EditIcon />
                </IconButton>
                <IconButton color="secondary" onClick={() => deleteFornecedor(fornecedor.id)}>
                  <DeleteIcon />
                </IconButton>
              </Box>
            </Box>
          ))}
        </Box>
      </DashboardCard>

      <Dialog open={open} onClose={handleClose}>
        <DialogTitle>{editMode ? 'Editar Fornecedor' : 'Criar Fornecedor'}</DialogTitle>
        <DialogContent>
          <TextField
            autoFocus
            margin="dense"
            name="nome"
            label="Nome"
            type="text"
            fullWidth
            value={currentFornecedor.nome}
            onChange={handleChange}
          />
          <TextField
            margin="dense"
            name="email"
            label="Email"
            type="email"
            fullWidth
            value={currentFornecedor.email}
            onChange={handleChange}
          />
          <TextField
            margin="dense"
            name="cnpj"
            label="CNPJ"
            type="text"
            fullWidth
            value={currentFornecedor.cnpj}
            onChange={handleChange}
          />
          <TextField
            margin="dense"
            name="telefone"
            label="Telefone"
            type="text"
            fullWidth
            value={currentFornecedor.telefone}
            onChange={handleChange}
          />
          <TextField
            margin="dense"
            name="tipoProduto"
            label="Tipo de Produto"
            type="text"
            fullWidth
            value={currentFornecedor.tipoProduto}
            onChange={handleChange}
          />
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose} color="primary">
            Cancelar
          </Button>
          <Button onClick={saveFornecedor} color="primary">
            {editMode ? 'Salvar' : 'Criar'}
          </Button>
        </DialogActions>
      </Dialog>
    </PageContainer>
  );
};

export default SamplePage;
