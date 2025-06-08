import styled from "styled-components";

export const Title = styled.h2`
  color: #474a52;
  font-family: Pretendard-SemiBold;
  font-size: 16px;
  padding: 4px 0;

`;

export const Content = styled.p`
  margin-top: 4px;
  color: var(--greyscale-600, #686b73);
  font-family: Pretendard-Regular;
  font-size: 11px;
  font-weight: 400;
  line-height: 14px;
`;

export const ScheduleGroup = styled.div`
  display: flex;
  gap: 16px;
  flex-direction: column;
`;

export const ScheduleTitle = styled.div`
  display: flex;
  align-items: center;
  gap: 4px;
  color: #474a52;
  font-family: Pretendard-SemiBold;
  font-size: 12px;
  margin-bottom: 6px;
`;

export const ScheduleWrapper = styled.div`
  display: flex;
  padding: 12px;
  border-bottom: 2.5px solid #42ccc5;
  cursor: pointer;
  transition: background-color 0.2s;
  border-radius: 8px;

  &:hover {
    background-color: #f8f9fa;
  }
`;

export const ScheduleContent = styled.div`
  display: flex;
  flex-direction: column;
  width: 100%;
`;

export const ScheduleDetail = styled.div`
  color: #686b73;
  font-family: Pretendard-Regular;
  font-size: 10px;
  margin-top: 4px;
`;

export const EventTypeIcon = styled.div`
  width: 20px;
  height: 20px;
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  color: white;
  font-size: 10px;
  font-weight: bold;
  margin-right: 8px;
  background-color: ${({ eventType }) => {
    switch (eventType) {
      case "MEDICATION":
        return "#603063";
      case "CHECKUP":
        return "#306263";
      case "RESERVATION":
        return "#5A6ACF";
      default:
        return "#999";
    }
  }};
`;

export const LoadingSpinner = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  padding: 20px;
  color: #42ccc5;
  font-family: Pretendard-Regular;
  font-size: 12px;
`;

export const BackButton = styled.button`
  background: none;
  border: none;
  color: #42ccc5;
  font-family: Pretendard-SemiBold;
  font-size: 12px;
  cursor: pointer;
  padding: 4px 0;
  margin-bottom: 8px;

  &:hover {
    text-decoration: underline;
  }
`;