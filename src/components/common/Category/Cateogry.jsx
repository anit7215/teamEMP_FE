import React from 'react';
import { CategoryContainer } from './Style';
import { DefaultButton, GradientButton } from './Style';

const Category = ({ labels, onTabClick, selectedTab, buttonStyle }) => {
  const handleTabClick = (label) => {
    onTabClick(label);
  };

  return (
    <CategoryContainer>
      {labels.map((label) => {
        const isSelected = selectedTab === label;
        
        const ButtonComponent = buttonStyle === 'gradient' ? GradientButton : DefaultButton;

        return (
          <ButtonComponent
            key={label}
            onClick={() => handleTabClick(label)}
            selected={isSelected}
          >
            {label}
          </ButtonComponent>
        );
      })}
    </CategoryContainer>
  );
};

export default Category;
