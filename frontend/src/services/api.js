import axios from 'axios';
const API_URL = import.meta.env.VITE_API_URL || 'http://127.0.0.1:8000/api';
const api = axios.create({
  baseURL: API_URL,
  headers: { 'Content-Type': 'application/json' },
});

export const getDevices = () => api.get('/devices');
export const getPresets = () => api.get('/presets');

export const addNewPreset = (data) => api.post('/presets', data);
export const updatePreset = (id, data) => api.put(`/presets/${id}`, data);
export const deletePreset = (id) => api.delete(`/presets/${id}`);

export function extractMessages(error) {
  const { data } = error.response;
  const errors =
    data.errors ?? data.error ?? data.message ?? 'Something went wrong';

  if (Array.isArray(errors)) {
    return errors;
  } else if (typeof errors === 'object' && errors !== null) {
    return Object.values(errors).flat();
  } else {
    return [String(errors)];
  }
}

export default api;
