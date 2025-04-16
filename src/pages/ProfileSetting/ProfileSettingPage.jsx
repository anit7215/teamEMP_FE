import React from "react";
import Card from "../../components/common/Card/Card";
import Button from "../../components/common/Button/Button";
import Input from "../../components/common/Input/Input";
import Tag from "../../components/common/Tag/Tag";
import Category from "../../components/common/Category/Cateogry";
import styled from "styled-components";
import {useState} from "react";

const Title = styled.div`
    color: #474A52;
    font-family: Pretendard;
    font-size: 16px;
    font-style: normal;
    font-weight: 600;
    line-height: normal;
    margin-bottom:4px;
`;
const Content = styled.div`
    color: #686B73;
    font-family: Pretendard;
    font-size: 11px;
    font-style: normal;
    font-weight: 400;
    line-height: 14px; /* 127.273% */
    margin-bottom:16px;
    `;

const ProfileSettingPage = () => {

    return (
        <>
          
           <Card>
                <Title>회원 정보 입력</Title>
                <Content>주소의 경우 근거리 응급실 조회를 위해 수집하고 있습니다.</Content>
                <Title>성명</Title>
                <Title>성별</Title>
                <Title>생년월일</Title>
                <Title>주소</Title>
                <Button text={"테스트"} to={"/home"} />
                <Input placeholder={"이름을 입력하세요"}/>
                <Button text={"회원정보 입력 완료하기"} disabled={true}/>
           </Card>
           <Card>
            <div style={{display:'flex', flexDirection:"row",gap:"16px", marginBottom:"16px"}}>
            <Tag text={"32세"} />
            <Tag text={"남성"} />
            <Tag text={"서울특별시"} disabled={true} />
           </div>
           </Card>
            <Card>안녕하세용</Card>
           
            <Category leftText="주간" rightText="월간" selectedTab={selectedTab}/>
        </>
        
    );
};
export default ProfileSettingPage;