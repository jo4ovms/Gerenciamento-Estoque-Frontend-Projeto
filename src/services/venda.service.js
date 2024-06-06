import axios from 'axios';
import authHeader from './auth-header';

const API_URL = 'http://localhost:8080/api/vendas';

class VendaService {

  getAll() {
    return axios.get(API_URL, { headers: authHeader() });
  }

  getSalesData(month) {
    return axios.get(`${API_URL}/sales-data?month=${month}`, { headers: authHeader() });
  }

  registrarVenda(venda) {
    return axios.post(API_URL, venda, { headers: authHeader() });
  }

  getItensMaisVendidos() {
    return axios.get(`${API_URL}/itens-mais-vendidos`, { headers: authHeader() });
  }


}

export default new VendaService();
