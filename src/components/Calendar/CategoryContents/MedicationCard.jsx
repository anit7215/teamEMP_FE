import React, { useState } from "react";
import Input from '../../common/Input/Input';
import Button from '../../common/Button/Button';
import DateSelect from '../../Dropdown/DateSelect';
import Category from '../../common/Category/Cateogry';
import CustomCheckbox from '../../common/Checkbox/Checkbox';
import * as S from './Style';

const MedicationCard = () => {
    const use = ["내복약만 복용", "외용약만 복용", "함께 복용"];
    const secret = ["공개", "비공개"];
    const [selectedCategory, setSelectedCategory] = useState(use[0]);
    const [selectedSecret, setSelectedSecret] = useState(secret[0]);
    const [birth, setBirth] = useState({ year: null, month: null, day: null }); 
     const handleBirthChange = (date) => {
    setBirth(date);  
    console.log("생년월일 변경됨:", date);
  };
    const [times, setTimes] = useState({
    morning: false,
    noon: false,
    evening: false,
    });

    const toggle = (key) => {
    setTimes((prev) => ({ ...prev, [key]: !prev[key] }));
    };
  return (
    <>
      <S.Content>복약알림을 받거나, 캘린더에 복약기간을 등록해보세요.</S.Content>
      <div style={{ display: 'flex', gap: '16px' }}>
        <S.Wrapper>
            <S.Text>
                <S.Title>병명</S.Title>
                <S.AddText>필수, 최대 10자</S.AddText>
            </S.Text>
            <Input  label="병명" placeholder="병명을 입력하세요." />
        </S.Wrapper>
        <S.Wrapper>
            <S.Text>
                <S.Title>특이사항</S.Title>
                <S.AddText>선택, 최대 10자</S.AddText>
            </S.Text>
            <Input label="특이사항" placeholder="특이사항을 입력하세요." />
        </S.Wrapper>
      </div>
      
      

      <div style={{ display: 'flex', gap: '16px', marginBottom: '16px'}}>
        <S.Wrapper>
        <S.Title>복약 시작일</S.Title>
        <DateSelect
            year={birth.year}
            month={birth.month}
            day={birth.day}
            onChange={handleBirthChange}
        />
        </S.Wrapper>
        
        <S.Wrapper>
        <S.Title>복약 종료일</S.Title>
        <DateSelect
            year={birth.year}
            month={birth.month}
            day={birth.day}
            onChange={handleBirthChange}
        />
        </S.Wrapper>
      </div>

      <S.Title>내복약/외용약 여부</S.Title>
      <Category labels={use} selectedTab={selectedCategory}  onTabClick={setSelectedCategory}buttonStyle="gradient" />

      <S.Title>약물명 및 복약량(횟수)</S.Title>
      <S.InputField/>

      <S.Title>복약시기 및 주의사항</S.Title>
      <S.TimeCheckboxWrapper>
        <CustomCheckbox
            label="아침"
            checked={times.morning}
            onChange={() => toggle('morning')}
        />
        <S.InputField/>
        <CustomCheckbox
            label="점심"
            checked={times.noon}
            onChange={() => toggle('noon')}
        />
        <S.InputField/>
        <CustomCheckbox
            label="저녁"
            checked={times.evening}
            onChange={() => toggle('evening')}
        />
        <S.InputField/>
        </S.TimeCheckboxWrapper>

      
        <S.Title>복약 알림</S.Title>
        <S.AddText>07시, 12시, 18시에 푸시 형태로 전송</S.AddText>
        <S.TimeCheckboxWrapper>
          <S.CheckWrapper>
              <CustomCheckbox
              label="아침"
              checked={times.morning}
              onChange={() => toggle('morning')}
            />
            <S.InputField/>
          </S.CheckWrapper>
        <S.CheckWrapper>
        <CustomCheckbox
            label="점심"
            checked={times.noon}
            onChange={() => toggle('noon')}
        />
        <S.InputField/>
        </S.CheckWrapper>
         <S.CheckWrapper>
        <CustomCheckbox
            label="저녁"
            checked={times.evening}
            onChange={() => toggle('evening')}
        />
        <S.InputField/>
         </S.CheckWrapper>
        </S.TimeCheckboxWrapper>
      
      <S.Title>일정공개 여부</S.Title>
      <Category labels={secret} selectedTab={selectedSecret}  onTabClick={setSelectedSecret}buttonStyle="gradient" />

      <Button text="복약일정 및 정보 기록하기" />
    </>
  );
};

export default MedicationCard;
