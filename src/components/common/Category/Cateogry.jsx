import React, { useState } from 'react';
import { CategoryContainer, Button } from './Style';

const Category = ({ leftText, rightText, onTabClick, selectedTab }) => {
    const [internalTab, setInternalTab] = useState(0);
    const isControlled = selectedTab !== undefined && onTabClick;
    const activeTab = isControlled ? selectedTab : internalTab;
  
    const handleTabClick = (index) => {
      if (isControlled) {
        onTabClick(index);
      } else {
        setInternalTab(index);
      }
    };
  
    return (
      <CategoryContainer>
        <Button onClick={() => handleTabClick(0)} $isSelected={activeTab === 0}>
        {leftText}
        </Button>

        <Button onClick={() => handleTabClick(1)} $isSelected={activeTab === 1}>
        {rightText}
        </Button>

      </CategoryContainer>
    );
};
export default Category;
