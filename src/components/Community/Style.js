import styled from "styled-components";
import PostIcon from "../../assets/icons/post.png";

export const StyledPostButton = styled.button`
  position: fixed;
  bottom: var(--nav-height, 82px);
  right: 20px;
  display: flex;
  width: 64px;
  height: 64px;
  padding: 16px;
  margin-bottom: 50px;
  justify-content: center;
  align-items: center;
  flex-shrink: 0;
  aspect-ratio: 1/1;
  border-radius: 100px;
  background: var(--Icy_button, #131F36);
`;

export const IconImage = styled.img`
  width: 32px;
  height: 32px;
  flex-shrink: 0;
  aspect-ratio: 1/1;
`;