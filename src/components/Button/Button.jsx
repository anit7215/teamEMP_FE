import React from 'react';
import * as S from './Style';

const Button = ({ text, onClick }) => {
    return (
        <S.Container onClick={onClick}>
            {text}
        </S.Container>
    );
    
};
export default Button;