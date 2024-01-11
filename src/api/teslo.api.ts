import axios from 'axios';
import { useAuthStore } from '../stores';




const baseURL = 'http://localhost:3000/api'


const tesloApi = axios.create({
  baseURL,
})

// Todo: interceptors
// Leer el stpre de zustand
tesloApi.interceptors.request.use(
  (config) => {
    const token = useAuthStore.getState().token;

    console.log(token);
    
    if (token) {
      config.headers['Authorization'] = `Bearer ${token}`
    }

    return config;
  }
)

export default tesloApi