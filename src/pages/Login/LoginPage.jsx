import React from 'react';
import * as S from './Style';
import Button  from '../../components/common/Button/Button';
import Card from '../../components/common/Card/Card';
const Login = () => {
    return (
        <Card>
            <S.Title>
                로그인
            </S.Title>
            <S.Input type="email"  placeholder="email"/>
            <S.Input type="password" placeholder="password"/>
            <Button to="/home" text="로그인"/>
        </Card>
        
    );
};
export default Login;