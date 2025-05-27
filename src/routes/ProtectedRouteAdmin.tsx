import { useEffect } from 'react';
import { Navigate, Outlet, useNavigate } from 'react-router-dom';
import { jwtDecode } from 'jwt-decode';
import { useMember } from '@/services/useUser';
import LoadingPage from './LoadingPage';

interface DecodedProps {
  id: number;
  role: string;
  exp: number;
}

export function ProtectedRouteLayoutAdmin() {
  const navigate = useNavigate();
  const token = localStorage.getItem('token');
  if (!token) {
    return <Navigate to={'/'} />;
  }

  const decoded = jwtDecode<DecodedProps>(token!);
  function isTokenExpired(token: string): boolean {
    try {
      const decodedData = jwtDecode<DecodedProps>(token!);
      return decodedData.exp * 1000 < Date.now();
    } catch (error) {
      return true;
    }
  }
  const title = document.title;
  useEffect(() => {
    if (token && isTokenExpired(token)) {
      localStorage.removeItem('token');
      navigate('/login');
    }
  }, [title]);

  const { loading, notifications } = useMember();
  if (loading) {
    return <LoadingPage />;
  }

  if (decoded.role !== 'ADMIN') {
    return <Navigate to={'/'} />;
  } else {
    return <Outlet context={{ notifications }} />;
  }
}
