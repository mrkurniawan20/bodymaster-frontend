import { createBrowserRouter } from 'react-router-dom';
import ProtectedRouteLayout from './ProtectedRoute';
import MemberLandingPage from './user/MemberLandingPage';
import { MemberInfoPage } from './user/MemberInfo';
import GymLoginMobile from './user/MemberLogin';
import EditMemberPage from './user/MemberEdit';
import NotFoundPage from './NotFound';
import { AdminDashboard } from './admin/AdminDashBoard';
import AddMember from './admin/AddMember';
import VisitorLog from './admin/VisitorLog';
import MemberListDummy from './admin/MemberListDummy';
import PaymentPage from './admin/Payment';
import { ProtectedRouteLayoutAdmin } from './ProtectedRouteAdmin';
import MemberList from './admin/MemberList';
import MemberExtend from './admin/MemberExtend';
import { ExpireMemberPage } from './admin/MemberExpired';

export let router = createBrowserRouter([
  {
    Component: ProtectedRouteLayout,
    children: [
      {
        path: '/landingPage',
        Component: MemberLandingPage,
      },
      {
        path: '/memberInfo',
        Component: MemberInfoPage,
      },
      {
        path: '/editMember/:id',
        Component: EditMemberPage,
      },
    ],
  },
  {
    Component: ProtectedRouteLayoutAdmin,
    children: [
      {
        path: '/dashboard',
        Component: AdminDashboard,
      },
      {
        path: '/addmember',
        Component: AddMember,
      },
      {
        path: '/visitor',
        Component: VisitorLog,
      },
      {
        path: '/memberlist',
        Component: MemberList,
      },
      {
        path: '/payment',
        Component: PaymentPage,
      },
      {
        path: '/extendmember',
        Component: MemberExtend,
      },
      {
        path: '/expiredmember',
        Component: ExpireMemberPage,
      },
    ],
  },
  {
    path: '/',
    Component: GymLoginMobile,
  },
  {
    path: '*',
    Component: NotFoundPage,
  },
]);
