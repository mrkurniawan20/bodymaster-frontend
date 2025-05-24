import axios, { type AxiosResponse } from 'axios';
import { jwtDecode } from 'jwt-decode';
import { useEffect, useState } from 'react';

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
      axios
        .get(`https://bodymaster-backend.vercel.app/member/getmember/${userId}`, { headers: { Authorization: `Bearer ${token}` } })
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
  const [member, setMember] = useState<Member[] | null>(null);
  const [visit, setVisit] = useState<Visitor[] | null>(null);
  const [todayVisit, setTodayVisit] = useState<Visitor | null>(null);
  const [allPayment, setAllPayment] = useState<Payment[] | null>(null);
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
      const fetchAllMember = axios.get(`https://bodymaster-backend.vercel.app/member/getallmember/`, { headers: { Authorization: `Bearer ${token}` } });
      const fetchVisitLog = axios.get('https://bodymaster-backend.vercel.app/member/getvisitlog/', { headers: { Authorization: `Bearer ${token}` } });
      const fetchAllPayment = axios.get('https://bodymaster-backend.vercel.app/member/getpayment/', { headers: { Authorization: `Bearer ${token}` } });
      const fetchAllNotifications = axios.get('https://bodymaster-backend.vercel.app/member/getnotif', { headers: { Authorization: `Bearer ${token}` } });
      Promise.all([fetchAllMember, fetchVisitLog, fetchAllPayment, fetchAllNotifications])
        .then(([allMemberRes, visitLogRes, allPaymentRes, allNotificationsRes]) => {
          setMember(allMemberRes.data), setVisit(visitLogRes.data), setAllPayment(allPaymentRes.data), setNotifications(allNotificationsRes.data);
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
  return { member, visit, todayVisit, allPayment, notifications, loading };
}
