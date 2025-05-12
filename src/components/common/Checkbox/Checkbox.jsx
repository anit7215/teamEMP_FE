import React, { useState } from "react";
import styled from "styled-components";

const Label = styled.label`
  display: flex;
  align-items: center;
  gap: 6px;
  font-size: 14px;
  color: #474a52;
  cursor: pointer;
`;

const HiddenCheckbox = styled.input.attrs({ type: 'checkbox' })`
  display: none;
`;

const StyledCheckbox = styled.div`
  width: 26px;
  height: 26px;
  border-radius: 4px;
  border: 1.5px solid #999;
  background: ${({ checked }) => (checked ? '#6EC3C7' : 'transparent')};
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 16px;
  color: white;
`;

const CheckMark = () => <span>✔</span>;

const CustomCheckbox = ({ label, checked, onChange }) => {
  return (
    <Label>
      {label}
      <HiddenCheckbox checked={checked} onChange={onChange} />
      <StyledCheckbox checked={checked}>
        {checked && <CheckMark />}
      </StyledCheckbox>
    </Label>
  );
};

export default CustomCheckbox;
