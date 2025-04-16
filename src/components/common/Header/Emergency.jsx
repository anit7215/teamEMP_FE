import React from 'react';
import { useNavigate } from 'react-router-dom';
import { Icon, EmergencyIconWrapper } from './Style';
import EmergencyIcon from '../../../assets/icons/EmergencyIcon.svg';

const Emergency= () => {
    const navigate = useNavigate();
    const handleClick = () => {
        navigate("/emergency");
    };
    return (
    <EmergencyIconWrapper onClick={handleClick}>
        <Icon src={EmergencyIcon} alt="응급실 페이지 가기"/>
    </EmergencyIconWrapper>
    );
};

export default Emergency;