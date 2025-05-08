import React, { useState, useCallback, useRef, useEffect } from "react";
import {
  DropdownContainer,
  DropdownBody,
  DropdownSelect,
  DropdownMenu,
  DropdownItemContainer,
  ItemName,
  SelectedItemText
} from "./Style";

const Dropdown = ({ items, selectedItem, setSelectedItem, placeholder, disabled }) => {
    const [isActive, setIsActive] = useState(false);
    const dropdownRef = useRef(null);
  
    const onActiveToggle = useCallback(() => {
      setIsActive((prev) => !prev);
    }, []);
  
    const onSelectItem = useCallback((item) => {
      setSelectedItem(item);
      setIsActive(false);
    }, [setSelectedItem]);
  
    // 외부 클릭 시 드롭다운 닫기
    useEffect(() => {
      const handleClickOutside = (event) => {
        if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
          setIsActive(false);
        }
      };
  
      document.addEventListener("click", handleClickOutside);
  
      return () => {
        document.removeEventListener("click", handleClickOutside);
      };
    }, []);
  
    return (
      <DropdownContainer ref={dropdownRef}>
        <DropdownBody onClick={onActiveToggle}tabIndex={0} style={{ position: "relative" }}>
          {selectedItem ? (
            <SelectedItemText>{selectedItem}</SelectedItemText>
          ) : (
            <DropdownSelect>{placeholder}</DropdownSelect>
          )}
        </DropdownBody>
        <DropdownMenu $isActive={isActive}>
          {items.length === 0 ? (
            <DropdownItemContainer>
              <ItemName>선택할 항목이 없습니다.</ItemName>
            </DropdownItemContainer>
          ) : (
            items.map((item) => (
              <DropdownItemContainer key={item} onClick={() => onSelectItem(item)}>
                <ItemName>
                  {item}
                </ItemName>
              </DropdownItemContainer>
            ))
          )}
        </DropdownMenu>
      </DropdownContainer>
    );
  };
  
  export default Dropdown;
  