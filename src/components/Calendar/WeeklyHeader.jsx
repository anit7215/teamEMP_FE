import React from 'react';
import styled from 'styled-components';

const Header = styled.div`
  display: flex;
  justify-content: space-between;   /* 좌우 버튼이 양 끝으로 */
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

// WeekHeader 컴포넌트
function WeekHeader({ year, month, week, onPrev, onNext }) {
  return (
    <Header>
      <NavButton onClick={onPrev}>◀</NavButton>
      <Title>{year}년 {month + 1}월 {week}주차</Title>
      <NavButton onClick={onNext}>▶</NavButton>
    </Header>
  );
}

export default WeekHeader;