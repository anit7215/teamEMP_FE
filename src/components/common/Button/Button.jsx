import React from 'react';
import * as S from './Style';
import { useNavigate } from 'react-router-dom';

const Button = ({ text, to, disabled = false, onClick, type }) => {
    const navigate = useNavigate();

    const handleClick = (e) => { 
        if (onClick) {
            onClick(e); 
        }
        if (!disabled && to && type !== 'submit') {
            navigate(to); 
        }
    };

    return (
        <S.Container type={type} onClick={handleClick} disabled={disabled}>
            <S.Text>{text}</S.Text>
        </S.Container>
    );
};

export default Button;
