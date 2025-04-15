import styled from 'styled-components';
import { Link } from 'react-router-dom';

export const NavWrapper = styled.nav`
  display: flex;
  justify-content: space-between;
  align-items: center;
  width: calc(100% - 50px);// 좌우 25px 마진 주기
  height: 82px;
  position: fixed;
  bottom: 0;
  margin-bottom:35px;
  border-radius: 8px;
    border: 1px solid #F3F3F3;
    background: #FFF;
    box-shadow: 0px 2px 12px 0px rgba(0, 0, 0, 0.15);
`;

export const Button = styled(Link)`
  flex: 1;
  text-align: center;
  font-family: 'Pretendard-Semibold';
  text-decoration: none;
  color: ${(props) => (props.$active === "true" ? "#42CCC5" : "#7C7171")};
  font-size: 12px;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
`;

export const StyledIcon = styled.img`
   width: ${(props) => (props.$isHome ? "56px" : "32px")};
  height: ${(props) => (props.$isHome ? "56px" : "32px")};
  margin-bottom: 4px;
`;
