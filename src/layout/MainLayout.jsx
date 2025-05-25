import React from 'react';
import { Outlet, Navigate } from 'react-router-dom';
import Header from '../components/common/Header/Header';
import NavBar from '../components/common/NavBar/NavBar';
import { useAuth } from '../context/AuthContext';
import styled from 'styled-components';
const MainLayout = () => {
    const { accessToken } = useAuth();

    // if(!accessToken) {
    //     return <Navigate to = {'/'} replace/>
    // }

    // if (accessToken && location.pathname === '/') {
    //     return <Navigate to="/home" replace />;
    // }

    return(
        <LayoutContainer>
            <Header/>
            <Outlet/>
            <NavBar/>
        </LayoutContainer>
    );
};
export default MainLayout;
const LayoutContainer = styled.div`
    margin-top:64px;
    margin-left:25px;
    margin-right:25px;
    // margin-bottom:35px;
    margin-bottom:160px;
`;