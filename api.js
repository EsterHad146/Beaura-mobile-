// instalar o axios com npm install axios
import axios from 'axios';

const api = axios.create({
  // Substitua pelo endereço da sua API
  baseURL: 'https://beauraback-production.up.railway.app', 
});

export default api;
