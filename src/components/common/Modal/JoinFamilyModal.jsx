import React, { useState, useEffect } from 'react';
import Modal from './Modal';
import Card from '../Card/Card';
import * as S from './Style';
const JoinFamilyModal = ({ isOpen, onClose, onJoin, joinCode, setJoinCode, isJoining }) => {
  //const [joinCode, setJoinCode] = useState('');

  useEffect(() => {
    if (!isOpen) setJoinCode('');
  }, [isOpen,setJoinCode]);

  if (!isOpen) return null;

  const handleJoinClick = () => {
    if (joinCode.trim() === '') {
      alert('가족 코드를 입력해주세요.');
      return;
    }
    onJoin(joinCode);
  };

  return (
    <Modal onClose={onClose}>
      <Card>
        <h3>가족 코드로 참여하기</h3>
        <S.Input
          type="text"
          placeholder="가족 코드를 입력하세요"
          value={joinCode}
          onChange={(e) => setJoinCode(e.target.value)}
        />
        <div>
          <S.Button onClick={handleJoinClick} disabled={isJoining}>
            {isJoining ? '가입 중...' : '가입하기'}
          </S.Button>
          <S.Button onClick={onClose}>취소</S.Button>
        </div>
      </Card>
    </Modal>
  );
};

export default JoinFamilyModal;
