import React, { useState, useEffect } from 'react';
import Modal from './Modal';
import Card from '../Card/Card';
import styled from 'styled-components';
const JoinFamilyModal = ({ isOpen, onClose, onJoin, isJoining }) => {
  const [joinCode, setJoinCode] = useState('');

  useEffect(() => {
    if (!isOpen) setJoinCode('');
  }, [isOpen]);

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
        <Input
          type="text"
          placeholder="가족 코드를 입력하세요"
          value={joinCode}
          onChange={(e) => setJoinCode(e.target.value)}
        />
        <div>
          <Button onClick={handleJoinClick} disabled={isJoining}>
            {isJoining ? '가입 중...' : '가입하기'}
          </Button>
          <Button onClick={onClose}>취소</Button>
        </div>
      </Card>
    </Modal>
  );
};

export default JoinFamilyModal;

const Input = styled.input`
    display: flex;
    padding: 8px;
    align-items: center;
    gap: 10px;
    align-self: stretch;
    border-radius: 8px;
    border: 1px solid #999;
    background: #FFF;
`;

const Button = styled.button`
    display: flex;
    width:50%;
    height: 38px;
    padding: 16px;
    justify-content: space-between;
    align-items: center;
    flex: 1 0 0;
    border-radius: 15px;
    background: #00A79F;   
    border:none; 
    color:#fff;
`;