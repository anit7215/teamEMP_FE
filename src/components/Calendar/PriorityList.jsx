import React, { useState } from 'react';
import PriorityListIcon from '../../assets/icons/priorityList.svg';

const PriorityList = () => {
  const [items, setItems] = useState([
    '복약관리',
    '진료결과',
    '진료일정',
  ]);

  const [draggedItemIndex, setDraggedItemIndex] = useState(null);

  const handleDragStart = (index) => {
    setDraggedItemIndex(index);
  };

  const handleDragOver = (e) => {
    e.preventDefault();
  };

  const handleDrop = (index) => {
    const updatedItems = [...items];
    const draggedItem = updatedItems[draggedItemIndex];

    updatedItems.splice(draggedItemIndex, 1);
    updatedItems.splice(index, 0, draggedItem);

    setItems(updatedItems);
    setDraggedItemIndex(null);
  };

  return (
    <div style={{  margin: '20px auto' }}>
      {items.map((item, index) => (
        <div
          key={item}
          draggable
          onDragStart={() => handleDragStart(index)}
          onDragOver={handleDragOver}
          onDrop={() => handleDrop(index)}
          style={{
            display: 'flex',
            alignItems: 'center',
            padding: '4px 5.5px',
            marginBottom: '8px',
            borderBottom: '2.5px solid #42CCC5',
            fontFamily: 'Pretendard-SemiBold',
            fontSize: '13px',
            color: '#474A52',
            cursor: 'grab',
          }}
        >
          <img
            src={PriorityListIcon}
            alt="priority"
            style={{ width: '20px', height: '20px', marginRight: '4px' }}
          />
          <span
            style={{
                borderRadius: '16px',
                background: 'linear-gradient(100deg, rgba(115, 179, 223, 0.95) -49.53%, rgba(97, 160, 212, 0.95) 24.57%, rgba(118, 217, 228, 0.95) 129.21%)',
                width: '16px',
                height: '16px',
                color: '#FFF',
                textAlign: 'center',
                fontFamily: 'Pretendard-SemiBold',
                fontSize: '12px',
                display: 'inline-flex',
                justifyContent: 'center',
                alignItems: 'center',
                marginRight: '4px',
            }}
            >
            {index + 1}
            </span>
            {item}

        </div>
      ))}
    </div>
  );
};

export default PriorityList;
