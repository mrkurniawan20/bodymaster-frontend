import axios from 'axios';
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
      console.log(userId);
      axios
        .get(`http://127.0.0.1:3450/member/getmember/${userId}`, { headers: { Authorization: `Bearer ${token}` } })
        // .get(`http://127.0.0.1:3450/member/getmember/${userId}`)
        .then((res) => setUser(res.data))
        // .then(() => console.log('running'))
        .catch((err) => {
          console.log(`Failed to fetch user ${err}`);
          localStorage.removeItem('token');
        })
        .finally(() => setLoading(false));
    } catch (error) {
      console.log('Unable to fetch user');
      localStorage.removeItem('token');
    }
  }, []);
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
      const fetchAllMember = axios.get(`http://127.0.0.1:3450/member/getallmember/`, { headers: { Authorization: `Bearer ${token}` } });
      const fetchVisitLog = axios.get('http://127.0.0.1:3450/member/getvisitlog/', { headers: { Authorization: `Bearer ${token}` } });
      const fetchTodayVisit = axios.get('http://127.0.0.1:3450/member/getTodayVisit/', { headers: { Authorization: `Bearer ${token}` } });
      const fetchAllPayment = axios.get('http://127.0.0.1:3450/member/getpayment/', { headers: { Authorization: `Bearer ${token}` } });
      const fetchAllNotifications = axios.get('http://localhost:3450/member/getnotif', { headers: { Authorization: `Bearer ${token}` } });
      Promise.all([fetchAllMember, fetchVisitLog, fetchTodayVisit, fetchAllPayment, fetchAllNotifications])
        .then(([allMemberRes, visitLogRes, todayVisitRes, allPaymentRes, allNotificationsRes]) => {
          setMember(allMemberRes.data), setVisit(visitLogRes.data), setTodayVisit(todayVisitRes.data), setAllPayment(allPaymentRes.data), setNotifications(allNotificationsRes.data);
        })
        .catch((err) => {
          console.log(`Failed to fetch user ${err}`);
          localStorage.removeItem('token');
        })
        .finally(() => {
          setLoading(false);
        });

      //   axios
      //     .get(`http://127.0.0.1:3450/member/getallmember/`, { headers: { Authorization: `Bearer ${token}` } })
      //     .then((res) => setMember(res.data))
      //     .catch((err) => {
      //       console.log(`Failed to fetch user ${err}`);
      //       localStorage.removeItem('token');
      //     })
      //     .finally(() => setLoading(false));
      //   axios
      //     .get('http://127.0.0.1:3450/member/getvisitlog/')
      //     .then((res) => setVisit(res.data))
      //     .catch((err) => {
      //       console.log(`Failed to fetch user ${err}`);
      //       localStorage.removeItem('token');
      //     })
      //     .finally(() => setLoading(false));
      //   axios
      //     .get('http://127.0.0.1:3450/member/getTodayVisit/')
      //     .then((res) => {
      //       setTodayVisit(res.data);
      //     })
      //     .catch((err) => {
      //       console.log(`Failed to fetch user ${err}`);
      //       localStorage.removeItem('token');
      //     })
      //     .finally(() => setLoading(false));
    } catch (error) {
      console.log('Unable to fetch user');
      localStorage.removeItem('token');
    }
  }, []);
  return { member, visit, todayVisit, allPayment, notifications, loading };
}
