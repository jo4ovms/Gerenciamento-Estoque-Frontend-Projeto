import React, { useState, useEffect } from 'react';
import { Typography, Button, Box, TextField, Dialog, DialogActions, DialogContent, DialogTitle, IconButton, FormControl, InputLabel, Select, MenuItem } from '@mui/material';
import { Delete as DeleteIcon, Edit as EditIcon, Warning as WarningIcon } from '@mui/icons-material';
import PageContainer from 'src/components/container/PageContainer';
import DashboardCard from '../../components/shared/DashboardCard';
import ProdutoService from '../../services/produto.service';
import ImportExportButtons from '../dashboard/components/ImportExportButtons';

const ProdutoPage = () => {
  const [produtos, setProdutos] = useState([]);
  const [open, setOpen] = useState(false);
  const [editMode, setEditMode] = useState(false);
  const [currentProduto, setCurrentProduto] = useState({ id: null, nome: '', valor: '', quantidade: '', fornecedor: '' });
  const [searchTerm, setSearchTerm] = useState('');
  const [filterFornecedor, setFilterFornecedor] = useState('');
  const [filterValor, setFilterValor] = useState('');
  const [filterQuantidade, setFilterQuantidade] = useState('');

  useEffect(() => {
    retrieveProdutos();
  }, []);

  const retrieveProdutos = () => {
    ProdutoService.getAll()
      .then(response => setProdutos(response.data))
      .catch(console.log);
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

  const handleClose = () => setOpen(false);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setCurrentProduto(prev => ({ ...prev, [name]: value }));
  };

  const handleSearchChange = (event) => setSearchTerm(event.target.value);

  const handleFilterChange = (setter) => (event) => setter(event.target.value);

  const saveProduto = () => {
    if (editMode) {
      ProdutoService.update(currentProduto.id, currentProduto)
        .then(retrieveProdutos)
        .catch(console.log)
        .finally(handleClose);
    } else {
      ProdutoService.create(currentProduto)
        .then(retrieveProdutos)
        .catch(console.log)
        .finally(handleClose);
    }
  };

  const deleteProduto = (id) => {
    ProdutoService.delete(id)
      .then(retrieveProdutos)
      .catch(console.log);
  };

  const filteredProdutos = produtos.filter(produto =>
    produto.nome.toLowerCase().includes(searchTerm.toLowerCase()) &&
    (filterFornecedor === '' || produto.fornecedor === filterFornecedor) &&
    (filterValor === '' || produto.valor <= parseFloat(filterValor)) &&
    (filterQuantidade === '' || produto.quantidade <= parseInt(filterQuantidade, 10))
  );

  return (
    <PageContainer title="Produtos" description="Página de gestão de produtos">
      <DashboardCard title="Produtos">
        <Box display="flex" justifyContent="space-between" alignItems="center" mb={2}>
          <Box display="flex" gap={2}>
            <TextField
              label="Pesquisar Produto"
              variant="outlined"
              value={searchTerm}
              onChange={handleSearchChange}
              sx={{ marginBottom: 2 }}
            />
            <FormControl sx={{ marginBottom: 2, minWidth: 200 }}>
              <InputLabel id="filter-fornecedor-label">Fornecedor</InputLabel>
              <Select
                labelId="filter-fornecedor-label"
                id="filter-fornecedor"
                value={filterFornecedor}
                label="Fornecedor"
                onChange={handleFilterChange(setFilterFornecedor)}
              >
                <MenuItem value="">
                  <em>Todos</em>
                </MenuItem>
                {Array.from(new Set(produtos.map(p => p.fornecedor))).map((fornecedor, index) => (
                  <MenuItem key={index} value={fornecedor}>{fornecedor}</MenuItem>
                ))}
              </Select>
            </FormControl>
            <TextField
              label="Valor Máximo"
              variant="outlined"
              value={filterValor}
              onChange={handleFilterChange(setFilterValor)}
              sx={{ marginBottom: 2 }}
            />
            <TextField
              label="Quantidade Máxima"
              variant="outlined"
              value={filterQuantidade}
              onChange={handleFilterChange(setFilterQuantidade)}
              sx={{ marginBottom: 2 }}
            />
          </Box>
          <Button variant="contained" color="primary" onClick={handleClickOpen} sx={{ marginBottom: 2 }}>
            Criar Produto
          </Button>
          <Box sx={{ display: 'flex', justifyContent: 'center', position: 'relative', top: '-8px' }}>
            <ImportExportButtons iconSize={35} iconStyle={{ color: 'green' }} containerStyle={{ display: 'flex', justifyContent: 'center' }} />
          </Box>
        </Box>
        <Box mt={2}>
          {filteredProdutos.length > 0 ? (
            filteredProdutos.map(produto => (
              <Box key={produto.id} display="flex" alignItems="center" justifyContent="space-between" p={2} borderBottom="1px solid #ccc">
                <Box>
                  <Typography variant="h6">{produto.nome}</Typography>
                  <Typography variant="body2">Valor: {produto.valor}</Typography>
                  <Typography variant="body2">Quantidade: {produto.quantidade}</Typography>
                  <Typography variant="body2">Fornecedor: {produto.fornecedor}</Typography>
                </Box>
                <Box display="flex" alignItems="center">
                  {produto.quantidade < 5 && (
                    <WarningIcon color="error" sx={{ marginRight: 1 }} />
                  )}
                  <IconButton color="primary" onClick={() => handleClickEdit(produto)}>
                    <EditIcon />
                  </IconButton>
                  <IconButton color="secondary" onClick={() => deleteProduto(produto.id)}>
                    <DeleteIcon />
                  </IconButton>
                </Box>
              </Box>
            ))
          ) : (
            <Typography variant="h7">Nenhum produto registrado ainda.</Typography>
          )}
        </Box>
      </DashboardCard>

      <Dialog open={open} onClose={handleClose}>
        <DialogTitle>{editMode ? 'Editar Produto' : 'Criar Produto'}</DialogTitle>
        <DialogContent>
          <TextField autoFocus margin="dense" name="nome" label="Nome" type="text" fullWidth value={currentProduto.nome} onChange={handleChange} />
          <TextField margin="dense" name="valor" label="Valor" type="number" fullWidth value={currentProduto.valor} onChange={handleChange} />
          <TextField margin="dense" name="quantidade" label="Quantidade" type="number" fullWidth value={currentProduto.quantidade} onChange={handleChange} />
          <TextField margin="dense" name="fornecedor" label="Fornecedor" type="text" fullWidth value={currentProduto.fornecedor} onChange={handleChange} />
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
