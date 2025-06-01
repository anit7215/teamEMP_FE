import styled from 'styled-components';
import likesIcon from '../../assets/icons/likes.png';
import mentionIcon from '../../assets/icons/mention.png';

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
      icon === "like"
        ? likesIcon
        : icon === "comment"
        ? mentionIcon
        : ''});
  }

  &::after {
    content: '${({ count }) => count}';
  }
`;