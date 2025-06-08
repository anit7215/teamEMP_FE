import React, { useState, useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import Card from '../../components/common/Card/Card';
import Button from '../../components/common/Button/Button';
import * as S from './PostStyle';

function CommunityPostEditPage() {
  const { postId } = useParams();
  const navigate = useNavigate();

  const [content, setContent] = useState('');

  // 게시글불러오는 함수
  const fetchPostData = (id) => {
      return '진짜 땡깡이라는 말 없어졌으면.. 발작 이런 것도요. 너무 이미지가 나쁜 듯해요.';  // 고정된 내용 하나만 리턴
  };

  useEffect(() => {
    const existingContent = fetchPostData(postId);
    setContent(existingContent);
  }, [postId]);

  const handleSubmit = () => {
    if (!content.trim()) return;
    alert('게시물이 성공적으로 수정되었습니다!');
    navigate('/community');
  };

  const isActive = content.trim().length > 0;

  return (
    <Card>
      <S.Title>커뮤니티 글 수정하기</S.Title>
      <S.TextAreaContent
        value={content}
        onChange={(e) => setContent(e.target.value)}
      />
      <Button
        type="button"
        text="게시글 수정하기"
        onClick={handleSubmit}
        disabled={!isActive}
        style={{
          backgroundColor: isActive ? undefined : '#ccc',
          cursor: isActive ? 'pointer' : 'not-allowed',
        }}
      />
    </Card>
  );
}

export default CommunityPostEditPage