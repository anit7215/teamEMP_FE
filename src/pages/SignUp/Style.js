import styled from "styled-components";

export const Container = styled.div`
    display: flex;
    font-family:'Pretendard-SemiBold';
    flex-direction: column;
    gap: 16px;
`;

export const Title = styled.div`
  color: #474a52;
  font-family:'Pretendard-SemiBold';
  font-size: 22px;
  font-style: normal;
  font-weight: 600;
  line-height: normal;
  margin-bottom: 16px;
`;

export const Input = styled.input`
  width: 100%;
  padding: 20px;
  font-size: 14px;
  box-sizing: border-box;
  margin-bottom: 8px;
  border: 1px solid ${({ hasError }) => (hasError ? 'red' : '#999')};
  border-radius: 15px;
  outline: none;
  font-family: Pretendard;
  font-size: 16px;
  font-weight: 400;
  gap: 10px;
  &:focus {
    border-color: #00A79F;
  }
   
`;



export const ErrorMessage = styled.p`
  color: red;
  font-size: 13px;
  margin: 0 0 16px 0;
`;

