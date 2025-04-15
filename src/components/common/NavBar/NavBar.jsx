import { useLocation } from 'react-router-dom';
import CommunityIcon from '../../../assets/icons/CommunityIcon.svg';
import FamilyIcon from '../../../assets/icons/FamilyIcon.svg';
import HomeIcon from '../../../assets/icons/Home.svg';
import HomeActive from '../../../assets/icons/HomeActive.svg';
import ReservationIcon from '../../../assets/icons/ReservationIcon.svg';
import MyPageIcon from '../../../assets/icons/MyPageIcon.svg';
import * as S from './Style';

const NavButton = ({ to, Icon, label, active, isHome = false  }) => {
  return (
    <S.Button to={to} $active={active ? "true" : "fals"}>
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
        Icon={CommunityIcon}
        label="커뮤니티"
        active={location.pathname === "/community"}
      />
      <NavButton
        to="/reservation"
        Icon={ReservationIcon}
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
        Icon={FamilyIcon}
        label="가족정보"
        active={location.pathname === "/family"}
      />
      <NavButton
        to="/mypage"
        Icon={MyPageIcon}
        label="마이페이지"
        active={location.pathname === "/mypage"}
      />
    </S.NavWrapper>
  );
};



export default NavBar;
