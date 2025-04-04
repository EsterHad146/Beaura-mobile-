// import axios from 'axios';

// const API_URL = axios.create({
//     baseURL: 'http://10.54.46.78:3000' //endereço de IP da máquina
// })

// export default API_URL

// instalar o axios com npm install axios
import axios from 'axios';

const api = axios.create({
  // Substitua pelo endereço da sua API
  baseURL: 'https://beauraback-production.up.railway.app', 
});

export default api;