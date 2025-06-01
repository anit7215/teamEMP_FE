import React, { useState } from 'react';
import Card from '../../components/common/Card/Card';
import Button from '../../components/common/Button/Button';
import * as S from './PostStyle';

function CommunityPostPage() {
  const [content, setContent] = useState('');

  const handleSubmit = () => {
    if (!content.trim()) return;
    alert('게시물이 작성되었습니다!');
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