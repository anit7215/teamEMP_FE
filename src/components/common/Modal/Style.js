import styled from 'styled-components';
export const Input = styled.input`
    display: flex;
    padding: 8px;
    align-items: center;
    gap: 10px;
    align-self: stretch;
    border-radius: 8px;
    border: 1px solid #999;
    background: #FFF;
`;

export const Button = styled.button`
    display: flex;
    width:50%;
    height: 38px;
    padding: 16px;
    justify-content: center;
    align-items: center;
    flex: 1 0 0;
    border-radius: 15px;
    background: #00A79F;   
    border:none; 
    color:#fff;
`;
export const Title = styled.div`
  color: #474a52;
  font-family: Pretendard-SemiBold;
  font-size: 16px;
  font-weight: 600;
  white-space: nowrap;
  text-align:center;
  margin-top:20px;
  margin-bottom:20px;
`;

export const ButtonGroup = styled.div`
  display: flex;
  width: 100%;
  gap: 8px;
  margin-top: 16px;
`;
