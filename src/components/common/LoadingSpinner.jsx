import React from 'react';
import styled, { keyframes } from 'styled-components';

const spin = keyframes`
  0% {
    transform: rotate(0deg);
  }
  100% {
    transform: rotate(360deg);
  }
`;

const SpinnerWrapper = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  height: 393px;
`;

const Spinner = styled.div`
  width: 80px;
  height: 80px;
  border: 6px solid #f3f3f3;
  border-top: 6px solid #00A79F;
  border-radius: 50%;
  animation: ${spin} 1s linear infinite;
`;

const LoadingSpinner = () => {
  return (
    <SpinnerWrapper>
      <Spinner />
    </SpinnerWrapper>
  );
};

export default LoadingSpinner;
