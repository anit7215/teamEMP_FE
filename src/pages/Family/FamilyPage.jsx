import React, { useState } from 'react';
import Card from '../../components/common/Card/Card';
import Tag from '../../components/common/Tag/Tag';
import Master from '../../assets/icons/Crown.svg';
import defaultImage from '../../assets/icons/defaultProfile.svg';
import PriorityListIcon from '../../assets/icons/priorityList.svg';
import * as S from './Style';

const FamilyPage = () => {
  const [myCode, setMyCode] = useState('11');
  const hasFamily = !!myCode;

  const [familyList, setFamilyList] = useState([
    {
      id: 1,
      name: '김길동',
      tags: ['체중', '철분부족', '28세'],
    },
    {
      id: 2,
      name: '이길동',
      tags: ['고혈압', '당뇨', '55세'],
    },
    {
      id: 3,
      name: '박길동',
      tags: ['비염', '17세'],
    },
  ]);

  const [draggedIndex, setDraggedIndex] = useState(null);

  const handleDragStart = (index) => {
    setDraggedIndex(index);
  };

  const handleDragOver = (e) => {
    e.preventDefault();
  };

  const handleDrop = (index) => {
    if (draggedIndex === null || draggedIndex === index) return;

    const updatedList = [...familyList];
    const draggedItem = updatedList[draggedIndex];

    updatedList.splice(draggedIndex, 1);
    updatedList.splice(index, 0, draggedItem);

    setFamilyList(updatedList);
    setDraggedIndex(null);
  };

  return (
    <S.Container>
      <Card>
        <S.Title>나의 가족정보</S.Title>
        <S.Content>가족의 건강정보를 확인하고, 관리해보세요.<br/>가족 간에는 캘린더 공유가 가능합닌다.</S.Content>
      </Card>
      <Card>
        <S.Title>가족장</S.Title>
        <S.Wrapper>
          <S.ProfileImage src={defaultImage} />
          <S.MeIcon>나</S.MeIcon>
          <S.InfoContainer>
            <S.NameWrapper>
              <S.Name>홍길동</S.Name>
              <S.Master src={Master} />
            </S.NameWrapper>
            {hasFamily ? (<S.FamilyCode>가족코드 : {myCode}</S.FamilyCode>):(<S.FamilyCode> </S.FamilyCode>)}
            <S.TagContainer>
              <Tag text={'체중조절'} />
              <Tag text={'철분부족'} />
              <Tag text={'28세'} disabled={true} />
            </S.TagContainer>
          </S.InfoContainer>
        </S.Wrapper>
      </Card>

      {!hasFamily && <S.AddButton>가족장이 되어 가족 생성하기</S.AddButton>}

      {hasFamily && (
        <Card>
          <S.Title>가족 건강정보</S.Title>
          {familyList.map((member, index) => (
            <S.FamilyWrapper
              key={member.id}
              draggable
              onDragStart={() => handleDragStart(index)}
              onDragOver={handleDragOver}
              onDrop={() => handleDrop(index)}
              style={{ cursor: 'grab' }}
            >
              <img src={PriorityListIcon} alt="icon" />
              <S.ProfileImage src={defaultImage} />
              <S.InfoContainer>
                <S.NameWrapper>
                  <S.Name>{member.name}</S.Name>
                </S.NameWrapper>
                <S.FamilyCode>가족코드 : {myCode}</S.FamilyCode>
                <S.TagContainer>
                  {member.tags.map((tag, i) => (
                    <Tag
                      key={i}
                      text={tag}
                      disabled={tag.includes('세')}
                    />
                  ))}
                </S.TagContainer>
              </S.InfoContainer>
            </S.FamilyWrapper>
          ))}
        </Card>
      )}
    </S.Container>
  );
};

export default FamilyPage;
