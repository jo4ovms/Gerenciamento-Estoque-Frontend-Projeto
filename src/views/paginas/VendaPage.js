import React, { useState, useEffect } from 'react';
import { Box, Button, TextField, Typography, Autocomplete, Alert, Snackbar, SnackbarContent } from '@mui/material';
import ProdutoService from '../../services/produto.service';
import VendaService from '../../services/venda.service';
import DashboardCard from '../../components/shared/DashboardCard';

const VendaPage = () => {
  const [produtos, setProdutos] = useState([]);
  const [selectedProduto, setSelectedProduto] = useState(null);
  const [quantidade, setQuantidade] = useState('');
  const [error, setError] = useState('');
  const [success, setSuccess] = useState(false); // Boolean to control Snackbar visibility

  useEffect(() => {
    ProdutoService.getAll()
      .then(response => {
        setProdutos(response.data);
      })
      .catch(e => {
        console.log(e);
      });
  }, []);

  const handleProdutoChange = (event, value) => {
    setSelectedProduto(value);
    setError('');
    setSuccess(false);
  };

  const handleQuantidadeChange = (event) => {
    setQuantidade(event.target.value);
    setError('');
    setSuccess(false);
  };

  const handleSubmit = () => {
    if (!selectedProduto || !quantidade) {
      setError('Selecione um produto e insira a quantidade.');
      return;
    }

    if (quantidade > selectedProduto.quantidade) {
      setError('Quantidade maior que o estoque disponível.');
      return;
    }

    VendaService.registrarVenda({ produtoId: selectedProduto.id, quantidade })
      .then(() => {
        // Atualizar quantidade disponível do produto selecionado
        const updatedProduto = { ...selectedProduto, quantidade: selectedProduto.quantidade - quantidade };
        setSelectedProduto(updatedProduto);

        setSuccess(true);
        setError('');
        setQuantidade(''); // Limpar a quantidade após o registro da venda
      })
      .catch(e => {
        console.log(e);
        setError('Erro ao registrar venda.');
      });
  };

  const handleCloseSnackbar = () => {
    setSuccess(false);
  };

  return (
    <DashboardCard title="Registrar Venda" sx={{ maxWidth: '600px', mx: 'auto', mt: 4 }}>
      <Box display="flex" flexDirection="column" gap={2}>
        <Autocomplete
          options={produtos}
          getOptionLabel={(option) => option.nome}
          onChange={handleProdutoChange}
          renderInput={(params) => <TextField {...params} label="Produto" variant="outlined" />}
        />
        {selectedProduto && (
          <Typography variant="body2" color="textSecondary">
            Quantidade disponível: {selectedProduto.quantidade}
          </Typography>
        )}
        <TextField
          label="Quantidade"
          variant="outlined"
          type="number"
          value={quantidade}
          onChange={handleQuantidadeChange}
        />
        {error && <Alert severity="error">{error}</Alert>}
        <Button variant="contained" color="primary" onClick={handleSubmit}>
          Registrar Venda
        </Button>
        <Snackbar
          open={success}
          autoHideDuration={6000}
          onClose={handleCloseSnackbar}
          anchorOrigin={{ vertical: 'bottom', horizontal: 'right' }} // Define a posição para o canto inferior direito
        >
          <SnackbarContent
            message={
              <Box display="flex" justifyContent="center" alignItems="center" width="150%">
                Venda registrada com sucesso!
              </Box>
            }
          />
        </Snackbar>
      </Box>
    </DashboardCard>
  );
};

export default VendaPage;
