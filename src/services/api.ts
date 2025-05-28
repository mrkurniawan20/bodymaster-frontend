import axios from 'axios';

export const api = axios.create({
  baseURL: import.meta.env.VITE_BASE_URL,
});

export function getMember(id: string) {
  return api.get(`/getmember/${id}`);
}

export function loginMember(formData: any) {
  return api.post('/loginmember', formData);
}

export function getAllMember() {
  return api.get('/getAllMember');
}
