import React, { useEffect } from 'react';
import styled from 'styled-components';

const Overlay = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background: rgba(0, 0, 0, 0.3);
  z-index: 999;
  display: flex;
  justify-content: center;
  align-items: flex-start;
  padding-top: 130px;
  overflow-y: auto;
`;

const ModalContainer = styled.div`
//   max-height: 80vh;
  overflow-y: auto;
  width: 100%;
  padding: 0 25px;
//   background: white;
margin-bottom:130px;
  border-radius: 20px;
`;

const Modal = ({ children, onClose }) => {
  useEffect(() => {
    // 모달 열릴 때 스크롤 막기
    document.body.style.overflow = 'hidden';
    return () => {
      // 모달 닫힐 때 원래대로
      document.body.style.overflow = 'auto';
    };
  }, []);

  const handleOverlayClick = () => {
    onClose();
  };

  const handleModalClick = (e) => {
    e.stopPropagation();
  };

  return (
    <Overlay onClick={handleOverlayClick}>
      <ModalContainer onClick={handleModalClick}>
        {children}
      </ModalContainer>
    </Overlay>
  );
};

export default Modal;
