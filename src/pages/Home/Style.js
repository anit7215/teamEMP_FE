import styled from "styled-components";

export const Card = styled.div`
    display: flex;
    height: 48px;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    gap: 16px;
    align-self: stretch;
    border-radius: 15px;
    background: linear-gradient(
          100deg,
          rgba(115, 179, 223, 0.95) -49.53%,
          rgba(97, 160, 212, 0.95) 24.57%,
          rgba(118, 217, 228, 0.95) 129.21%
        );
    box-shadow: 0px 0px 15px 0px rgba(0, 0, 0, 0.10);
    color: #FFF;
    font-family: Pretendard-SemiBold;
    font-size: 15px;
    margin-bottom:8px;
`;
export const Container = styled.div`
  display: flex;
  flex-direction: column;
`;

export const Title = styled.div`
  color: #474a52;
  font-family: Pretendard;
  font-size: 16px;
  font-style: normal;
  font-weight: 600;
  line-height: normal;
  white-space: nowrap
`;

export const Content = styled.div`
  color: #686b73;
  font-family: "Pretendard-Regular";
  font-size: 11px;
  line-height: 14px;
  margin-top: 4px;
  margin-bottom: 16px;
`;

export const Wrapper = styled.div`
  display: flex;
  align-items: center; 
  flex-direction: row;
  gap: 16px; 
  flex: 1;
`;

export const InputWrapper = styled.div`
  display: flex;
  align-items: center; 
  flex-direction: row;
  gap: 8px; 
  width:199px;
  flex: 1;
  margin: 4px 0px 16px 0px;
`;

export const ProfileImage = styled.img`
    width:64px;
    height:64px;
    border-radius:50%;
    border:1.3px solid #F1F2F3; 
`;

export const MeIcon = styled.div`
    display: flex;
    width: 18px;
    height: 18px;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    gap: 10px;
    border-radius: 200px;
    background: var(--greyscale-700, #474A52);  
    color: var(--greyscale-100, #F9FAFA);
    text-align: center;
    font-family: Pretendard;
    font-size: 11px;
    font-style: normal;
    font-weight: 600;
    line-height: normal;
    flex-shrink: 0;
`;

export const InfoContainer = styled.div`
  display: flex;
  flex-direction: column;
  flex: 1;
  gap:8px;
`;

export const Name = styled.div`
    color: #474A52;
    font-family: Pretendard;
    font-size: 16px;
    font-weight: 600;
`;
export const FamilyCode = styled.div`
    color: #9FA1A8;
    font-family: Pretendard;
    font-size: 12px;
    font-weight: 400;
`;
export const TagContainer = styled.div`
  display: flex;
  gap: 8px;
  height:30px;
  flex-wrap:    nowrap;
  white-space: nowrap;
  
`;