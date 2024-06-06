import axios from 'axios';
import authHeader from './auth-header';

const API_URL = 'http://localhost:8080/api/produtos';

class ProdutoService {
  getAll() {
    return axios.get(API_URL, { headers: authHeader() });
  }

  create(data) {
    return axios.post(API_URL, data, { headers: authHeader() });
  }

  update(id, data) {
    return axios.put(`${API_URL}/${id}`, data, { headers: authHeader() });
  }

  delete(id) {
    return axios.delete(`${API_URL}/${id}`, { headers: authHeader() });
  }
  getAbaixoDaQuantidadeSegura() {
    return axios.get(API_URL + '/abaixo-da-quantidade-segura', { headers: authHeader() });
  }

  get(id) {
    return axios.get(`${API_URL}/${id}`, { headers: authHeader() });
  }

  getSalesData(month) {
    return axios.get(`${API_URL}/sales-data?month=${month}`, { headers: authHeader() });
  }

  getForaDeEstoque() {
    return axios.get(`${API_URL}/fora-de-estoque`, { headers: authHeader() });
  }

  getAdequados() {
    return axios.get(`${API_URL}/adequados`, { headers: authHeader() });
  }

  }


export default new ProdutoService();
