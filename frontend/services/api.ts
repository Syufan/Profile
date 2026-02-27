// services/api.ts
import axios from 'axios';

const api = axios.create({
  baseURL: process.env.NEXT_PUBLIC_API_URL,
  timeout: 5000,
});

export async function getProfile() {
  try{
    const response = await api.get('/api/');
    return response.data;
  } catch (error) {
    console.error('Failed to fetch profile:', error);
    throw new Error('Failed to fetch profile');
  }
}

export async function getProjects() {
  try{
    const response = await api.get('/api/projects');
    return response.data;
  } catch (error) {
    console.error('Failed to fetch projects:', error);
    throw new Error('Failed to fetch projects');
  }
}
