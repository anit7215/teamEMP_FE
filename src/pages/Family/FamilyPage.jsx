import React, { useState, useEffect } from 'react';
import Card from '../../components/common/Card/Card';
import Tag from '../../components/common/Tag/Tag';
import Master from '../../assets/icons/Crown.svg';
import defaultImage from '../../assets/icons/defaultProfile.svg';
import PriorityListIcon from '../../assets/icons/priorityList.svg';
import MinusIcon from '../../assets/icons/Minus.svg';
import useCreateFamily from '../../hooks/mutations/useCreateFamily';
import useGetFamily from '../../hooks/queries/useGetFamily';
import MaleIcon from '../../assets/icons/Male.svg';
import FemaleIcon from '../../assets/icons/Female.svg';
import * as S from './Style';

const FamilyPage = () => {
  const [draggedIndex, setDraggedIndex] = useState(null);
  const [familyList, setFamilyList] = useState([]);

  const { data, isLoading, isError } = useGetFamily();
  const { mutate: createFamily } = useCreateFamily();

  useEffect(() => {
    if (data?.familyMembers) {
      const list = data.familyMembers.map((member, i) => ({
        id: i,
        name: member.name,
        tags: [
          ...(member.healthState || []),
          `${member.age}세`,
          member.gender,
        ],
      }));
      setFamilyList(list);
    }
  }, [data]);

  const handleAddFamily = () => {
    createFamily({ name: '우리 가족' });
  };

  const handleDragStart = (index) => setDraggedIndex(index);

  const handleDragOver = (e) => e.preventDefault();

  const handleDrop = (index) => {
    if (draggedIndex === null || draggedIndex === index) return;
    const updatedList = [...familyList];
    const draggedItem = updatedList[draggedIndex];
    updatedList.splice(draggedIndex, 1);
    updatedList.splice(index, 0, draggedItem);
    setFamilyList(updatedList);
    setDraggedIndex(null);
  };

  if (isLoading) return <div>로딩 중...</div>;
  if (isError || !data) return <div>가족 정보가 없습니다.</div>;

  const { familyCode, familyHead, familyMembers } = data;
  console.log('가족 정보 데이터:', data);

  return (
    <S.Container>
      <Card>
        <S.Title>나의 가족정보</S.Title>
        <S.Content>
          가족의 건강정보를 확인하고, 관리해보세요.<br />
          가족 간에는 캘린더 공유가 가능합니다.
        </S.Content>
      </Card>

      <Card>
        <S.FamilyTitle>가족장</S.FamilyTitle>
        <S.Wrapper>
          <S.ProfileImage src={defaultImage} />
          <S.MeIcon>나</S.MeIcon>
          <S.InfoContainer>
            <S.NameWrapper>
              <S.Name>{familyHead.name}</S.Name>
              <S.Master src={Master} />
            </S.NameWrapper>
            {familyCode ? (<S.FamilyCode>가족코드 : {familyCode}</S.FamilyCode>):(<S.FamilyCode> </S.FamilyCode>)}
            <S.TagContainer>
              {familyHead.gender === 'Female' ? (
                <S.GenderIcon src={FemaleIcon}/>) : (
                <S.GenderIcon src={MaleIcon}/>)}
              <Tag text={`${familyHead.age}세`} disabled />
            </S.TagContainer>
          </S.InfoContainer>
        </S.Wrapper>
      </Card>

      {!familyCode && (
        <S.AddButton onClick={handleAddFamily}>
          가족장이 되어 가족 생성하기
        </S.AddButton>
      )}

      {familyCode && (
        <Card>
          <S.Title>가족 건강정보</S.Title>
          {familyList.map((member, index) => (
            <S.FamilyWrapper
              key={`${member.name}-${index}`}
              draggable
              onDragStart={() => handleDragStart(index)}
              onDragOver={handleDragOver}
              onDrop={() => handleDrop(index)}
              style={{ cursor: 'grab' }}
            >
              <S.LeftGroup>
                <img src={PriorityListIcon} alt="icon" />
                <S.ProfileImage src={defaultImage} />
                <S.InfoContainer>
                  <S.NameAndCode>
                    <S.Name>{member.name}</S.Name>
                    <S.FamilyCode>가족코드 : {familyCode}</S.FamilyCode>
                  </S.NameAndCode>
                  <S.TagContainer>
                    {member.tags.map((tag, i) => (
                      <Tag key={i} text={tag} disabled={tag.includes('세')} />
                    ))}
                  </S.TagContainer>
                </S.InfoContainer>
              </S.LeftGroup>

              <S.MinusButton src={MinusIcon} alt="minus" />
            </S.FamilyWrapper>
          ))}
        </Card>
      )}
    </S.Container>
  );
};

export default FamilyPage;
