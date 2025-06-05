import React, { useState, useEffect } from 'react';
import Modal from './Modal';
import Card from '../Card/Card';
import * as S from './Style';
const ConfirmModal = ({ isOpen, onClose, onConfirm, message}) => {

  if (!isOpen) return null;

  return (
    <Modal onClose={onClose}>
      <Card>
        <S.Title>{message}</S.Title>
        <S.ButtonGroup>
          <S.Button onClick={onConfirm}>예</S.Button>
          <S.Button onClick={onClose}>아니요</S.Button>
        </S.ButtonGroup>
      </Card>
    </Modal>
  );
};

export default ConfirmModal;
