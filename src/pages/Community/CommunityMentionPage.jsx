import React, { useState} from 'react';
import { useNavigate } from 'react-router-dom';
import Card from '../../components/common/Card/Card';
import * as S from './Style';

const CommunityMentionPage = () => {
  const navigate = useNavigate();
  const [mention, setMention] = useState('');

  const posts = [
    {
      id: 1,
      author: '익명1',
      date: '2025-04-15',
      time: '23:06',
      content: '진짜 땡깡이라는 말 없어졌으면.. 발작 이런 것도요. 너무 이미지가 나쁜 듯해요.',
    }
  ];

  const mentions = [
    {
      id: 2,
      author: '익명2',
      date: '2025-04-15',
      time: '23:06',
      content: '맞아요 너무 속상해요'
    },
    {
      id: 3,
      author: '익명3',
      date: '2025-04-15',
      time: '23:06',
      content: '저도 공감해요'
    },
    {
      id: 1,
      author: '익명1(나의 댓글)',
      date: '2025-04-15',
      time: '23:06',
      content: '속상해요.',
      isMine: true,
    }
  ];

  const handleMentionPage = (id) => {
    navigate(`/community/mention/${id}`);
  };

  const handleKeyDown = (e) => {
    if (e.key === 'Enter' && mention.trim() !== '') {
      console.log('댓글 전송:', mention); // TODO: 댓글 전송 API 호출
      setMention(''); // 입력창 초기화
    }
  };
    
  return (
    <>
      {posts.map((post) => (
        <S.PostCard key={post.id} onClick={() => handleMentionPage(post.id)}>
          <S.Title>
            <S.LeftGroup>
                <S.Author>{post.author}</S.Author>                    
                <S.Date>{post.date}</S.Date>
                <S.Time>{post.time}</S.Time>
            </S.LeftGroup>
            <S.IsMine>
                {post.isMine && <span className="delete">삭제</span>}
            </S.IsMine>
        </S.Title>
          <S.PostContent>{post.content}</S.PostContent>
          <S.PostActions>
            <S.IconButton icon="likes" count={7} />
            <S.IconButton icon="mention" count={7} />
          </S.PostActions>
        </S.PostCard>
      ))}
      {mentions.map((mention) => (
        <S.PostCard key={mention.id}>
        <S.Title>
            <S.LeftGroup>
                <S.Author>{mention.author}</S.Author>
                <S.Date>{mention.date}</S.Date>
                <S.Time>{mention.time}</S.Time>
            </S.LeftGroup>
            <S.IsMine>
                {mention.isMine && <span className="delete">삭제</span>}
                {mention.isMine && 
                  <span
                    className="edit"
                    onClick={(e) => {
                    e.stopPropagation(); // 카드 클릭 이벤트가 발생하지 않도록 막음
                    navigate(`/community/edit/${mention.id}`);}}>수정</span>}
            </S.IsMine>
        </S.Title>
        <S.PostContent>{mention.content}</S.PostContent>
        </S.PostCard>
      ))}

      <S.MentionInputWrapper>
        <S.MentionInput
          type="text"
          placeholder="댓글을 입력하세요"
          value={mention}
          onChange={(e) => setMention(e.target.value)}
          onKeyDown={handleKeyDown}
        />
      </S.MentionInputWrapper>
    </>
  );
};

export default CommunityMentionPage;