import React from 'react';
import * as S from './Style';
import { useNavigate } from 'react-router-dom';

const Button = ({ text, to, disabled = false }) => {
    const navigate = useNavigate();
    const handleClick = () => {
        if (!disabled && to) {
            navigate(to);
        }
    };
    return (
        <S.Container onClick={handleClick} disabled={disabled}>
            <S.Text>{text}</S.Text>
        </S.Container>
    );
    
};
export default Button;