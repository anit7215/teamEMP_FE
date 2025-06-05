import styled from "styled-components";

export const AddButton = styled.button`
    display: flex;
    height: 48px;
    justify-content: center;
    align-items: center;
    border-radius: 15px;
    border:none;
    cursor:pointer;
    background: linear-gradient(
      100deg,
      rgba(115, 179, 223, 0.95) -49.53%,
      rgba(97, 160, 212, 0.95) 24.57%,
      rgba(118, 217, 228, 0.95) 129.21%
    );
    box-shadow: 0px 0px 15px 0px rgba(0, 0, 0, 0.1);
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
  font-weight: 600;
  white-space: nowrap;
`;

export const Content = styled.div`
  color: #686b73;
  font-family: Pretendard-Regular;
  font-size: 11px;
  line-height: 14px;
  margin-top: 4px;
`;

export const Wrapper = styled.div`
  display: flex;
  align-items: center; 
  gap: 16px; 
`;

export const FamilyWrapper = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding-bottom:8px;
  margin-top:24px;
  border-bottom: 1px solid #C7C7C7;

  &:last-child {
    border-bottom: none;
  }
`;

export const ProfileImage = styled.img`
  width: 64px;
  height: 64px;
  border-radius: 50%;
  border: 1.3px solid #f1f2f3;
`;

export const MeIcon = styled.div`
  display: flex;
  width: 18px;
  height: 18px;
  justify-content: center;
  align-items: center;
  border-radius: 200px;
  background: #474a52;
  color: #f9fafa;
  text-align: center;
  font-family: Pretendard;
  font-size: 11px;
  font-weight: 600;
`;

export const InfoContainer = styled.div`
  display: flex;
  flex-direction: column;
  flex: 1;
  gap: 8px;
  margin-bottom: 10px;
`;

export const Name = styled.div`
  color: #474a52;
  font-family: Pretendard;
  font-size: 16px;
  font-weight: 600;
`;

export const FamilyCode = styled.div`
  color: #9fa1a8;
  font-family: Pretendard;
  font-size: 12px;
  font-weight: 400;
`;

export const TagContainer = styled.div`
  display: flex;
  gap: 8px;
  height: 30px;
  flex-wrap: nowrap;
  white-space: nowrap;
  align-items: center;
`;

export const Master = styled.img`
  width: 16px;
  height: 16px;
`;

export const NameWrapper = styled.div`
  display: flex;
  align-items: center;
  gap: 4px;
`;

export const MinusButton = styled.img`
  width: 24px;
  height: 24px;
  margin-bottom: 4px;
  cursor: pointer;
`;


export const NameAndCode = styled.div`
  display: flex;
  flex-direction: column;
  gap: 4px;
`;

export const LeftGroup = styled.div`
  display: flex;
  align-items: center;
  gap: 16px; 
  flex: 1;
`;

export const FamilyTitle = styled.div`
  color: #474a52;
  font-family: Pretendard-SemiBold;
  font-size: 16px;
  font-weight: 600;
  margin-bottom: 16px;
`;

export const GenderIcon = styled.img`
  width: 16px;
  height: 16px;
`;

export const NoFamily = styled.div`
  color: #474a52;
  font-family: Pretendard-SemiBold;
  font-size: 16px;
  font-weight: 600;
  white-space: nowrap;
  text-align:center;
  margin-top:20px;
  margin-bottom:20px;
`;

export const Top = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: flex-start;
`;