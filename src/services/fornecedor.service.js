import authHeader from './auth-header';
import axiosInstance from './axiosInstance';

const API_URL = 'http://localhost:8080/api/fornecedores';

class FornecedorService {
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
}

export default new FornecedorService();
