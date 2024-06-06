import React, { useState, useEffect } from 'react';
import { Typography, Box, TextField, Button, MenuItem, Alert, Autocomplete, Card, CardContent } from '@mui/material';
import ProdutoService from '../../services/produto.service';
import VendaService from '../../services/venda.service';

const RegistrarVenda = () => {
  const [produtos, setProdutos] = useState([]);
  const [selectedProduto, setSelectedProduto] = useState(null);
  const [quantidade, setQuantidade] = useState('');
  const [error, setError] = useState('');
  const [quantidadeDisponivel, setQuantidadeDisponivel] = useState(0);

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

  const handleProdutoChange = (event, value) => {
    setSelectedProduto(value);
    if (value) {
      setQuantidadeDisponivel(value.quantidade);
    } else {
      setQuantidadeDisponivel(0);
    }
  };

  const handleQuantidadeChange = (event) => {
    setQuantidade(event.target.value);
    if (selectedProduto && event.target.value > selectedProduto.quantidade) {
      setError('Quantidade maior que a disponível em estoque');
    } else {
      setError('');
    }
  };

  const handleSubmit = () => {
    if (selectedProduto && quantidade <= selectedProduto.quantidade) {
      const venda = {
        produtoId: selectedProduto.id,
        quantidade: quantidade,
      };

      VendaService.registrarVenda(venda)
        .then(response => {
          alert('Venda registrada com sucesso!');
          setSelectedProduto(null);
          setQuantidade('');
          setQuantidadeDisponivel(0);
          setError('');
          retrieveProdutos();
        })
        .catch(e => {
          console.log(e);
        });
    } else {
      setError('Quantidade maior que a disponível em estoque');
    }
  };

  return (
    <Card>
      <CardContent>
        <Typography variant="h4" fontWeight="700" mb={3}>
          Registrar Venda
        </Typography>
        <Box component="form" noValidate autoComplete="off">
          <Autocomplete
            options={produtos}
            getOptionLabel={(option) => option.nome}
            onChange={handleProdutoChange}
            renderInput={(params) => <TextField {...params} label="Produto" fullWidth margin="normal" />}
          />
          {selectedProduto && (
            <Typography variant="body2" color="textSecondary" mt={1}>
              Quantidade disponível: {quantidadeDisponivel}
            </Typography>
          )}
          <TextField
            label="Quantidade"
            value={quantidade}
            onChange={handleQuantidadeChange}
            type="number"
            fullWidth
            margin="normal"
            error={!!error}
          />
          {error && <Alert severity="error" sx={{ mt: 2 }}>{error}</Alert>}
          <Button variant="contained" color="primary" onClick={handleSubmit} fullWidth sx={{ mt: 2 }}>
            Registrar
          </Button>
        </Box>
      </CardContent>
    </Card>
  );
};

export default RegistrarVenda;
