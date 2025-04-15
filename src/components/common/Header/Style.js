import styled from 'styled-components';

export const Container = styled.div`
    margin-bottom:25px;
    display: flex;
    justify-content: space-between;
    height:38px;
`;
export const Logo = styled.img`
    width:104px;
    height:38px;
`;
export const Icon  = styled.img`
    width:28px;
    height:28px;
    cursor: pointer;
`;
export const AlarmIcon = styled.img`
    width:24px;
    height:24px;
    cursor: pointer;
`;

export const IconContainer = styled.div`
  display: flex;
  justify-content: flex-end; 
  gap:16px;
  align-items: flex-end;
`;
export const EmergencyIconWrapper = styled.div`
    margin-top:5px;
    margin-bottom:5px;
`;
export const AlarmIconWrapper = styled.div`
    margin-top:2.5px;
    margin-bottom:2.5px;
`;