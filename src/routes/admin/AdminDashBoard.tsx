import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Users, CalendarDays, Bell } from 'lucide-react';
import { Drawer, DrawerTrigger, DrawerContent, DrawerHeader, DrawerTitle } from '@/components/ui/drawer';
import { NavLink, useOutletContext } from 'react-router-dom';
import type { Notifications } from '@/services/useUser';
import { useEffect, useState } from 'react';
import { GoDotFill } from 'react-icons/go';
import LoadingPage from '../LoadingPage';
import { api } from '@/services/api';

export function AdminDashboard() {
  const token = localStorage.getItem('token');

  const { notifications } = useOutletContext<{ notifications: Notifications[] }>();
  const [loading, setLoading] = useState(false);
  const [activeMember, setActiveMember] = useState(0);
  const [todayVisit, setTodayVisit] = useState(0);
  useEffect(() => {
    async function fetchData() {
      setLoading(true);
      try {
        const res = await api.get('/getactivecount', { headers: { Authorization: `Bearer ${token}` } });
        setActiveMember(res.data.activeMember);
        setTodayVisit(res.data.todayVisitMember);
      } catch (error) {
        console.error(error);
      } finally {
        setLoading(false);
      }
    }
    fetchData();
  }, []);
  const [readNotif, setReadNotif] = useState(false);
  function handleNotifClick() {
    setReadNotif(true);
  }

  return (
    <div className="min-h-screen bg-gray-100 px-4 py-6 space-y-4">
      {loading && <LoadingPage />}
      {!readNotif && (
        <div className="absolute right-2.5 top-8.5 text-center items-center">
          <GoDotFill className="text-red-500 size-7" />
        </div>
      )}
      <div className="flex justify-between items-center">
        <h1 className="text-xl font-bold">Body Master Dashboard</h1>
        <Drawer>
          <DrawerTrigger asChild>
            <Button variant="ghost" size="icon" onClick={handleNotifClick}>
              <Bell className="size-6" />
            </Button>
          </DrawerTrigger>
          <DrawerContent>
            <DrawerHeader>
              <DrawerTitle>Expired Members</DrawerTitle>
            </DrawerHeader>
            <div className="p-4 pb-0 space-y-4 max-h-[350px] overflow-y-auto">
              {notifications.map((notif) => (
                <NavLink to={'/expiredmember'} key={notif.id}>
                  <p className="text-sm font-medium text-gray-800">
                    {new Date(notif.createdAt).toLocaleDateString('id-ID', {
                      day: 'numeric',
                      month: 'long',
                      year: 'numeric',
                    })}
                  </p>
                  <p className="text-xs text-gray-500 mb-4">{notif.content}</p>
                </NavLink>
              ))}
            </div>
          </DrawerContent>
        </Drawer>
      </div>

      <div className="space-y-4">
        <Card className="bg-white">
          <CardContent className="py-4 px-4 flex items-center justify-between">
            <div>
              <p className="text-sm text-gray-500">Active Members</p>
              <p className="text-xl font-semibold">{activeMember}</p>
            </div>
            <Users className="h-6 w-6 text-gray-400" />
          </CardContent>
        </Card>

        <NavLink to={'/visitor'}>
          <Card className="bg-white">
            <CardContent className="py-4 px-4 flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-500">Visits Today</p>
                <p className="text-xl font-semibold">{todayVisit}</p>
              </div>
              <CalendarDays className="h-6 w-6 text-gray-400" />
            </CardContent>
          </Card>
        </NavLink>
      </div>

      <div className="grid grid-cols-2 gap-4 mt-4">
        <NavLink to={'/payment'}>
          <Button className="w-full" variant="secondary">
            Payment Log
          </Button>
        </NavLink>
        <NavLink to={'/extendmember'}>
          <Button className="w-full" variant="secondary">
            Extend Member
          </Button>
        </NavLink>
        <NavLink to={'/memberlist'}>
          <Button className="w-full" variant="secondary">
            Member List
          </Button>
        </NavLink>
        <NavLink to={'/addmember'}>
          <Button className="w-full" variant="secondary">
            Add Member
          </Button>
        </NavLink>
      </div>
    </div>
  );
}
