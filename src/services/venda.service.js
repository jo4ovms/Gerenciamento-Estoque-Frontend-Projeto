import axiosInstance from './axiosInstance';
import authHeader from './auth-header';

const API_URL = 'http://localhost:8080/api/vendas';

class VendaService {

  getAll() {
    return axiosInstance.get(API_URL, { headers: authHeader() });
  }

  getSalesData(month) {
    return axiosInstance.get(`${API_URL}/sales-data?month=${month}`, { headers: authHeader() });
  }

  registrarVenda(venda) {
    return axiosInstance.post(API_URL, venda, { headers: authHeader() });
  }

  getItensMaisVendidos() {
    return axiosInstance.get(`${API_URL}/itens-mais-vendidos`, { headers: authHeader() });
  }


}

const vendaServiceInstance = new VendaService();
export default vendaServiceInstance;
