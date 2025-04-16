import LogoHeader from '../Header/LogoHeader';
import React from 'react';
import Alarm from './Alarm';
import {Container, IconContainer} from './Style';
import Emergency from './Emergency';

const Header = () => {
  return (
    <Container>
        <LogoHeader/>

        <IconContainer>
          <Emergency/>
          <Alarm/>
        </IconContainer>
        
        
    </Container>
    
  );
}
export default Header;