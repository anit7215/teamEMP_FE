import React, { useState } from "react";
import Card from "../../components/common/Card/Card";
import Button from "../../components/common/Button/Button";
import Input from "../../components/common/Input/Input";
import * as S from "./Style";

const ProfileSettingPage = () => {
  const [gender, setGender] = useState("");

  return (
    <Card>
      <S.Container>
        <S.Title>회원 정보 입력</S.Title>
        <S.Content>
          주소의 경우 근거리 응급실 조회를 위해 수집하고 있습니다.
        </S.Content>

        <S.NameAndGenderWrapper>
          <S.NameWrapper>
            <S.Name>
              <S.Title>성명</S.Title>
              <S.AddText>공백포함 최대 10자</S.AddText>
            </S.Name>
            <Input placeholder={"이름을 입력하세요"} />
          </S.NameWrapper>

          <S.GenderBlock>
            <S.Title>성별</S.Title>
            <S.GenderButtonGroup>
              <S.GenderButton
                selected={gender === "여성"}
                onClick={() => setGender("여성")}
              >
                여성
              </S.GenderButton>
              <S.GenderButton
                selected={gender === "남성"}
                onClick={() => setGender("남성")}
              >
                남성
              </S.GenderButton>
            </S.GenderButtonGroup>
          </S.GenderBlock>
        </S.NameAndGenderWrapper>

        <S.Title>생년월일</S.Title>
        <S.Title>주소</S.Title>
        <Button text={"회원정보 입력 완료하기"} to={"/home"} disabled={true} />
      </S.Container>
    </Card>
  );
};

export default ProfileSettingPage;
