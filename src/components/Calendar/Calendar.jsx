import React from 'react';
import styled from 'styled-components';

const Grid = styled.div`
  display: grid;
  grid-template-columns: repeat(7, 1fr);
`;

const DayName = styled.div`
  align-items: flex-start;
  // text-align: center;
  font-weight: bold;
  color: ${({ dayOfWeek }) =>
    dayOfWeek === 0 ? '#CC2F2F' : dayOfWeek === 6 ? '#2F56CC' : '#555'};
  // margin-bottom: 7px;
`;

const Day = styled.div`
  height: 28px;
  padding: 0px 20px 23px 0px;
  position: relative;
  cursor: pointer;
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
  align-items: flex-start;
  justify-content: flex-start;
  font-size: 14px;
  font-family: Pretendard-SemiBold;
  margin-top: 16px;
`;

function Calendar({ weeks, today, selectedDate, year, month, onDateClick }) {
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

          return (
            <Day
              key={`${wi}-${di}`}
              today={isToday}
              selected={isSelected}
              dayOfWeek={di}
              onClick={() => onDateClick(day)}
            >
              {day || ''}
            </Day>
          );
        })
      )}
    </Grid>
  );
}

export default Calendar;
