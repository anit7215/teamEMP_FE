import styled from "styled-components";

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
`;

export const Content = styled.div`
  color: #686b73;
  font-family: Pretendard;
  font-size: 11px;
  font-style: normal;
  font-weight: 400;
  line-height: 14px;
  margin-top: 4px;
  margin-bottom: 16px;
`;

export const AddText = styled.div`
  color: #767b89;
  font-family: Pretendard;
  font-size: 8px;
  font-style: normal;
  font-weight: 600;
  line-height: normal;
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

export const Name = styled.div`
  display: flex;
  align-items: flex-end;
  margin-bottom: 4px;
  gap: 6px;
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
