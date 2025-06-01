import './App.css';
import React from 'react';
import {createBrowserRouter, RouterProvider} from "react-router-dom";
import LoginPage from './pages/Login/LoginPage'; 
import LoginMainPage from './pages/Login/LoginMainPage';
import ProfileSettingPage from './pages/ProfileSetting/ProfileSettingPage';
import HomePage from './pages/Home/HomePage';
import MyPage from './pages/MyPage/MyPage';
import FamilyPage from './pages/Family/FamilyPage';
import CalendarPage from './pages/Calendar/CalendarPage';
import CommunityPage from './pages/Community/CommunityPage';
import CommunityPostPage from './pages/Community/CommunityPostPage';
import EmergencyPage from './pages/Emergency/EmergencyPage';
import ReservationPage from './pages/Reservation/ReservationPage';
import StatisticsPage from './pages/Statistics/StatisticsPage';
import NotificationPage from './pages/Notification/NotificationPage';
import SignUpPage from './pages/SignUp/SignUpPage';
import MainLayout from './layout/MainLayout';
import LoginLayout from './layout/LoginLayout';
import KakaoLoginRedirectPage from './pages/Login/KakaoLoginRedirectPage';
import NaverLoginRedirectPage from './pages/Login/NaverLoginRedirectPage';
import GoogleLoginRedirectPage from './pages/Login/GoogleLoginRedirectPage';
import LoginSuccessPage from './pages/Login/LoginSuccessPage';
import LoginFailPage from './pages/Login/LoginFailPage';
import NotFound from './pages/Error/ErrorPage';
import { AuthProvider } from './context/AuthContext';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';

const router = createBrowserRouter([
  {
    path: '/',
    element: <LoginMainPage />
  },
  {
      element: <MainLayout/>,
      errorElement: <NotFound/>,
      children: [
          {
            path:'home',
            element:<HomePage/>,
          },
          {
            path:'community',
            element:<CommunityPage/>,
          },
           {
            path: 'community/post',
            element: <CommunityPostPage />,
          },
          {
            path:'reservation',
            element:<ReservationPage/>,
          },
          {
            path:'family',
            element:<FamilyPage/>,
          },
          {
            path:'mypage',
            element:<MyPage/>,
          },
          {
            path:'statistics',
            element:<StatisticsPage/>,
          },
          {
            path:'calendar',
            element:<CalendarPage/>,
          },
          {
            path:'notification',
            element:<NotificationPage/>,
          },
      ]
  },
  {
      element: <LoginLayout/>,
      children: [
          {
            path: 'login',
            element: <LoginPage/>
          },
          {
            path: "signup",
            element: <SignUpPage/>
          },
          {
            path: 'login-success/kakao',
            element: <KakaoLoginRedirectPage />,
          },
          {
            path: 'login-success/naver',
            element: <NaverLoginRedirectPage />,
          },
          {
            path: 'login-success/google',
            element: <GoogleLoginRedirectPage />,
          },
          {
            path: 'login-success',
            element: <LoginSuccessPage />,
          },
          {
            path: 'login-failed',
            element: <LoginFailPage />,
          },
          {
            path:'profilesetting',
            element:<ProfileSettingPage/>,
          },
          {
            path:'emergency',
            element:<EmergencyPage/>,
          },
      ]
  },
  {
    path: '*',
    element: <NotFound />
  }

]);
export const queryClient = new QueryClient();

function App() {
  return (
  <QueryClientProvider client={queryClient}>
    <AuthProvider>
      <RouterProvider router={router} />
    </AuthProvider>
  </QueryClientProvider>
  );
}

export default App;
