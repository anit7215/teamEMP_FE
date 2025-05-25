import React, { useState } from "react";
import Input from '../../common/Input/Input';
import Button from '../../common/Button/Button';
import DateSelect from '../../Dropdown/DateSelect';
import Category from '../../common/Category/Cateogry';
import CustomCheckbox from '../../common/Checkbox/Checkbox';
import dayjs from 'dayjs';
import { createCalendarEvent } from '..//../../apis/auth';

import * as S from './Style';

const MedicationCard = () => {
  const use = ["내복약만 복용", "외용약만 복용", "함께 복용"];
  const secret = ["공개", "비공개"];
  const [selectedCategory, setSelectedCategory] = useState(use[0]);
  const [selectedSecret, setSelectedSecret] = useState(secret[0]);
  const [birth, setBirth] = useState({ year: null, month: null, day: null });

  const [title, setTitle] = useState('');
  const [startDate, setStartDate] = useState(null);
  const [endDate, setEndDate] = useState(null);
  const [alarm, setAlarm] = useState(false);
  const [isPublic, setIsPublic] = useState(true);

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

  const handleStartDateChange = (date) => {
    const formatted = dayjs(`${date.year}-${date.month}-${date.day}`);
    setStartDate(formatted.isValid() ? formatted.toDate() : null);
  };

  const handleEndDateChange = (date) => {
    const formatted = dayjs(`${date.year}-${date.month}-${date.day}`);
    setEndDate(formatted.isValid() ? formatted.toDate() : null);
  };

  const handleSubmit = async () => {
    if (!startDate || !endDate) {
      alert("복약 시작일과 종료일을 모두 선택해주세요.");
      return;
    }

    const data = {
      eventType: 'MEDICATION',
      title,
      startDate: dayjs(startDate).startOf('day').toISOString(),
      endDate: dayjs(endDate).endOf('day').toISOString(),
      priority: 1,
      alarm,
      isPublic,
    };

    try {
      await createCalendarEvent(data);
      alert('캘린더에 등록했어요!');
    } catch (e) {
      alert('등록 실패!');
      console.error(e);
    }
  };

  return (
    <>
      <S.Content>복약알림을 받거나, 캘린더에 복약기간을 등록해보세요.</S.Content>
      <div style={{ display: 'flex', margin: '16px 0', flexWrap: 'wrap' }}>
        <S.Text>
          <S.Title>병명</S.Title>
          <S.AddText>필수, 최대 10자</S.AddText>
        </S.Text>
        <Input type="text"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          label="병명"
          placeholder="병명을 입력하세요."
        />
      </div>
      <div style={{ display: 'flex', gap: '16px', marginBottom: '16px'}}>
        <S.Wrapper>
          <S.Title>복약 시작일</S.Title>
          <DateSelect
            year={startDate?.getFullYear()}
            month={startDate?.getMonth() + 1}
            day={startDate?.getDate()}
            onChange={handleStartDateChange}
          />
        </S.Wrapper>

        <S.Wrapper>
          <S.Title>복약 종료일</S.Title>
          <DateSelect
            year={endDate?.getFullYear()}
            month={endDate?.getMonth() + 1}
            day={endDate?.getDate()}
            onChange={handleEndDateChange}
          />
        </S.Wrapper>
      </div>

      <S.Title>내복약/외용약 여부</S.Title>
      <div style={{ marginTop: '8px', marginBottom: '16px' }}>
        <Category
          labels={use}
          selectedTab={selectedCategory}
          onTabClick={setSelectedCategory}
          buttonStyle="gradient"
        />
      </div>

      <S.Title>약물명 및 복약량(횟수)</S.Title>
      <div style={{ display: 'flex', gap: '4px', marginBottom: '16px'}}> 
        <S.InputField placeholder="약물명"/>
        <S.InputField placeholder="n"/>
      </div>


      <S.Title>복약시기 및 주의사항</S.Title>
      <S.TimeCheckboxWrapper>
        {["morning", "noon", "evening"].map((time) => (
          <S.CheckWrapper key={time}>
            <CustomCheckbox
              label={{ morning: "아침", noon: "점심", evening: "저녁" }[time]}
              checked={times[time]}
              onChange={() => toggleTimes(time)}
            />
            <S.InputField placeholder="주의사항"/>
          </S.CheckWrapper>
        ))}
      </S.TimeCheckboxWrapper>

        <S.Text>
          <S.Title>복약 알림</S.Title>
        <S.AddText>07시, 12시, 18시에 푸시 형태로 전송</S.AddText>
        </S.Text>

        <S.TimeCheckboxWrapper>
        {["morning", "noon", "evening"].map((time) => (
          <S.CheckWrapper key={time}>
            <CustomCheckbox
              label={{ morning: "아침", noon: "점심", evening: "저녁" }[time]}
              checked={alarms[time]}
              onChange={() => toggleAlarms(time)}
            />
            <S.InputField/>
          </S.CheckWrapper>
        ))}
      </S.TimeCheckboxWrapper>
      <S.Title>일정공개 여부</S.Title>
      <div style={{marginTop: '8px', marginBottom: '8px'}}>
     <Category labels={secret} selectedTab={selectedSecret}  onTabClick={setSelectedSecret}buttonStyle="gradient" />
      </div>
      <Button text="복약일정 및 정보 기록하기"
        onClick={handleSubmit}
        disabled={!startDate || !endDate}
      />
    </>
  );
};

export default MedicationCard;
