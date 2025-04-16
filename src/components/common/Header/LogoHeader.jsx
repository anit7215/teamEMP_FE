import HeaderLogo from '../../../assets/icons/HeaderLogo.svg';
import React from 'react';
import * as S from './Style';
import { useNavigate } from 'react-router-dom';

const LogoHeader = () => {
  const navigate = useNavigate();
  const handleLogoClick = () => {
    navigate("/home");
  }
  return (
    <S.Container>
        <S.Logo src={HeaderLogo} onClick={handleLogoClick}/>
    </S.Container>
  );
}
export default LogoHeader;