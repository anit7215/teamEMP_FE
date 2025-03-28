import React from "react";
import logo from '../../assets/icons/logo.svg';
import kakao from "../../assets/icons/Kakao.svg";
import naver from "../../assets/icons/Naver.svg";  
import google from "../../assets/icons/Google.svg";

import styled from "styled-components";

const Container = styled.div`
  display: flex;
  padding-left: 46px;
  padding-right: 46px;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  background-color: #FFFFFD;
`;
const Logo = styled.img`
    width: 207px;
    height: 76px;
    margin-top: 234px;
    margin-bottom: 267px;
`;

const Button = styled.button`
  font-family: "Pretendard-Medium";
  font-size:14px;
  width: 100%;
  padding: 0px 12px;
  margin-bottom: 16px;
  border: none;
  border-radius: 8px;
  display: flex;
  align-items: center;
  justify-content: center;
  cursor: pointer;
  background-color: ${(props) => props.$bgColor || "#fff"};
  color: ${(props) => props.$textColor || "#333"};
`;

const ButtonImage = styled.img`
  margin-right: ${(props) => (props.src === google ? "12px" : "0px")};
`;

const Login = () => {
  return (
    <Container>
        <Logo src={logo}/>
        <Button $bgColor="#FDDC3F" $textColor="#3A2929">
          <ButtonImage src={kakao} alt="Kakao" /> 카카오 로그인
        </Button>
        <Button $bgColor="#03C75A" $textColor="#ffffff">
          <ButtonImage src={naver} alt="Naver" /> 네이버 로그인
        </Button>
        <Button style={{ border: "1px solid #747775"}}>
          <ButtonImage src={google} alt="Google"/> 구글 로그인
        </Button>
    </Container>
  );
};

export default Login;
