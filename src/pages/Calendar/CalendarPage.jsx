import { useState, useEffect } from 'react';
import Card from '../../components/common/Card/Card';
import CalendarHeader from '../../components/Calendar/Header';
import CalendarGrid from '../../components/Calendar/Calendar';
import { getMonthData } from '../../utils/calendar';
import SelectedDateModal from '../../components/Calendar/SelectedDateModal/SelectedDateModal';
import { getCalendarEventsByDate, getAllCalendarEvents } from '../../apis/calendar';
import * as S from './Style';

function CalendarPage() {
  const today = new Date();
  const categories = ["복약관리", "진료관리", "진료일정"];
  const [currentDate, setCurrentDate] = useState(new Date());
  const [selectedDate, setSelectedDate] = useState(null);
  const [selectedCategory, setSelectedCategory] = useState(null);
  const [events, setEvents] = useState({});
  const [loading, setLoading] = useState(false);
  
  const handleCategoryChange = (category) => {
  setSelectedCategory(prev => (prev === category ? null : category));
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

  const loadMonthlyEvents = async () => {
    try {
      setLoading(true);
      
      const allEvents = await getAllCalendarEvents();
      console.log('전체 이벤트 조회:', allEvents);
      
      const eventsByDate = {};
      
      if (Array.isArray(allEvents)) {
        allEvents.forEach(event => {
          const dateKey = event.startDate ? event.startDate.split('T')[0] : null;
          
          if (dateKey) {
            if (!eventsByDate[dateKey]) {
              eventsByDate[dateKey] = [];
            }
            eventsByDate[dateKey].push(event.title.slice(0, 4));
          }
        });
      }
      
      setEvents(eventsByDate);
      
    } catch (error) {
      console.error('월별 이벤트 로드 실패:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleDateClick = async (day) => {
  if (!day) return;

  const clickedDate = new Date(year, month, day);
  setSelectedDate(clickedDate);

};
  const handleCloseModal = () => {
    setSelectedDate(null);
    setSelectedCategory(null);
    loadMonthlyEvents();
  };

  useEffect(() => {
    loadMonthlyEvents();
  }, [year, month]);

  return (
    <S.CalendarContainer>
      <Card>
        <S.Title>나의 캘린더</S.Title>
        <S.Content>
          캘린더에 이것저것 기록하며, 일정 관리를 해보세요.<br />
          날짜를 터치하면 일정을 확인하거나 기록할 수 있습니다.
        </S.Content>
        {loading && (
          <S.Content>
            이벤트를 불러오는 중...
          </S.Content>
        )}
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
        <SelectedDateModal selectedDate={selectedDate} onClose={handleCloseModal}selectedCategory={selectedCategory} onCategoryChange={handleCategoryChange} categories={categories}/>
      )}
    </S.CalendarContainer>
  );
}

export default CalendarPage;