import styled from 'styled-components';

export const Title = styled.div`
  color: #474a52;
  font-family: Pretendard;
  font-size: 16px;
  font-style: normal;
  font-weight: 600;
  line-height: normal;
  margin-bottom: 8px;
  white-space: nowrap
`;

export const Content = styled.div`
  color: #474a52;
  font-family: Pretendard;
  font-size: 16px;
  font-style: normal;
  font-weight: 600;
  line-height: normal;
  margin-top: 8px;
  margin-bottom: 8px;
  white-space: nowrap
`;

export const ButtonWrapper = styled.div`
  display: flex;
  width: 100%;
  gap: 8px;
  margin: 8px 0px;
  justify-content: center;
  align-items: center;

  & > button {
    flex: 1;
    height: 38px;
  }
`;
export const Img = styled.img`
    display: flex;
    margin: 8px 0px;
    width: 100%;
    height: 292px;
`;
export const Table = styled.div`
    border-top: 1px solid #999;
    border-bottom: 1px solid #999;
    background: #FFF;
    width: 100%;
`;

export const TBody = styled.div`
    display: flex;
    flex-direction: column;
`;

export const TR = styled.div`
    display: flex;
    justify-content: center;
    align-items: center;
    padding: 8px 10px;
    border-top: 1px solid #999;
    border-bottom: 1px solid #999;
`;

export const TD = styled.p`
    color: #474A52;
    font-family: Pretendard-SemiBold;
    font-size: 12px;
    margin: 0;
`;