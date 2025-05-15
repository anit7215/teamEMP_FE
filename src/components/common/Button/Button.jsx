import React from 'react';
import * as S from './Style';
import { useNavigate } from 'react-router-dom';

const Button = ({ text, to, disabled = false, onClick, buttonStyle}) => {
    const navigate = useNavigate();

    const handleClick = (e) => {
        if (onClick) {
            onClick(e); 
        }
        if (!disabled && to) {
            navigate(to); 
        }
    };

    return (
        <S.Container onClick={handleClick} disabled={disabled} buttonStyle={buttonStyle}>
            <S.Text>{text}</S.Text>
        </S.Container>
    );
};

export default Button;
