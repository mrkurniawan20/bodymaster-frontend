import axios from 'axios';

export const api = axios.create({
  baseURL: 'https://bodymaster-backend.vercel.app/member',
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
