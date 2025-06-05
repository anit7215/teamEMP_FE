import React from 'react';
import { useNavigate } from 'react-router-dom';
import Card from '../../components/common/Card/Card';
import * as S from './Style';


const CommunityPage = () => {
    const navigate = useNavigate();

    const posts = [
    {
      id: 1,
      author: '익명1',
      date: '2025-04-15 23:06',
      content: '진짜 땡깡이라는 말 없어졌으면.. 발작 이런 것도요. 너무 이미지가 나쁜 듯해요.',
    }
    ];

    const mentions = [
        {
          id: 2,
          author: '익명2',
          date: '2025-04-15 23:45',
          content: '맞아요 너무 속상해요'
        },
        {
          id: 2,
          author: '익명2',
          date: '2025-04-15 23:45',
          content: '맞아요 너무 속상해요'
        },
        {
          id: 2,
          author: '익명2',
          date: '2025-04-15 23:45',
          content: '맞아요 너무 속상해요'
        }
    ];
    
    return (
        <>
        {posts.map((post) => (
        <S.PostCard key={post.id} onClick={handleMentionPage}>
          <S.Title>
            {post.author}
            {post.date}
            {post.isMine && <span className="delete">삭제</span>}
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
            {mention.author}
            {mention.date}
            {mention.isMine && <span className="delete">삭제</span>}
          </S.Title>
          <S.PostContent>{mention.content}</S.PostContent>
        </S.PostCard>
        ))}
        </>
    );

}
export default CommunityPage;