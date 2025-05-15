//style.js
import styled, { css } from "styled-components";

export const Container = styled.button`
  display: flex;
  justify-content: center;
  align-items: center;
  padding: 16px;
  border-radius: 15px;
  border: none;
  cursor: ${({ disabled }) => (disabled ? 'not-allowed' : 'pointer')};

  ${({ disabled, buttonStyle }) => {
    if (disabled) {
      return css`
        background: #9FA1A8;
      `;
    }

    if (buttonStyle === 'gradient') {
      return css`
        background: linear-gradient(
          100deg,
          rgba(115, 179, 223, 0.95) -49.53%,
          rgba(97, 160, 212, 0.95) 24.57%,
          rgba(118, 217, 228, 0.95) 129.21%
        );
      `;
    }

    return css`
      background: #00A79F;
    `;
  }}
`;

export const Text = styled.div`
  height: 6px;
  font-family: 'Pretendard-Medium';
  color: #ffffff;
  font-size: 16px;
  text-align: center;
  display: flex;
  align-items: center;
  justify-content: center;
`;