import React from "react";
import { useNavigate } from "react-router-dom";
import { StyledPostButton, IconImage } from "./style";
import PostIcon from "../../assets/icons/post.png"; // 실제 경로로 수정

const PostButton = () => {
  const navigate = useNavigate();

  const handleClick = () => {
    navigate("/community/post");
  };

  return (
    <StyledPostButton onClick={handleClick}>
      <IconImage src={PostIcon} alt="글쓰기" />
    </StyledPostButton>
  );
};

export default PostButton;