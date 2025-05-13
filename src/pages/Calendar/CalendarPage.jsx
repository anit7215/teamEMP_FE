import { useState } from 'react';
import styled from 'styled-components';
import Card from '../../components/common/Card/Card';
import CalendarHeader from '../../components/Calendar/Header';
import CalendarGrid from '../../components/Calendar/Calendar';
import { getMonthData } from '../../utils/calendar';
import SelectedDateModal from '../../components/Calendar/SelectedDateModal';

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
  // 일정 임시 데이터
  const events = {
  '2025-05-16': ['진료', '약 복용'],
  '2025-05-18': ['치과 예약'],
  '2025-06-20': ['약 복용', '진료'],
  }; 
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
          events={events}
        />
      </Card>

      {selectedDate && (
        <SelectedDateModal selectedDate={selectedDate} onClose={() => setSelectedDate(null)} selectedCategory={selectedCategory} onCategoryChange={handleCategoryChange} categories={categories}
  />
      )}
    </CalendarContainer>
  );
}

export default CalendarPage;
