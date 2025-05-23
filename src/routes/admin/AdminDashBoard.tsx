import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Users, CalendarDays, Bell } from 'lucide-react';
import { Drawer, DrawerTrigger, DrawerContent, DrawerHeader, DrawerTitle } from '@/components/ui/drawer';
import { NavLink, useOutletContext } from 'react-router-dom';
import type { Member, Notifications } from '@/services/useUser';
import { useState } from 'react';
import { GoDotFill } from 'react-icons/go';

// export interface Member {
//   id: number;
//   name: string;
//   phone: string;
//   image: string;
//   expireDate: string;
//   status: string;
// }

export interface Visit {
  id: number;
  memberId: number;
  visitedAt: Date;
}

// const getRelativeDateLabel = (dateStr: string): string => {
//   const today = new Date();
//   const target = new Date(dateStr);
//   const diffTime = today.getTime() - target.getTime();
//   const diffDays = Math.floor(diffTime / (1000 * 60 * 60 * 24));

//   if (diffDays === 0) return 'Today';
//   if (diffDays === 1) return 'Yesterday';

//   return target.toLocaleDateString('en-US', {
//     month: 'short',
//     day: 'numeric',
//     year: today.getFullYear() !== target.getFullYear() ? 'numeric' : undefined,
//   });
// };

// const groupByDate = (members: typeof expiredMembers) => {
//   return members.reduce<Record<string, typeof expiredMembers>>((acc, member) => {
//     const label = getRelativeDateLabel(member.expiredAt);
//     if (!acc[label]) acc[label] = [];
//     acc[label].push(member);
//     return acc;
//   }, {});
// };

export function AdminDashboard() {
  const { member } = useOutletContext<{ member: Member[] }>();
  const { notifications } = useOutletContext<{ notifications: Notifications[] }>();

  const inactiveMember = member.filter((obj) => obj.status == `INACTIVE`).length;
  const activeMember = member.length - inactiveMember;
  const [readNotif, setReadNotif] = useState(false);
  function handleNotifClick() {
    setReadNotif(true);
  }
  const visitToday = member.filter((member) => member.visit.length > 0);
  const amountVisitToday = visitToday.length;

  return (
    <div className="min-h-screen bg-gray-100 px-4 py-6 space-y-4">
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
            <div className="p-4 space-y-4 max-h-[300px] overflow-y-auto">
              {notifications.map((notif) => (
                <NavLink to={'/expiredmember'} key={notif.id}>
                  <p className="text-sm font-medium text-gray-800">
                    {new Date(notif.createdAt).toLocaleDateString('id-ID', {
                      day: 'numeric',
                      month: 'long',
                      year: 'numeric',
                    })}
                  </p>
                  <p className="text-xs text-gray-500">{notif.content}</p>
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
                <p className="text-xl font-semibold">{amountVisitToday}</p>
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
