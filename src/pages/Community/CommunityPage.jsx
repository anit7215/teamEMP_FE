// src/pages/Community/CommunityPage.jsx
import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Card from '../../components/common/Card/Card';
import PostButton from '../../components/Community/PostButton';
import * as S from './Style';
import { fetchCommunityPosts } from '../../apis/community';

const CommunityPage = () => {
  const navigate = useNavigate();
  const [posts, setPosts] = useState([]);

  useEffect(() => {
    const getPosts = async () => {
      try {
        const data = await fetchCommunityPosts();
        setPosts(data);
      } catch (error) {
        console.error('게시글 불러오기 실패:', error);
      }
    };

    getPosts();
  }, []);

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
              <S.Author>{post.member?.email || '익명'}</S.Author>
              <S.Date>{post.createdAt?.slice(0, 10)}</S.Date>
              <S.Time>{post.createdAt?.slice(11, 16)}</S.Time>
            </S.LeftGroup>
            <S.IsMine>
              {/* 로그인한 유저 정보와 비교해 수정/삭제 조건 추가 가능 */}
              {/* <span className="delete">삭제</span>
              <span
                className="edit"
                onClick={(e) => {
                  e.stopPropagation();
                  navigate(`/community/edit/${post.id}`);
                }}
              >
                수정
              </span> */}
            </S.IsMine>
          </S.Title>
          <S.PostContent>{post.bodyText}</S.PostContent>
          <S.PostActions>
            <S.IconButton icon="likes" count={0} />
            <S.IconButton icon="mention" count={0} />
          </S.PostActions>
        </S.PostCard>
      ))}

      <PostButton onClick={handlePostPage} />
    </>
  );
};

export default CommunityPage;
