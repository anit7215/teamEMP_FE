import React, { useState } from 'react';
import Card from '../../components/common/Card/Card';
import Button from '../../components/common/Button/Button';
import AddressSelect from '../../components/Dropdown/AddressSelect';
import { Title } from '../Statistics/Style';
import Dropdown from '../../components/Dropdown/Dropdown';
import GoogleMap from '../../assets/icons/GoogleMap.png';
import * as S from './Style';

const EmergencyPage = () => {

    const handleAddressChange = (address) => {
        console.log("선택된 주소:", address); //콘솔 출력 확인용
    };

    console.log("이미지 경로 확인:", GoogleMap);

    return (
        <><Card>
            <S.Title>
                주변 응급실 및 제세동기 조회
            </S.Title>
            <S.Content>
                주소
            </S.Content>
            <AddressSelect onChange={handleAddressChange} />
            <S.ButtonWrapper>
                <Button type= "button" text={"응급실 찾기"} />
                <Button type= "button" text={"제세동기 찾기"} />
            </S.ButtonWrapper>
            <S.ButtonWrapper>
            <Button type= "button" buttonStyle = "gradient" text={"현 위치 기반으로 응급실 찾기"} />
            </S.ButtonWrapper>
        </Card>
        <Card>
            <S.Content>
                주변 제세동기 목록
            </S.Content>
            <S.Img src={GoogleMap} alt="GoogleMap"/>
            <EmergencyPageTable />
        </Card>
        </>
    );
};

function EmergencyPageTable() {
    return(
        <S.Table>
        <S.TBody>
        <S.TR>
            <S.TD>
                어쩌구저쩌고병원응급실
            </S.TD>
        </S.TR>
        <S.TR>
            <S.TD>
                어쩌구저쩌고병원응급실
            </S.TD>
        </S.TR>
        <S.TR>
            <S.TD>
                어쩌구저쩌고병원응급실
            </S.TD>
        </S.TR>
        <S.TR>
            <S.TD>
                어쩌구저쩌고병원응급실
            </S.TD>
        </S.TR>
        <S.TR>
            <S.TD>
                어쩌구저쩌고병원응급실
            </S.TD>
        </S.TR>
        <S.TR>
            <S.TD>
                어쩌구저쩌고병원응급실
            </S.TD>
        </S.TR>
        </S.TBody>
    </S.Table>
    );
};
export default EmergencyPage;