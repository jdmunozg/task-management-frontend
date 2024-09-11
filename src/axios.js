import axios from 'axios';

const instance = axios.create({
  baseURL: 'http://localhost:8000/api', // URL del backend Laravel
  headers: {
    Authorization: `Bearer ${localStorage.getItem('token')}`
  }
});

export default instance;
