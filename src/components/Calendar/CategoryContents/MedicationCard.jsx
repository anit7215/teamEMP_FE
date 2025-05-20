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
    const [alarms, setAlarms] = useState({
    morning: false,
    noon: false,
    evening: false,
    });

    const toggleTimes = (key) => {
    setTimes((prev) => ({ ...prev, [key]: !prev[key] }));
    };

    const toggleAlarms = (key) => {
    setAlarms((prev) => ({ ...prev, [key]: !prev[key] }));
    };
  return (
    <>
      <S.Content>복약알림을 받거나, 캘린더에 복약기간을 등록해보세요.</S.Content>
      <div style={{ display: 'flex', margin: '16px 0', flexWrap: 'wrap'}}>
            <S.Text>
                <S.Title>병명</S.Title>
                <S.AddText>필수, 최대 10자</S.AddText>
            </S.Text>
            <Input  label="병명" placeholder="병명을 입력하세요." />
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
      <div style={{marginTop: '8px', marginBottom: '16px'}}>
      <Category labels={use} selectedTab={selectedCategory}  onTabClick={setSelectedCategory}buttonStyle="gradient" />
      </div>
      

      <S.Title>약물명 및 복약량(횟수)</S.Title>
      <div style={{ display: 'flex', gap: '4px', marginBottom: '16px'}}> 
        <S.InputField placeholder="약물명"/>
        <S.InputField placeholder="n"/>
      </div>
      

      <S.Title>복약시기 및 주의사항</S.Title>
      <S.TimeCheckboxWrapper>
          <S.CheckWrapper>
              <CustomCheckbox
              label="아침"
              checked={times.morning}
              onChange={() => toggleTimes('morning')}
            />
            <S.InputField placeholder="주의사항"/>
          </S.CheckWrapper>
        <S.CheckWrapper>
        <CustomCheckbox
            label="점심"
            checked={times.noon}
            onChange={() => toggleTimes('noon')}
        />
        <S.InputField placeholder="주의사항"/>
        </S.CheckWrapper>
         <S.CheckWrapper>
        <CustomCheckbox
            label="저녁"
            checked={times.evening}
            onChange={() => toggleTimes('evening')}
        />
        <S.InputField placeholder="주의사항"/>
         </S.CheckWrapper>
        </S.TimeCheckboxWrapper>

        <S.Text>
          <S.Title>복약 알림</S.Title>
        <S.AddText>07시, 12시, 18시에 푸시 형태로 전송</S.AddText>
        </S.Text>
        
        <S.TimeCheckboxWrapper>
          <S.CheckWrapper>
              <CustomCheckbox
              label="아침"
              checked={alarms.morning}
              onChange={() => toggleAlarms('morning')}
            />
            <S.InputField/>
          </S.CheckWrapper>
        <S.CheckWrapper>
        <CustomCheckbox
            label="점심"
            checked={alarms.noon}
            onChange={() => toggleAlarms('noon')}
        />
        <S.InputField/>
        </S.CheckWrapper>
         <S.CheckWrapper>
        <CustomCheckbox
            label="저녁"
            checked={alarms.evening}
            onChange={() => toggleAlarms('evening')}
        />
        <S.InputField/>
         </S.CheckWrapper>
        </S.TimeCheckboxWrapper>
      
      <S.Title>일정공개 여부</S.Title>
      <div style={{marginTop: '8px', marginBottom: '8px'}}>
      <Category labels={secret} selectedTab={selectedSecret}  onTabClick={setSelectedSecret}buttonStyle="gradient" />
      </div>
      <Button text="복약일정 및 정보 기록하기" />
    </>
  );
};

export default MedicationCard;
