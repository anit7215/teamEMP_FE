import styled from 'styled-components';
import likesIcon from '../../assets/icons/likes.png';
import mentionIcon from '../../assets/icons/mention.png';

export const Title = styled.div`
  display: flex;
  color: #474a52;
  font-family: Pretendard;
  font-size: 16px;
  font-style: normal;
  font-weight: 600;
  line-height: normal;
  justify-content: space-between;
  align-items: center;
  white-space: nowrap;
`;
export const LeftGroup = styled.div`
  display: flex;
  gap: 4px;
  align-items: center;
`;
export const Author = styled.span`
  color: #474A52;
  font-family: Pretendard;
  font-size: 16px;
  font-style: normal;
  font-weight: 600;
  line-height: normal;
`;

export const Date = styled.span`
  color: #474A52;
  font-family: Pretendard;
  font-size: 8px;
  font-style: normal;
  font-weight: 400;
  line-height: normal;
`;
export const Time = styled.span`
  color: #474A52;
  font-family: Pretendard;
  font-size: 8px;
  font-style: normal;
  font-weight: 400;
  line-height: normal;
`;

export const IsMine = styled.span`
  color: #CC2F2F;
  font-family: Pretendard;
  font-size: 8px;
  font-style: normal;
  font-weight: 400;
  line-height: normal;
  display: flex;
  justify-content: flex-end;
  align-items: flex-end;
`
export const Content = styled.div`
  color: #686b73;
  font-family: "Pretendard-Regular";
  font-size: 11px;
  line-height: 14px;
  margin-top: 4px;
`;

export const PostContent = styled.div`
  color: #686b73;
  font-family: "Pretendard-Regular";
  font-size: 11px;
  line-height: 14px;
  margin-top: 4px;
`;

export const PostCard = styled.div`
  display: flex;
  padding: 16px 24.5px;
  flex-direction: column;
  justify-content: center;
  // align-items: center;
  // gap: 8px;
  align-self: stretch;
  border-radius: 20px;
  background: #FFF;
  box-shadow: 0px 0px 15px 0px rgba(0, 0, 0, 0.10);
  margin-bottom:8px;
`;
export const PostActions = styled.div`
  display: flex;
  justify-content: flex-end;
  align-items: flex-start;
  gap: 16px;
  align-self: stretch;
`;

export const IconButton = styled.div`
  display: flex;
  align-items: center;
  gap: 4px;
  font-size: 14px;
  color: #1e90ff;

   &::before {
    content: '';
    display: inline-block;
    width: 16px;
    height: 16px;
    background-size: cover;
    background-position: center;
    background-image: url(${({ icon }) =>
      icon === "likes"
        ? likesIcon
        : icon === "mention"
        ? mentionIcon
        : ''});
  }

  &::after {
    content: '${({ count }) => count}';
  }
`;

export const MentionInputWrapper = styled.div`
  position: fixed;
  bottom: 118px;
  left: 0;
  width: calc(100% - 50px); 
  margin-left: 25px;
  margin-right: 25px;

  display: flex;
  padding: 10px;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  gap: 16px;

  box-sizing: border-box;
  background: linear-gradient(
    100deg,
    rgba(115, 179, 223, 0.95) -49.53%,
    rgba(97, 160, 212, 0.95) 24.57%,
    rgba(118, 217, 228, 0.95) 129.21%
  );
  box-shadow: 0px 0px 15px 0px rgba(0, 0, 0, 0.10);
  border-radius: 8px;
  z-index: 1000;
`;


export const MentionInput = styled.input`
  width: 100%;
  padding: 12px 16px;
  border: 1px solid #ddd;
  border-radius: 8px;
  font-size: 14px;
  box-sizing: border-box;
`;