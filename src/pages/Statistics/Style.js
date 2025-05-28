import styled from "styled-components";

export const GraphWrapper = styled.div`
  width: 100%;
  margin: 16px auto;   // 가운데 정렬
  padding: 16px;     // 좌우 여백
`;

export const Card = styled.div`
    display: flex;
    padding: 16px 16px 16px 15px;
    flex-direction: column;
    justify-content: left;
    align-items: left;
    gap: 4px;
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
`;

export const CardTitle = styled.div`
  color: #ffffff;
  font-family: Pretendard;
  font-size: 16px;
  font-style: normal;
  font-weight: 600;
  line-height: normal;
  white-space: nowrap

`;

export const CardContent = styled.div`
  color: #ffffff;
  font-family: "Pretendard-Regular";
  font-size: 11px;
  line-height: 14px;
  margin-top: 4px;
  margin-bottom: 16px;
`;