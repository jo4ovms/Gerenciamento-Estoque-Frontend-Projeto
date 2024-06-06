import axios from 'axios';
import authHeader from './auth-header';

const API_URL = 'http://localhost:8080/api/logs';

class LogService {
  getAll() {
    return axios.get(API_URL, { headers: authHeader() });
  }

  getByDate(startDate, endDate) {
    return axios.get(`${API_URL}/por-data?startDate=${startDate}&endDate=${endDate}`, { headers: authHeader() });
  }
}

export default new LogService();
