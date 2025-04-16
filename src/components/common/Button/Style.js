import styled from "styled-components";

export const Container = styled.div`
    display: flex;
    background:${({disabled})=>(disabled? '#9FA1A8':'#00A79F')};
    border-radius: 15px; 
    cursor: ${({ disabled }) => (disabled ? 'not-allowed' : 'pointer')};
    padding: 16px;
    justify-content: center;
    align-items: center;
`;

export const Text = styled.div`
    height:6px;
    font-family:'Pretendard-Medium';
    color: #ffffff;
    font-size: 16px; 
    text-align: center;
    align-items: center;
    justify-content: center;
    display: flex;
`;