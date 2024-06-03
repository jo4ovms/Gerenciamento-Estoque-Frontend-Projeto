import React, { useState, useEffect } from 'react';
import { Typography, Button, Box, TextField, Dialog, DialogActions, DialogContent, DialogTitle, IconButton } from '@mui/material';
import { Delete as DeleteIcon, Edit as EditIcon } from '@mui/icons-material';
import PageContainer from 'src/components/container/PageContainer';
import DashboardCard from '../../components/shared/DashboardCard';
import ProdutoService from '../../services/produto.service';

const ProdutoPage = () => {
  const [produtos, setProdutos] = useState([]);
  const [open, setOpen] = useState(false);
  const [editMode, setEditMode] = useState(false);
  const [currentProduto, setCurrentProduto] = useState({ id: null, nome: '', valor: '', quantidade: '', fornecedor: '' });

  useEffect(() => {
    retrieveProdutos();
  }, []);

  const retrieveProdutos = () => {
    ProdutoService.getAll()
      .then(response => {
        setProdutos(response.data);
      })
      .catch(e => {
        console.log(e);
      });
  };

  const handleClickOpen = () => {
    setEditMode(false);
    setCurrentProduto({ id: null, nome: '', valor: '', quantidade: '', fornecedor: '' });
    setOpen(true);
  };

  const handleClickEdit = (produto) => {
    setEditMode(true);
    setCurrentProduto(produto);
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setCurrentProduto({ ...currentProduto, [name]: value });
  };

  const saveProduto = () => {
    if (editMode) {
      ProdutoService.update(currentProduto.id, currentProduto)
        .then(response => {
          retrieveProdutos();
          handleClose();
        })
        .catch(e => {
          console.log(e);
        });
    } else {
      ProdutoService.create(currentProduto)
        .then(response => {
          retrieveProdutos();
          handleClose();
        })
        .catch(e => {
          console.log(e);
        });
    }
  };

  const deleteProduto = (id) => {
    ProdutoService.delete(id)
      .then(response => {
        retrieveProdutos();
      })
      .catch(e => {
        console.log(e);
      });
  };

  return (
    <PageContainer title="Produtos" description="Página de gestão de produtos">
      <DashboardCard title="Produtos">
        <Box>
          <Button variant="contained" color="primary" onClick={handleClickOpen}>
            Criar Produto
          </Button>
        </Box>
        <Box mt={2}>
          {produtos.map(produto => (
            <Box key={produto.id} display="flex" alignItems="center" justifyContent="space-between" p={2} borderBottom="1px solid #ccc">
              <Box>
                <Typography variant="h6">{produto.nome}</Typography>
                <Typography variant="body2">Valor: {produto.valor}</Typography>
                <Typography variant="body2">Quantidade: {produto.quantidade}</Typography>
                <Typography variant="body2">Fornecedor: {produto.fornecedor}</Typography>
              </Box>
              <Box>
                <IconButton color="primary" onClick={() => handleClickEdit(produto)}>
                  <EditIcon />
                </IconButton>
                <IconButton color="secondary" onClick={() => deleteProduto(produto.id)}>
                  <DeleteIcon />
                </IconButton>
              </Box>
            </Box>
          ))}
        </Box>
      </DashboardCard>

      <Dialog open={open} onClose={handleClose}>
        <DialogTitle>{editMode ? 'Editar Produto' : 'Criar Produto'}</DialogTitle>
        <DialogContent>
          <TextField
            autoFocus
            margin="dense"
            name="nome"
            label="Nome"
            type="text"
            fullWidth
            value={currentProduto.nome}
            onChange={handleChange}
          />
          <TextField
            margin="dense"
            name="valor"
            label="Valor"
            type="number"
            fullWidth
            value={currentProduto.valor}
            onChange={handleChange}
          />
          <TextField
            margin="dense"
            name="quantidade"
            label="Quantidade"
            type="number"
            fullWidth
            value={currentProduto.quantidade}
            onChange={handleChange}
          />
          <TextField
            margin="dense"
            name="fornecedor"
            label="Fornecedor"
            type="text"
            fullWidth
            value={currentProduto.fornecedor}
            onChange={handleChange}
          />
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose} color="primary">
            Cancelar
          </Button>
          <Button onClick={saveProduto} color="primary">
            {editMode ? 'Salvar' : 'Criar'}
          </Button>
        </DialogActions>
      </Dialog>
    </PageContainer>
  );
};

export default ProdutoPage;
