import React from 'react';
import * as S from './Style';
import Button  from '../../components/Button/Button';

const LoginPage = () => {
    return (
        <S.Container>
            <S.Title>
                로그인
            </S.Title>
            <S.Input type="email"  placeholder="email"/>
            <S.Input type="password" placeholder="password"/>
            <Button text="로그인"/>
        </S.Container>
        
    );
};
export default LoginPage;