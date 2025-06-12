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
import MinusIcon from '../../assets/icons/Minus.svg'
import JoinFamilyModal from '../../components/common/Modal/JoinFamilyModal';
import ConfirmModal from '../../components/common/Modal/ConfirmModal';
import LoadingSpinner from '../../components/common/LoadingSpinner';
import * as S from './Style';

const FamilyPage = () => {
  const [draggedIndex, setDraggedIndex] = useState(null);
  const [familyList, setFamilyList] = useState([]);
  const [joinModalOpen, setJoinModalOpen] = useState(false);
  const [joinCode, setJoinCode] = useState('');
  const [confirmType, setConfirmType] = useState(null); 
  const [confirmModalOpen, setConfirmModalOpen] = useState(false);

  const { data, isLoading, isError, refetch, error } = useGetFamily();
  const { mutate: createFamily } = useCreateFamily();
  const { mutate: deleteFamily } = useDeleteFamily({ onSuccess: () => refetch() });
  const { mutate: exitFamily } = useExitFamily();
  const { mutate: joinFamily, isLoading: isJoining } = useJoinFamily({
    onSuccess: () => {
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
        const healthTags = member.healthTag ?? [];
        const genderText = member.gender?.toLowerCase() === 'female' ? 'Female' : 'Male';
        return {
          id: i,
          name: member.name,
          gender: genderText,
          tags: [...healthTags, `${member.age}세`],
          age: member.age,
          healthTag: healthTags, 
        };
      });
      setFamilyList(list);
    }
  }, [familyInfo]);

  const handleAddFamily = () => createFamily({ name: '우리 가족' });
  const handleDeleteFamily = () => deleteFamily();
  const handleExitFamily = () => exitFamily();

  const openConfirmModal = (type) => {
    setConfirmType(type);
    setConfirmModalOpen(true);
  };

  const closeConfirmModal = () => {
    setConfirmType(null);
    setConfirmModalOpen(false);
  };

  const handleConfirm = () => {
    if (confirmType === 'delete') handleDeleteFamily();
    if (confirmType === 'exit') handleExitFamily();
    closeConfirmModal();
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
    joinFamily({ code: joinCode }); 
  };

  if (isLoading) return <LoadingSpinner />;
  if (isError) {
    if (error?.response?.data?.code === 'FAM-002') {
      return (
        <S.Container>
          <Card>
            <S.NoFamily>아직 가족이 없습니다!</S.NoFamily>
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
        <S.Title>
          가족 정보를 불러오는 중 오류가 발생했습니다.
          <button onClick={() => refetch()}>다시 시도</button>
        </S.Title>
      );
    }
  }

  return (
    <S.Container>
      <Card>
        <S.Top>
        <div>
        <S.Title>나의 가족정보</S.Title>
        <S.Content>
          가족의 건강정보를 확인하고, 관리해보세요.<br />
          가족 간에는 캘린더 공유가 가능합니다.
        </S.Content>
        </div>
        <button
        style={{
          border: 'none',
          backgroundColor: 'transparent',
          color: '#CC2F2F',
          fontFamily: 'Pretendard-semiBold',
          cursor: 'pointer',
          width:'24px', height:'24px',
        }}
         onClick={() => openConfirmModal('delete')}
      >
        <img src={MinusIcon} alt='삭제아이콘'/>
      </button>
      </S.Top>
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
              {familyHead.healthTag.map((tag, i) => (
                <Tag key={i} text={tag} />
              ))}
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
                    {member.healthTag.slice(0, 2).map((tag, i) => (
                      <Tag key={i} text={tag} />
                    ))}
                    <Tag text={`${member.age}세`} disabled />
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
          color: '#CC2F2F',
          fontFamily: 'Pretendard-semiBold',
          cursor: 'pointer',
        }}
         onClick={() => openConfirmModal('exit')}
      >
        가족 탈퇴
      </button>
      <ConfirmModal
        isOpen={confirmModalOpen}
        onClose={closeConfirmModal}
        onConfirm={handleConfirm}
        message={
          confirmType === 'delete'
            ? '정말로 가족을 삭제하시겠습니까?'
            : '정말로 가족을 탈퇴하시겠습니까?'
        }
      />

    </S.Container>
  );
};

export default FamilyPage;
