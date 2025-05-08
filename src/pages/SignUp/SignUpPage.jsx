import React from 'react';
import * as S from './Style';
import Button  from '../../components/common/Button/Button';
import Card from '../../components/common/Card/Card'
const Login = () => {
    return (
        <S.Container>
            <Card>
                <S.Title>
                    회원가입
                </S.Title>
                <S.Input type="email"  placeholder="email"/>
                <S.Input type="password" placeholder="password"/>
                <Button text="프로필 입력하러 가기" to="/profilesetting"/>
            </Card>
            
        </S.Container>
        
    );
};
export default Login;