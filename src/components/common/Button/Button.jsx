import React from 'react';
import * as S from './Style';
import { useNavigate } from 'react-router-dom';

const Button = ({ text, to }) => {
    const navigate = useNavigate();
    const handleClick = () => {
        navigate(to);
    };
    return (
        <S.Container onClick={handleClick}>
            {text}
        </S.Container>
    );
    
};
export default Button;