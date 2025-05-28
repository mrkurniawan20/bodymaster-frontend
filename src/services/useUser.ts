import { type AxiosResponse } from 'axios';
import { jwtDecode } from 'jwt-decode';
import { useEffect, useState } from 'react';
import { api } from './api';

interface Decoded {
  id: number;
}
export interface Member {
  id: number;
  name: string;
  phone: string;
  image: string;
  expireDate: Date;
  status: string;
  visit: Visitor[];
}
export interface Visitor {
  id: number;
  member: Member;
  memberId: number;
  visitedAt: Date;
}
export interface Payment {
  id: number;
  amount: number;
  name: string;
  member: Member;
  memberId: number;
  method: string;
  paymentAt: Date;
}
export interface MemberProps {
  user: Member;
}

export interface Notifications {
  id: number;
  content: string;
  createdAt: Date;
  readStatus: 'READ' | 'UNREAD';
}

export function useUser() {
  const [user, setUser] = useState<Member | null>(null);
  const [loading, setLoading] = useState(true);
  useEffect(() => {
    const token = localStorage.getItem('token');
    if (!token) {
      setLoading(false);
      return;
    }
    try {
      const decoded = jwtDecode<Decoded>(token);
      const userId = decoded.id;
      api
        .get(`/getmember/${userId}`, { headers: { Authorization: `Bearer ${token}` } })
        .then((res: AxiosResponse) => setUser(res.data))
        .catch(() => {
          localStorage.removeItem('token');
        })
        .finally(() => setLoading(false));
    } catch (error) {
      localStorage.removeItem('token');
    }
  }, [loading]);
  return { user, loading };
}

export function useMember() {
  const [notifications, setNotifications] = useState<Notifications[] | null>(null);
  const [loading, setLoading] = useState(true);
  useEffect(() => {
    const token = localStorage.getItem('token');
    if (!token) {
      setLoading(false);
      return;
    }
    try {
      setLoading(true);
      const fetchAllNotifications = api.get('/getnotif', { headers: { Authorization: `Bearer ${token}` } });
      Promise.all([fetchAllNotifications])
        .then(([allNotificationsRes]) => {
          setNotifications(allNotificationsRes.data);
        })
        .catch(() => {
          localStorage.removeItem('token');
        })
        .finally(() => {
          setLoading(false);
        });
    } catch (error) {
      localStorage.removeItem('token');
    }
  }, []);
  return { notifications, loading };
}
