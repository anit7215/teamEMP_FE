import React from 'react';
import styled from 'styled-components';

const Grid = styled.div`
  display: grid;
  grid-template-columns: repeat(7, 1fr);
  justify-items: center;
`;

const DayName = styled.div`
  font-weight: bold;
  color: ${({ dayOfWeek }) =>
    dayOfWeek === 0 ? '#CC2F2F' : dayOfWeek === 6 ? '#2F56CC' : '#555'};
  font-family: Pretendard-SemiBold;
  font-size: 12px;
  margin-top: 8px;
`;

const Day = styled.div`
  width: 100%;
  height: 48px;
  // padding: 4px;
  box-sizing: border-box;
  border-radius: 4px;
  background-color: ${({ selected }) => (selected ? '#59ABEC' : 'transparent')};
  color: ${({ selected, dayOfWeek }) => {
    if (selected) return '#fff';
    if (dayOfWeek === 0) return '#CC2F2F';
    if (dayOfWeek === 6) return '#2F56CC';
    return 'inherit';
  }};
  border: ${({ today }) => (today ? '1px solid #59ABEC' : 'none')};
  font-weight: ${({ today }) => (today ? 'bold' : 'normal')};
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  align-items: flex-start;
  font-size: 14px;
  font-family: Pretendard-SemiBold;
  position: relative;
  margin-bottom: 8px;
`;

const DateText = styled.div`
  font-family: Pretendard-SemiBold;
`;

const EventWrapper = styled.div`
  width: 100%;  
  display: flex;
  flex-direction: column;
`;

const EventItem = styled.div`
  font-size: 10px;
  color: #fff;
  background-color: ${({ index }) =>
    index === 0 ? '#603063' : '#306263'};
  padding: 2px 4px;
  width: 100%;
  box-sizing: border-box;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
  display: flex;
  align-items: center; 
  justify-content: center;
  font-family: Pretendard-Regular; 
`;


function Calendar({ weeks, today, selectedDate, year, month, onDateClick, events }) {
  return (
    <Grid>
      {['일', '월', '화', '수', '목', '금', '토'].map((d, i) => (
        <DayName key={d} dayOfWeek={i}>{d}</DayName>
      ))}

      {weeks.map((week, wi) =>
        week.map((day, di) => {
          const isToday =
            day === today.getDate() &&
            month === today.getMonth() &&
            year === today.getFullYear();

          const isSelected =
            selectedDate &&
            day === selectedDate.getDate() &&
            month === selectedDate.getMonth() &&
            year === selectedDate.getFullYear();

          const dateKey =
            day && `${year}-${String(month + 1).padStart(2, '0')}-${String(day).padStart(2, '0')}`;
          const dayEvents = dateKey && events[dateKey];

          return (
            <div key={`${wi}-${di}`} style={{ width: '100%' }}>
              <Day
                today={isToday}
                selected={isSelected}
                dayOfWeek={di}
                onClick={() => onDateClick(day)}
              >
                <DateText>{day || ''}</DateText>
                {dayEvents && (
                  <EventWrapper>
                    {dayEvents.slice(0, 2).map((event, index) => (
                      <EventItem key={index} index={index}>{event}</EventItem>
                    ))}
                  </EventWrapper>
                )}
              </Day>
            </div>
          );
        })
      )}
    </Grid>
  );
}

export default Calendar;
