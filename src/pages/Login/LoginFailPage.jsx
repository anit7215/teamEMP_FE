import React, { useState } from 'react';
import styled from 'styled-components';
import Card from '../../components/common/Card/Card';
import { useNavigate } from 'react-router-dom';  // useNavigate import

const Overlay = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  z-index: 999;
  width: 100vw;
  height: 100vh;
  background: rgba(0, 0, 0, 0.4);
  display: flex;
  justify-content: center;
  align-items: flex-start;
  padding-top: 350px;
`;

const ModalCard = styled(Card)`
  width: 320px;
  height: 150px;
  padding: 24px 20px;
`;

const Message = styled.p`
  font-size: 16px;
  font-family: 'Pretendard-Medium';
  color: #333;
  line-height: 1.5;
  text-align: center;
  margin: 0;
`;

const Divider = styled.hr`
    border: none;
  height: 1px;
  background-color: rgb(149, 149, 149);
  margin: 24px 0 0px 0;
`;

const ConfirmButton = styled.button`
  background: none;
  border: none;
  color: #00A79F;
  font-family: Pretendard-Medium;
  font-size: 16px;
  cursor: pointer;
  margin-top: 24px;
  width: 100%;
`;

const LoginFailPage = () => {
  const [showModal, setShowModal] = useState(true);
  const navigate = useNavigate();  // useNavigate 훅 사용

  const handleConfirm = () => {
    setShowModal(false);  // 모달 닫고
    navigate('/');        // 메인 페이지로 이동
  };

  return (
    <>
      {showModal && (
        <Overlay>
          <ModalCard>
            <Message>
              해당 이메일로 가입된 계정이 존재합니다.
              <br />
              다른 로그인 방법을 선택해 주세요.
            </Message>
            <Divider />
            <ConfirmButton onClick={handleConfirm}>확인</ConfirmButton>
          </ModalCard>
        </Overlay>
      )}
    </>
  );
};

export default LoginFailPage;
