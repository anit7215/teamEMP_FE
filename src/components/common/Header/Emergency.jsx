import React from 'react';
import { useNavigate } from 'react-router-dom';
import { Icon } from './Style';
import EmergencyIcon from '../../../assets/icons/EmergencyIcon.svg';

const Emergency= () => {
    const navigate = useNavigate();
    const handleClick = () => {
        navigate("/emergency");
    };
    return <Icon src={EmergencyIcon} alt="응급실 페이지 가기" onClick={handleClick} />;
};

export default Emergency;