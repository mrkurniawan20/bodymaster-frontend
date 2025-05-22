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
import PaymentPage from './admin/Payment';
import { ProtectedRouteLayoutAdmin } from './ProtectedRouteAdmin';
import MemberList from './admin/MemberList';
import MemberExtend from './admin/MemberExtend';
import { ExpireMemberPage } from './admin/MemberExpired';
import PageTitle from '@/components/PageTitle';

export let router = createBrowserRouter([
  {
    Component: ProtectedRouteLayout,
    children: [
      {
        path: '/landingPage',
        // Component: MemberLandingPage,
        Component: PageTitle(MemberLandingPage, `Body Master | Landing Page`),
      },
      {
        path: '/memberInfo',
        // Component: MemberInfoPage,
        Component: PageTitle(MemberInfoPage, `Body Master | Let's Workout !`),
      },
      {
        path: '/editMember/:id',
        // Component: EditMemberPage,
        Component: PageTitle(EditMemberPage, `Body Master | Edit Profile`),
      },
    ],
  },
  {
    Component: ProtectedRouteLayoutAdmin,
    children: [
      {
        path: '/dashboard',
        Component: PageTitle(AdminDashboard, `Body Master | Admin Dashboard`),
        // Component: AdminDashboard,
      },
      {
        path: '/addmember',
        // Component: AddMember,
        Component: PageTitle(AddMember, `Body Master | Add Member`),
      },
      {
        path: '/visitor',
        // Component: VisitorLog,
        Component: PageTitle(VisitorLog, `Body Master | Visitor Log`),
      },
      {
        path: '/memberlist',
        // Component: MemberList,
        Component: PageTitle(MemberList, `Body Master | List Member`),
      },
      {
        path: '/payment',
        // Component: PaymentPage,
        Component: PageTitle(PaymentPage, `Body Master | Payment`),
      },
      {
        path: '/extendmember',
        // Component: MemberExtend,
        Component: PageTitle(MemberExtend, `Body Master | Extend Member`),
      },
      {
        path: '/expiredmember',
        // Component: ExpireMemberPage,
        Component: PageTitle(ExpireMemberPage, `Body Master | Expired Member`),
      },
    ],
  },
  {
    path: '/',
    // Component: GymLoginMobile,
    Component: PageTitle(GymLoginMobile, `Body Master | Login`),
  },
  {
    path: '*',
    // Component: NotFoundPage,
    Component: PageTitle(NotFoundPage, `Body Master | Not Found`),
  },
]);
