import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Card from '../../components/common/Card/Card';
import Button from '../../components/common/Button/Button';
import * as S from './PostStyle';
import { postCommunityPost } from '../../apis/community';


function CommunityPostPage() {
  const navigate = useNavigate();
  const [content, setContent] = useState('');
  const [isAnonymous, setIsAnonymous] = useState(true); // 익명 여부 설정

  const userId = localStorage.getItem('userId');
  const accessToken = localStorage.getItem('accessToken');

  const handleSubmit = async () => {
    if (!content.trim()) return;

    const postData = {
      memberId: isAnonymous ? -1 : Number(userId),
      healthCategoryId: 2,
      bodyText: content,
      // ✅ postType 제거됨
    };

    try {
      await postCommunityPost(postData, accessToken);
      alert('게시물이 작성되었습니다!');
      navigate('/community');
    } catch (error) {
      console.error('게시글 작성 실패:', error);
      alert('게시글 작성에 실패했습니다.');
    }
  };

  const isActive = content.trim().length > 0;

  return (
    <Card>
      <S.Title>커뮤니티 글 작성하기</S.Title>
      <S.TextAreaContent
        placeholder="환우들이 상처받을 수 있는 혐오표현 등은 삼가주시길 바랍니다."
        value={content}
        onChange={(e) => setContent(e.target.value)}
      />

      <Button
        type="button"
        text="작성 완료하기"
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

export default CommunityPostPage;
