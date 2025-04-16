import React from 'react';
import * as S from './Style';
import Button  from '../../components/common/Button/Button';
import Header from '../../components/common/Header/Header';
const Login = () => {
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
export default Login;