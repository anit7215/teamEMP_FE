import styled from 'styled-components';

export const TagContainer = styled.div`
    position: relative; 
    display: flex;
    padding: 8px;
    justify-content: center;
    align-items: center;
    border-radius: 30px;
    border: 2px solid ${({ disabled }) => (disabled ? '#C3C5CB' : '#42CCC5')};   
    background:${({disabled})=>(disabled? '#ffffff': '#42CCC5')};
    color:${({disabled})=>(disabled?'#9FA1A8' : '#F9FAFA')};
    font-family: 'Pretendard-Regular';
    font-size: 12px;
    line-height: normal;
`;

export const DeleteButton = styled.img`
  position: absolute;
  top: -10px;
  right: -10px;
  width: 16px;
  height: 16px;
  cursor: pointer;
`;