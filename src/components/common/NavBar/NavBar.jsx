import { useLocation } from 'react-router-dom';
import CommunityIcon from '../../../assets/icons/CommunityIcon.svg';
import FamilyIcon from '../../../assets/icons/FamilyIcon.svg';
import HomeIcon from '../../../assets/icons/Home.svg';
import HomeActive from '../../../assets/icons/HomeActive.svg';
import ReservationIcon from '../../../assets/icons/ReservationIcon.svg';
import CalendarIcon from '../../../assets/icons/CalendarIcon.svg';
import CommunityActive from '../../../assets/icons/CommunityActive.svg';
import ReservationActive from '../../../assets/icons/ReservationActive.svg';
import CalendarActive from '../../../assets/icons/CalendarActive.svg';
import FamilyActive from '../../../assets/icons/FamilyActive.svg';

import * as S from './Style';

const NavButton = ({ to, Icon, label, active, isHome = false  }) => {
  return (
    <S.Button to={to} $active={active ? "true" : "false"}>
      <S.StyledIcon src={Icon} alt={label} $isHome={isHome}/>
      {label}
    </S.Button>
  );
};

const NavBar = () => {
  const location = useLocation();

  return (
    <S.NavWrapper>
      <NavButton
        to="/community"
        Icon={location.pathname === "/community" ? CommunityActive : CommunityIcon}
        label="커뮤니티"
        active={location.pathname === "/community"}
      />
      <NavButton
        to="/reservation"
        Icon={location.pathname === "/reservation" ? ReservationActive : ReservationIcon}
        label="진료예약"
        active={location.pathname === "/reservation"}
      />
      <NavButton
        to="/home"
        Icon={location.pathname === "/home" ? HomeActive : HomeIcon}
        isHome={true}
      />
      <NavButton
        to="/family"
        Icon={location.pathname === "/family" ? FamilyActive : FamilyIcon}
        label="가족정보"
        active={location.pathname === "/family"}
      />
      <NavButton
        to="/calendar"
        Icon={location.pathname === "/calendar" ? CalendarActive : CalendarIcon}
        label="캘린더"
        active={location.pathname === "/calendar"}
      />
    </S.NavWrapper>
  );
};



export default NavBar;
