import styled from 'styled-components';

export const CategoryContainer = styled.div`
  display: flex;
  gap: 8px;
`;

export const DefaultButton = styled.button`
  display: flex;
  padding: 10px 15px 10px 16px;
  justify-content: center;
  align-items: center;
  gap: 10px;
  flex: 1 0 0;
  border-radius: 30px;
  border: 2px solid #42CCC5;
  background: ${({ selected }) => (selected ? '#42CCC5' : '#ffffff')};
  color: ${({ selected }) => (selected ? '#ffffff' : '#9FA1A8')};
  font-family: 'Pretendard-Medium';
  font-size: 14px;
  cursor: pointer;
  transition: all 0.1s ease;
  white-space: nowrap;
`;

export const GradientButton = styled.button`
  background: ${({ selected }) =>
    selected
      ? `linear-gradient(
          100deg,
          rgba(115, 179, 223, 0.95) -49.53%,
          rgba(97, 160, 212, 0.95) 24.57%,
          rgba(118, 217, 228, 0.95) 129.21%
        )`
      : "#fff"};
  
  color: ${({ selected }) => (selected ? "#fff" : "#73B3DF")};

  ${({ selected }) =>
    !selected &&
    `
      background: #fff;
      background-clip: text;
      -webkit-background-clip: text;
      -webkit-text-fill-color: transparent;
      text-fill-color: transparent;
      background-image: linear-gradient(
        100deg,
        rgba(115, 179, 223, 0.95) -49.53%,
        rgba(97, 160, 212, 0.95) 24.57%,
        rgba(118, 217, 228, 0.95) 129.21%
      );
    `}

  display: flex;
  padding: 8px;
  justify-content: center;
  align-items: center;
  gap: 10px;
  flex: 1 0 0;
  border-radius: 18px;
  border: 1.5px solid #73B3DF;
  text-align: center;
  font-family: 'Pretendard-Medium';
  font-size: 11px;
  line-height: 17px;
  letter-spacing: -0.5px;
  cursor: pointer;
  transition: all 0.2s ease;
  white-space: nowrap;
`;