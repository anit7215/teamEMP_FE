import './App.css';
import React from 'react';
import {createBrowserRouter, RouterProvider} from "react-router-dom";
import LoginPage from './pages/Login/LoginPage'; 
import LoginMainPage from './pages/Login/LoginMainPage';
import ProfileSettingPage from './pages/ProfileSetting/ProfileSettingPage';
import HomePage from './pages/Home/HomePage';
import MyPage from './pages/MyPage/MyPage';
import FamilyPage from './pages/Family/FamilyPage';
import CalandarPage from './pages/Calandar/CalandarPage';
import CommunityPage from './pages/Community/CommunityPage';
import EmergencyPage from './pages/Emergency/EmergencyPage';
import ReservationPage from './pages/Reservation/ReservationPage';
import StatisticsPage from './pages/Statistics/StatisticsPage';
import NotificationPage from './pages/Notification/NotificationPage';
import MainLayout from './layout/MainLayout';

const router = createBrowserRouter([
  {
      path: '/',
      element: <MainLayout/>,
      // errorElement: <NotFound/>,

      children: [
          {
              index: true,
              element: <LoginMainPage/>
          },
          {
              path: 'login',
              element: <LoginPage/>
          },
          {
            path:'profileSetting',
            element:<ProfileSettingPage/>,
          },
          {
            path:'home',
            element:<HomePage/>,
          },
          {
            path:'community',
            element:<CommunityPage/>,
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
            path:'emergency',
            element:<EmergencyPage/>,
          },
          {
            path:'statistics',
            element:<StatisticsPage/>,
          },
          {
            path:'calendar',
            element:<CalandarPage/>,
          },
          {
            path:'notification',
            element:<NotificationPage/>,
          },
      ]
  },

])
function App() {
  return <RouterProvider router={router}/>
}

export default App;
