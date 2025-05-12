import React, { useState } from 'react';
import styled from 'styled-components';
import Card from '../../components/common/Card/Card';
import CalendarHeader from '../../components/Calendar/Header';
import CalendarGrid from '../../components/Calendar/Calendar';
import Modal from '../../components/common/Modal/Modal';
import Category from '../../components/common/Category/Cateogry';
import MedicationCard from '../../components/Calendar/CategoryContents/MedicationCard';
import TreatmentCard from '../../components/Calendar/CategoryContents/TreatmentCard';
import ScheduleCard from '../../components/Calendar/CategoryContents/ScheduleCard';

const CalendarContainer = styled.div`
  margin-bottom: 100px;
`;

const Title = styled.h2`
  color: #474A52;
  font-family: Pretendard-SemiBold;
  font-size: 16px;
`;

const Content = styled.p`
  margin-top: 4px;
  color: var(--greyscale-600, #686B73);
  font-family: Pretendard-Regular;
  font-size: 11px;
  font-weight: 400;
  line-height: 14px;
`;

function CalendarPage() {
  const today = new Date();
  const categories = ["복약관리", "진료관리", "진료일정"];
  const [currentDate, setCurrentDate] = useState(new Date());
  const [selectedDate, setSelectedDate] = useState(null);
  const [selectedCategory, setSelectedCategory] = useState(categories[0]);
  
  const handleCategoryChange = (category) => {
    setSelectedCategory(category);
  };
  const year = currentDate.getFullYear();
  const month = currentDate.getMonth();
  const weeks = getMonthData(year, month);

  const handlePrevMonth = () => {
    setCurrentDate(new Date(year, month - 1, 1));
    setSelectedDate(null);
  };

  const handleNextMonth = () => {
    setCurrentDate(new Date(year, month + 1, 1));
    setSelectedDate(null);
  };

  const handleDateClick = (day) => {
    if (day) setSelectedDate(new Date(year, month, day));
  };
  return (
    <CalendarContainer>
      <Card>
        <Title>나의 캘린더</Title>
        <Content>
          캘린더에 이것저것 기록하며, 일정 관리를 해보세요.<br />
          날짜를 터치하면 일정을 확인하거나 기록할 수 있습니다.
        </Content>
      </Card>

      <Card>
        <CalendarHeader
          year={year}
          month={month}
          onPrev={handlePrevMonth}
          onNext={handleNextMonth}
        />

        <CalendarGrid
          weeks={weeks}
          today={today}
          selectedDate={selectedDate}
          year={year}
          month={month}
          onDateClick={handleDateClick}
        />
      </Card>

      {selectedDate && (
        <Modal onClose={() => setSelectedDate(null)}>
          <Card>
            <Title>일정 기록하기</Title>
            <div style={{ display:'flex', marginTop: '8px', marginBottom: '8px', alignItems: 'center', color:'#686B73', gap: '4px' }}>
              <div style={{ fontFamily:'Pretendard-Medium', fontSize: '20px'}}>
                {selectedDate.getFullYear()}년 {selectedDate.getMonth() + 1}월 {selectedDate.getDate()}일 
              </div>
              <Content> 을 기준으로 기록합니다.</Content>  
            </div>
<div style={{width:'70%', alignItems:'center', margin:'4px auto', marignTop:'4px'}}>
              <Category labels={categories} selectedTab={selectedCategory} onTabClick={handleCategoryChange} buttonStyle="gradient" />
            </div>
          </Card>
          <Card>
            
          <Title>{selectedCategory}</Title>
          {selectedCategory === "복약관리" && <MedicationCard />}
          {selectedCategory === "진료관리" && <TreatmentCard />}
          {selectedCategory === "진료일정" && <ScheduleCard />}
        </Card>
          <Card>
            <Title>상세 일정 확인하기</Title>
            <Content>일정이 없습니다.</Content>
          </Card>
        </Modal>
      )}
    </CalendarContainer>
  );
}

function getMonthData(year, month) {
  const firstDay = new Date(year, month, 1).getDay();
  const lastDate = new Date(year, month + 1, 0).getDate();

  const weeks = [];
  let dayCounter = 1;

  let firstWeek = new Array(7).fill(null);
  for (let i = firstDay; i < 7; i++) {
    firstWeek[i] = dayCounter++;
  }
  weeks.push(firstWeek);

  while (dayCounter <= lastDate) {
    let week = new Array(7).fill(null);
    for (let i = 0; i < 7 && dayCounter <= lastDate; i++) {
      week[i] = dayCounter++;
    }
    weeks.push(week);
  }

  return weeks;
}

export default CalendarPage;
