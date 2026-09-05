import axios from 'axios';

const api = axios.create({
  baseURL: import.meta.env.VITE_API_URL || 'http://localhost:5000/api',
});

// ---- Placement Drive endpoints ----
export const driveApi = {
  create: (payload) => api.post('/drives', payload),
  getAll: (params) => api.get('/drives', { params }),
  getById: (id) => api.get(`/drives/${id}`),
  update: (id, payload) => api.put(`/drives/${id}`, payload),
  remove: (id) => api.delete(`/drives/${id}`),
};

export default api;
