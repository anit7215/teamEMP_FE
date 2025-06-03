import React, { useState, useEffect } from 'react';
import Card from '../../components/common/Card/Card';
import Tag from '../../components/common/Tag/Tag';
import Master from '../../assets/icons/Crown.svg';
import defaultImage from '../../assets/icons/defaultProfile.svg';
import PriorityListIcon from '../../assets/icons/priorityList.svg';
import useCreateFamily from '../../hooks/mutations/useCreateFamily';
import useDeleteFamily from '../../hooks/mutations/useDeleteFamily';
import useJoinFamily from '../../hooks/mutations/useJoinFamily';
import useGetFamily from '../../hooks/queries/useGetFamily';
import useExitFamily from '../../hooks/mutations/useExitFamily';
import MaleIcon from '../../assets/icons/Male.svg';
import FemaleIcon from '../../assets/icons/Female.svg';
import JoinFamilyModal from '../../components/common/Modal/JoinFamilyModal';
import LoadingSpinner from '../../components/common/LoadingSpinner';
import * as S from './Style';

const FamilyPage = () => {
  const [draggedIndex, setDraggedIndex] = useState(null);
  const [familyList, setFamilyList] = useState([]);
  const [joinModalOpen, setJoinModalOpen] = useState(false);
  const [joinCode, setJoinCode] = useState('');

  const { data, isLoading, isError, refetch, error } = useGetFamily();
  const { mutate: createFamily } = useCreateFamily();
  const { mutate: deleteFamily } = useDeleteFamily({ onSuccess: () => refetch() });
  const { mutate: exitFamily } = useExitFamily();
  const { mutate: joinFamily, isLoading: isJoining } = useJoinFamily({
    onSuccess: () => {
      setJoinModalOpen(false);
      setJoinCode('');
      refetch();
    },
  });

  const familyInfo = data?.data;
  const familyCode = familyInfo?.familyCode;
  const familyHead = familyInfo?.familyHead;

  useEffect(() => {
    if (familyInfo?.familyMembers) {
      const list = familyInfo.familyMembers.map((member, i) => {
        const healthTags = member.healthState ?? [];
        const genderText = member.gender?.toLowerCase() === 'female' ? 'Female' : 'Male';
        return {
          id: i,
          name: member.name,
          gender: genderText,
          tags: [...healthTags, `${member.age}세`, genderText],
        };
      });
      setFamilyList(list);
    }
  }, [familyInfo]);

  const handleAddFamily = () => createFamily({ name: '우리 가족' });
  const handleDeleteFamily = () => deleteFamily();
  const handleExitFamily = () => exitFamily();

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

  const openJoinModal = () => setJoinModalOpen(true);
  const closeJoinModal = () => {
    setJoinModalOpen(false);
    setJoinCode('');
  };

  const handleJoinFamily = () => {
    if (joinCode.trim() === '') {
      alert('가족 코드를 입력해주세요.');
      return;
    }
    joinFamily(joinCode);
  };

  if (isLoading) return <LoadingSpinner />;
  if (isError) {
    if (error?.response?.data?.code === 'FAM-002') {
      return (
        <S.Container>
          <Card>
            <div style={{display:'flex', alignItems:'center',textAlign:'center'}}>아직 가족이 없습니다!</div>
            <S.AddButton onClick={handleAddFamily}>가족장이 되어 가족 생성하기</S.AddButton>
            <S.AddButton onClick={openJoinModal}>가족코드로 참여하기</S.AddButton>
          </Card>
          <JoinFamilyModal
            isOpen={joinModalOpen}
            onClose={closeJoinModal}
            onJoin={handleJoinFamily}
            joinCode={joinCode}
            setJoinCode={setJoinCode}
            isJoining={isJoining}
          />
        </S.Container>
      );
    } else {
      return (
        <p>
          가족 정보를 불러오는 중 오류가 발생했습니다.
          <button onClick={() => refetch()}>다시 시도</button>
        </p>
      );
    }
  }

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
            <S.FamilyCode>가족코드 : {familyCode}</S.FamilyCode>
            <S.TagContainer>
              <Tag text={`${familyHead.age}세`} disabled />
            </S.TagContainer>
          </S.InfoContainer>
        </S.Wrapper>
      </Card>

      {familyList.length === 0 ? (
        <Card>
          <S.Title>가족 구성원이 없습니다.</S.Title>
        </Card>
      ) : (
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
                    {member.gender === 'Female' ? (
                      <S.GenderIcon src={FemaleIcon} />
                    ) : (
                      <S.GenderIcon src={MaleIcon} />
                    )}
                    {member.tags.map((tag, i) => (
                      <Tag key={i} text={tag} disabled={tag.includes('세')} />
                    ))}
                  </S.TagContainer>
                </S.InfoContainer>
              </S.LeftGroup>
            </S.FamilyWrapper>
          ))}
        </Card>
      )}

      <JoinFamilyModal
        isOpen={joinModalOpen}
        onClose={closeJoinModal}
        onJoin={handleJoinFamily}
        joinCode={joinCode}
        setJoinCode={setJoinCode}
        isJoining={isJoining}
      />
      <button
        style={{
          border: 'none',
          backgroundColor: 'transparent',
          color: 'red',
          fontFamily: 'Pretendard-semiBold',
          cursor: 'pointer',
        }}
        onClick={handleDeleteFamily}
      >
        가족 삭제
      </button>
      <button
        style={{
          border: 'none',
          backgroundColor: 'transparent',
          color: 'red',
          fontFamily: 'Pretendard-semiBold',
          cursor: 'pointer',
        }}
        onClick={handleExitFamily}
      >
        가족 탈퇴
      </button>
    </S.Container>
  );
};

export default FamilyPage;
