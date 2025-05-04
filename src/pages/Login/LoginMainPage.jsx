import React from "react";
import logo from '../../assets/icons/Logo.svg';
import kakao from "../../assets/icons/Kakao.svg";
import naver from "../../assets/icons/Naver.svg";  
import google from "../../assets/icons/Google.svg";
import { useNavigate } from "react-router-dom";

import styled from "styled-components";

const Container = styled.div`
  display: flex;
  height: 100vh; /* 화면 전체 높이 사용 */
  padding-left: 46px;
  padding-right: 46px;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  background: linear-gradient( #FFFFF7 0.98%, #FBFFF6 55.78%, #F7FFFF 97.97%);
  // background-color: #FFFFFD;
`;
const Logo = styled.img`
    width: 343px;
    height: 134px;
    margin-top: 234px;
    margin-bottom: 209px;
`;

const Button = styled.button`
  font-family: "Pretendard-Medium";
  font-size:14px;
  width: 100%;
  height:40px;
  padding: 0px 12px;
  margin-top: 8px;
  border: none;
  border-radius: 8px;
  display: flex;
  align-items: center;
  justify-content: center;
  cursor: pointer;
  background-color: ${(props) => props.$bgColor || "#fff"};
  color: ${(props) => props.$textColor || "#333"};

   &:hover {
    filter: brightness(0.96); 
  }
`;

const ButtonImage = styled.img`
  margin-right: ${(props) => (props.src === google ? "12px" : "0px")};
`;

const ButtonContainer = styled.div`
  margin-bottom:139px;
  width: 100%;
`;

const Text = styled.div`
  text-align:center;
  align-items:center;
  margin: 16px auto 0 auto;  
  font-size:12px;
  color:#474A52;
  border-bottom:1px solid #474A52;
  width:fit-content;
  cursor:pointer;
`;

const LoginMain = () => {
  const navigate = useNavigate();
  return (
    <Container>
        <Logo src={logo}/>
        <ButtonContainer>
          <Button $bgColor="#FDDC3F" $textColor="#3A2929" onClick={()=>{navigate("/login")}}>
            <ButtonImage src={kakao} alt="Kakao" /> 카카오 로그인
          </Button>
          <Button $bgColor="#03C75A" $textColor="#ffffff" onClick={()=>{navigate("/login")}}>
            <ButtonImage src={naver} alt="Naver" /> 네이버 로그인
          </Button>
          <Button style={{ border: "1px solid #747775"}} onClick={()=>{navigate("/login")}}>
            <ButtonImage src={google} alt="Google"/> 구글 로그인
          </Button>
          <Button style={{ border: "1px solid #747775"}} onClick={()=>{navigate("/login")}}>
             이메일 로그인
          </Button>
          <Text  onClick={()=>{navigate("/signup")}}>회원가입</Text>
        </ButtonContainer>
        
    </Container>
  );
};

export default LoginMain;
