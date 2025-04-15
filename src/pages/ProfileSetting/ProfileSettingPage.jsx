import React from "react";
import Header from "../../components/common/Header/Header";
import LogoHeader from "../../components/common/Header/LogoHeader";
import NavBar from "../../components/common/NavBar/NavBar";
import styled from "styled-components";
const Container = styled.div`
    margin-left: 25px;
    margin-right: 25px;
`;
const TextContainer = styled.div`
    display: flex;
    padding: 16px;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    gap: 8px;
    align-self: stretch;
    border-radius: 20px;
    background: #FFF;
    box-shadow: 0px 0px 15px 0px rgba(0, 0, 0, 0.10);
`;
const Title = styled.div`
    color: #474A52;
    font-family: Pretendard;
    font-size: 16px;
    font-style: normal;
    font-weight: 600;
    line-height: normal;
`;

const SignUpPage = () => {
    return (
        <Container>
           <Header/>
              <LogoHeader/>
              <NavBar/>
           <TextContainer>
                <Title>회원 정보 입력</Title>
                <Title>성명</Title>
                <Title>성별</Title>
                <Title>생년월일</Title>
                <Title>주소</Title>
           </TextContainer>
           
        </Container>
        
    );
};
export default SignUpPage;