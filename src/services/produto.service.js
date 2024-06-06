import axios from 'axios';
import authHeader from './auth-header';
import axiosInstance from './axiosInstance';

const API_URL = 'http://localhost:8080/api/produtos';

class ProdutoService {
  getAll() {
    return axiosInstance.get(API_URL, { headers: authHeader() });
  }

  create(data) {
    return axiosInstance.post(API_URL, data, { headers: authHeader() });
  }

  update(id, data) {
    return axiosInstance.put(`${API_URL}/${id}`, data, { headers: authHeader() });
  }

  delete(id) {
    return axiosInstance.delete(`${API_URL}/${id}`, { headers: authHeader() });
  }
  getAbaixoDaQuantidadeSegura() {
    return axiosInstance.get(API_URL + '/abaixo-da-quantidade-segura', { headers: authHeader() });
  }

  get(id) {
    return axiosInstance.get(`${API_URL}/${id}`, { headers: authHeader() });
  }

  getSalesData(month) {
    return axiosInstance.get(`${API_URL}/sales-data?month=${month}`, { headers: authHeader() });
  }

  getForaDeEstoque() {
    return axiosInstance.get(`${API_URL}/fora-de-estoque`, { headers: authHeader() });
  }

  getAdequados() {
    return axiosInstance.get(`${API_URL}/adequados`, { headers: authHeader() });
  }

  }


export default new ProdutoService();
