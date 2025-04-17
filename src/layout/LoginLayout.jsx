import React from 'react';
import { Outlet, Link } from 'react-router-dom';
import Header from '../components/common/Header/LogoHeader';
import NavBar from '../components/common/NavBar/NavBar';
import styled from 'styled-components';
const MainLayout = () => {
    return(
        <LayoutContainer>
            <Header/>
            <Outlet/>
            {/* <NavBar/> */}
        </LayoutContainer>
    );
};
export default MainLayout;
const LayoutContainer = styled.div`
    margin-top:64px;
    margin-left:25px;
    margin-right:25px;
    margin-bottom:35px;
`;