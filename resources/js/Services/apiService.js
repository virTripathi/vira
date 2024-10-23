// resources/js/Services/apiService.js
import axios from 'axios';

// Optionally set up default headers, such as for CSRF or Authorization
axios.defaults.headers.common['X-CSRF-TOKEN'] = document.querySelector('meta[name="csrf-token"]').getAttribute('content');
axios.defaults.headers.common['Authorization'] = `Bearer ${localStorage.getItem('token')}`;

const apiService = {
  get: async (url) => {
  
  },
  post: async (url, data) => {
  
  },
};

export default apiService;
