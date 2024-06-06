import axiosInstance from './axiosInstance';
import authHeader from './auth-header';

const API_URL = 'http://localhost:8080/api/logs';

class LogService {
  getAll() {
    return axiosInstance.get(API_URL, { headers: authHeader() });
  }

  getByDate(startDate, endDate) {
    return axiosInstance.get(`${API_URL}/por-data?startDate=${startDate}&endDate=${endDate}`, { headers: authHeader() });
  }
}

export default new LogService();
