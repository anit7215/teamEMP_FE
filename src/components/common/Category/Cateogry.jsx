import React from 'react';
import { CategoryContainer, Button } from './Style';

const Category = ({ labels, onTabClick, selectedTab }) => {
    const handleTabClick = (label) => {
        onTabClick(label); 
    };

    return (
        <CategoryContainer>
            {labels.map((label) => (
                <Button
                    key={label} 
                    onClick={() => handleTabClick(label)} 
                    $isSelected={selectedTab === label} 
                >
                    {label}
                </Button>
            ))}
        </CategoryContainer>
    );
};

export default Category;
