import React, { useState } from "react";
import Card from "../../components/common/Card/Card";
import Button from "../../components/common/Button/Button";
import Input from "../../components/common/Input/Input";
import * as S from "./Style";
import DateSelect from "../../components/Dropdown/DateSelect";
import AddressSelect from "../../components/Dropdown/AddressSelect";
import { postUserProfile } from "../../apis/auth";
import { useLocalStorage } from "../../hooks/useLocalStorage";
import { LOCAL_STORAGE_KEY } from "../../constants/key";
import { useNavigate } from "react-router-dom";

const ProfileSettingPage = () => {
  const [name, setName] = useState("");
  const [gender, setGender] = useState("");
  const [birth, setBirth] = useState({ year: null, month: null, day: null }); 
  const [address, setAddress] = useState("");
  const navigate = useNavigate();

  const { setItem: setAccessToken } = useLocalStorage(LOCAL_STORAGE_KEY.accessToken);
  const { setItem: setRefreshToken } = useLocalStorage(LOCAL_STORAGE_KEY.refreshToken);
 const handleBirthChange = (date) => {
    setBirth(date);  
    console.log("생년월일 변경됨:", date);
  };

  console.log(name, gender, birth, address);
  const handleSubmit = async () => {
    try {
      const profileData = {
        username: name,
        birthday: `${birth.year}-${String(birth.month).padStart(2, "0")}-${String(birth.day).padStart(2, "0")}`,
        gender: gender === "남성" ? "Male" : "Female",
        address,
      };

      const res = await postUserProfile(profileData);

      const { accessToken, refreshToken } = res.data;

      setAccessToken(accessToken);
      setRefreshToken(refreshToken);

      alert("프로필 등록 및 권한 설정 완료!");
      navigate("/home");
    } catch (error) {
      console.error("프로필 등록 실패:", error);
      alert("회원정보 등록 중 오류가 발생했습니다.");
    }
  };

  const isButtonDisabled = !(name.trim() && gender && birth.year && birth.month && birth.day &&
    (address.includes(" ") && address.split(" ").length === 2));

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
            <Input
              placeholder={"이름을 입력하세요"}
              value={name}
              onChange={(e) => {
                const value = e.target.value;
                if (value.length <= 10) {
                  setName(value);
                }
              }}
            />
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
        <S.BirthWrapper>
          <DateSelect
            year={birth.year}
            month={birth.month}
            day={birth.day}
            onChange={handleBirthChange}
          />
        </S.BirthWrapper>

        <S.Title>주소</S.Title>
        <S.AddressWrapper>
          <AddressSelect onChange={setAddress} />
        </S.AddressWrapper>

        <Button text={"회원정보 입력 완료하기"} onClick={handleSubmit} disabled={isButtonDisabled} />
      </S.Container>
    </Card>
  );
};

export default ProfileSettingPage;
