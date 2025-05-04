import React from 'react';
import styled from 'styled-components';

const Header = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 10px;
`;

const NavButton = styled.button`
  background: none;
  border: none;
  font-size: 16px;
  cursor: pointer;
`;

const Title = styled.h2`
  color: #474A52;
  font-family: Pretendard-SemiBold;
  font-size: 16px;
`;

function CalendarHeader({ year, month, onPrev, onNext }) {
  return (
    <Header>
      <NavButton onClick={onPrev}>{'◀'}</NavButton>
      <Title>{year}년 {month + 1}월</Title>
      <NavButton onClick={onNext}>{'▶'}</NavButton>
    </Header>
  );
}

export default CalendarHeader;
