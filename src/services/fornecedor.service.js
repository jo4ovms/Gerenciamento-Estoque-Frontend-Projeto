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

  exportFornecedoresToExcel() {
    return axiosInstance.get('http://localhost:8080/api/excel/fornecedores/export', {
      responseType: 'blob',
      headers: authHeader(),
    });
  }

  importFornecedoresFromExcel(file) {
    const formData = new FormData();
    formData.append('file', file);

    return axiosInstance.post('http://localhost:8080/api/excel/fornecedores/import', formData, {
      headers: {
        ...authHeader(),
        'Content-Type': 'multipart/form-data',
      },
    });
  }
}
const FornecedorServiceInstance = new FornecedorService();
export default FornecedorServiceInstance;
