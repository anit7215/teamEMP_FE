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
export const AddText = styled.div`
  color: #767b89;
  font-family:"Pretendard-Semibold";
  font-size: 10px;
  line-height: normal;
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
    display:flex;
    align-items: flex-end;
    margin-bottom: 6px;
    gap: 6px;
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

export const NameAndGenderWrapper = styled.div`
  display: flex;
  flex-direction: row;
  gap: 16px;
  margin-bottom: 16px;
`;

export const NameWrapper = styled.div`
  width: calc(50% - 8px);
`;


export const GenderBlock = styled.div`
  width: calc(50% - 8px);
  display: flex;
  flex-direction: column;
`;

export const GenderButtonGroup = styled.div`
  display: flex;
  gap: 8px;
  margin-top: 4px;
`;

export const GenderButton = styled.button`
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
  font-family: "Pretendard-Medium";
  font-size: 11px;
  line-height: 17px;
  letter-spacing: -0.5px;
  cursor: pointer;
  transition: all 0.2s ease;
`;

export const AddButton = styled.img`
    width:44px;
    height:44px;
    cursor:pointer;
    margin: 0 auto;
    margin-bottom:16px;
`;