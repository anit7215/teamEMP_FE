import React from 'react';
import { useNavigate } from 'react-router-dom';
import Card from '../../components/common/Card/Card';
import PostButton from '../../components/Community/PostButton';
import likesIcon from '../../assets/icons/likes.png';
import mentionIcon from '../../assets/icons/mention.png';
import * as S from './Style';


const CommunityPage = () => {
    const navigate = useNavigate();

    const posts = [
    {
      id: 1,
      author: '익명1(나의 글)',
      date: '2025-04-15',
      time: '23:06',
      content: '진짜 땡깡이라는 말 없어졌으면.. 발작 이런 것도요. 너무 이미지가 나쁜 듯해요.',
      isMine: true,
    },
    {
      id: 2,
      author: '익명1',
      date: '2025-04-15',
      time: '23:06',
      content: '진짜 땡깡이라는 말 없어졌으면.. 발작 이런 것도요. 너무 이미지가 나쁜 듯해요.',
    },
    {
      id: 3,
      author: '익명1',
      date: '2025-04-15',
      time: '23:06',
      content: '진짜 땡깡이라는 말 없어졌으면.. 발작 이런 것도요. 너무 이미지가 나쁜 듯해요.',
    },
    ];

    const handlePostPage = () => {
    navigate('/community/post');
    };

    const handleMentionPage = () => {
      navigate('/community/mention');
    };
    
    return (
        <>
        <Card>
            <S.Title>커뮤니티</S.Title>
            <S.Content>이것저것 이야기를 나누어 보세요.</S.Content>
        </Card>

        {posts.map((post) => (
        <S.PostCard key={post.id} onClick={handleMentionPage}>
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
        <PostButton onClick={handlePostPage} />
        </>
    );

}
export default CommunityPage;