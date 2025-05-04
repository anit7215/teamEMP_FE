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
import EmergencyPage from './pages/Emergency/EmergencyPage';
import ReservationPage from './pages/Reservation/ReservationPage';
import StatisticsPage from './pages/Statistics/StatisticsPage';
import NotificationPage from './pages/Notification/NotificationPage';
import SignUpPage from './pages/SignUp/SignUpPage';
import MainLayout from './layout/MainLayout';
import LoginLayout from './layout/LoginLayout';
const router = createBrowserRouter([
  {
    path: '/',
    element: <LoginMainPage />
  },
  {
      element: <MainLayout/>,
      // errorElement: <NotFound/>,
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
            path:'profileSetting',
            element:<ProfileSettingPage/>,
          },
          {
            path:'emergency',
            element:<EmergencyPage/>,
          },
      ]
  },

])
function App() {
  return <RouterProvider router={router}/>
}

export default App;
