// services/api.ts
import axios from 'axios';

const api = axios.create({
  baseURL: process.env.NEXT_PUBLIC_API_URL,
});

export async function getProfile() {
  const response = await api.get('/api/');
  return response.data;
}
