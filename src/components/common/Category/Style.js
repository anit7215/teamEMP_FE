import styled from 'styled-components';

export const CategoryContainer = styled.div`
  display: flex;
  gap: 8px;
`;

export const Button = styled.button`
  display: flex;
  padding: 10px 15px 10px 16px;
  justify-content: center;
  align-items: center;
  gap: 10px;
  flex: 1 0 0;
  border-radius: 30px;
  border: 2px solid #42CCC5;
  background: ${({ $isSelected }) => ($isSelected ? '#42CCC5' : '#ffffff')};
  color: ${({ $isSelected }) => ($isSelected ? '#ffffff' : '#9FA1A8')};
  font-family: 'Pretendard-Medium';
  font-size: 14px;
  cursor: pointer;
  transition: all 0.1s ease;
`;
