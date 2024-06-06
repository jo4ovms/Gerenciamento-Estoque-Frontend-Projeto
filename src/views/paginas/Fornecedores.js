import React, { useState, useEffect } from 'react';
import { Typography, Button, Box, TextField, Dialog, DialogActions, DialogContent, DialogTitle, IconButton, FormControl, InputLabel, Select, MenuItem } from '@mui/material';
import { Delete as DeleteIcon, Edit as EditIcon, Add as AddIcon, List as ListIcon } from '@mui/icons-material';
import PageContainer from 'src/components/container/PageContainer';
import DashboardCard from '../../components/shared/DashboardCard';
import FornecedorService from '../../services/fornecedor.service';
import ProdutoService from '../../services/produto.service';

const FornecedorPage = () => {
  const [fornecedores, setFornecedores] = useState([]);
  const [open, setOpen] = useState(false);
  const [openProduto, setOpenProduto] = useState(false);
  const [editMode, setEditMode] = useState(false);
  const [currentFornecedor, setCurrentFornecedor] = useState({ id: null, nome: '', email: '', cnpj: '', telefone: '', tipoProduto: '' });
  const [currentProduto, setCurrentProduto] = useState({ id: null, nome: '', valor: '', quantidade: '', fornecedor: '' });
  const [produtos, setProdutos] = useState([]);
  const [visibleProducts, setVisibleProducts] = useState({});
  const [searchTerm, setSearchTerm] = useState('');
  const [filterTipoProduto, setFilterTipoProduto] = useState('');

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

  const retrieveProdutos = (fornecedor) => {
    ProdutoService.getAll()
      .then(response => {
        const produtosDoFornecedor = response.data.filter(produto => produto.fornecedor === fornecedor.nome);
        setProdutos(produtosDoFornecedor);
        setVisibleProducts(prev => ({ ...prev, [fornecedor.id]: true }));
      })
      .catch(e => {
        console.log(e);
      });
  };

  const handleSearchChange = (e) => {
    setSearchTerm(e.target.value);
  };

  const handleFilterTipoProdutoChange = (e) => {
    setFilterTipoProduto(e.target.value);
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

  const handleClickCreateProduct = (fornecedor) => {
    setCurrentProduto({ id: null, nome: '', valor: '', quantidade: '', fornecedor: fornecedor.nome });
    setOpenProduto(true);
  };

  const handleClickShowProducts = (fornecedor) => {
    if (visibleProducts[fornecedor.id]) {
      setVisibleProducts(prev => ({ ...prev, [fornecedor.id]: false }));
    } else {
      retrieveProdutos(fornecedor);
      setCurrentFornecedor(fornecedor);
    }
  };

  const handleClose = () => {
    setOpen(false);
  };

  const handleCloseProduto = () => {
    setOpenProduto(false);
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setCurrentFornecedor({ ...currentFornecedor, [name]: value });
  };

  const handleChangeProduto = (e) => {
    const { name, value } = e.target;
    setCurrentProduto({ ...currentProduto, [name]: value });
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

  const saveProduto = () => {
    ProdutoService.create(currentProduto)
      .then(response => {
        handleCloseProduto();
      })
      .catch(e => {
        console.log(e);
      });
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

  const filteredFornecedores = fornecedores.filter(fornecedor =>
    fornecedor.nome.toLowerCase().includes(searchTerm.toLowerCase()) &&
    (filterTipoProduto === '' || fornecedor.tipoProduto === filterTipoProduto)
  );

  return (
    <PageContainer title="Fornecedores" description="this is Sample page">
      <DashboardCard title="Fornecedores">
      <Box display="flex" justifyContent="space-between" alignItems="center">
  <Box display="flex" gap={2}>
    <FormControl sx={{ marginBottom: 2, minWidth: 200 }}>
      <InputLabel id="filter-tipo-produto-label">Tipo de Produto</InputLabel>
      <Select
        labelId="filter-tipo-produto-label"
        id="filter-tipo-produto"
        value={filterTipoProduto}
        label="Tipo de Produto"
        onChange={handleFilterTipoProdutoChange}
      >
        <MenuItem value="">
          <em>Todos</em>
        </MenuItem>
        {Array.from(new Set(fornecedores.map(f => f.tipoProduto))).map((tipoProduto, index) => (
          <MenuItem key={index} value={tipoProduto}>{tipoProduto}</MenuItem>
        ))}
      </Select>
    </FormControl>
    <TextField
      label="Pesquisar Fornecedor"
      variant="outlined"
      value={searchTerm}
      onChange={handleSearchChange}
      sx={{ marginBottom: 2, minWidth: 200 }}
    />
  </Box>
  <Button variant="contained" color="primary" onClick={handleClickOpen}>
    Criar Fornecedor
  </Button>
</Box>
        <Box mt={2}>
          {filteredFornecedores.map(fornecedor => (
            <Box key={fornecedor.id} display="flex" flexDirection="column" borderBottom="1px solid #ccc" mb={2}>
              <Box display="flex" alignItems="center" justifyContent="space-between" p={2}>
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
                  <IconButton color="primary" onClick={() => handleClickCreateProduct(fornecedor)}>
                    <AddIcon />
                  </IconButton>
                  <IconButton color="primary" onClick={() => handleClickShowProducts(fornecedor)}>
                    <ListIcon />
                  </IconButton>
                </Box>
              </Box>
              {visibleProducts[fornecedor.id] && (
                <Box mt={2} pl={2} pr={2} pb={2}>
                  {produtos.length > 0 ? (
                    produtos.map(produto => (
                      <Box key={produto.id} display="flex" alignItems="center" justifyContent="space-between" p={2} borderBottom="1px solid #ccc">
                        <Box>
                          <Typography variant="h6">{produto.nome}</Typography>
                          <Typography variant="body2">Valor: {produto.valor}</Typography>
                          <Typography variant="body2">Quantidade: {produto.quantidade}</Typography>
                          <Typography variant="body2">Fornecedor: {produto.fornecedor}</Typography>
                        </Box>
                      </Box>
                    ))
                  ) : (
                    <Typography variant="body2">Nenhum produto encontrado</Typography>
                  )}
                </Box>
              )}
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

      <Dialog open={openProduto} onClose={handleCloseProduto}>
        <DialogTitle>Criar Produto para {currentProduto.fornecedor}</DialogTitle>
        <DialogContent>
          <TextField
            autoFocus
            margin="dense"
            name="nome"
            label="Nome"
            type="text"
            fullWidth
            value={currentProduto.nome}
            onChange={handleChangeProduto}
          />
          <TextField
            margin="dense"
            name="valor"
            label="Valor"
            type="number"
            fullWidth
            value={currentProduto.valor}
            onChange={handleChangeProduto}
          />
          <TextField
            margin="dense"
            name="quantidade"
            label="Quantidade"
            type="number"
            fullWidth
            value={currentProduto.quantidade}
            onChange={handleChangeProduto}
          />
        </DialogContent>
        <DialogActions>
          <Button onClick={handleCloseProduto} color="primary">
            Cancelar
          </Button>
          <Button onClick={saveProduto} color="primary">
            Criar
          </Button>
        </DialogActions>
      </Dialog>
    </PageContainer>
  );
};

export default FornecedorPage;
