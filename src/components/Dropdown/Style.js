import styled from "styled-components";

export const DropdownContainer = styled.div`
  width: 100%;
  position: relative;
`;

export const DropdownBody = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  padding: 8px 4px 4px 4px;
  background-color: white;
  cursor: pointer;
  border-bottom: 0.5px solid #999;
  position: relative;
  &:focus{
    border-bottom:2px solid #73B3DF;
    }
`;

export const DropdownSelect = styled.p`
  font-size: 16px;
  color: #b4b4b4;
  margin: 0;
`;

export const DropdownMenu = styled.ul`
  display: ${({ $isActive }) => ($isActive ? 'block' : 'none')};
  position: absolute;
  width: 100%;
  background-color: #fff;
  box-shadow: 0px 4px 9.9px 0px rgba(0, 0, 0, 0.25);
  border-top: 0.5px solid #999;
  border-bottom: 0.5px solid #999;
  justify-content: center;
  align-items: center;
  z-index: 999;
  padding: 0;
  margin: 0;
  list-style-type: none;
  max-height: 200px;
  overflow-y: auto;   
`;

export const DropdownItemContainer = styled.li`
padding: 8px 10px;
  &:hover {
    background-color: #f0f0f0;
  }
  border-top: 0.5px solid #999;
  border-bottom: 0.5px solid #999;
  justify-content: center;
  align-items: center;
  text-align: center;
  font-family: "Pretendard-Medium";
`;

export const ItemName = styled.p`
  font-size: 12px;
  color: #474A52;
  margin: 0;
`;
export const SelectedItemText = styled.p`
  font-size: 16px;
  color: #474A52;
  margin: 0;
  font-Family: "Pretendard-SemiBold";
`;
