import axios from 'axios';
import authHeader from './auth-header';

const API_URL = 'http://localhost:8080/api/vendas';

class VendaService {
  getSalesData(month) {
    return axios.get(`${API_URL}/sales-data?month=${month}`, { headers: authHeader() });
  }

  registrarVenda(data) {
    return axios.post(API_URL, data, { headers: authHeader() });
  }

  getItensMaisVendidos() {
    return axios.get(`${API_URL}/itens-mais-vendidos`, { headers: authHeader() });
  }

}

export default new VendaService();
