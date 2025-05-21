import axios from 'axios';

export const api = axios.create({
  baseURL: 'http://127.0.0.1:3450/member',
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
