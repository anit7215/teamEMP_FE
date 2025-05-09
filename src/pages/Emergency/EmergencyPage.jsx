import React, { useState } from 'react';
import Card from '../../components/common/Card/Card';
import Button from '../../components/common/Button/Button';
import AddressContainer from '../../components/Dropdown/AddressSelect';
import addressdata from '../../components/Dropdown/AddressSelect';
import { Title } from '../Statistics/Style';
import Dropdown from '../../components/Dropdown/Dropdown';
import styled from 'styled-components';

const Table = styled.div`
    border-top: 1px solid #999;
    border-bottom: 1px solid #999;
    background: #FFF;
    width: 100%; //사실 이건 화면에 너무 안 보여서 넣어본,,,width 넣어도 되는지?
`;

const TBody = styled.div`
    display: flex;
    flex-direction: column;
`;

const TR = styled.div`
    display: flex;
    justify-content: center;
    align-items: center;
    padding: 8px 10px;
    border-top: 1px solid #999;
    border-bottom: 1px solid #999;
`;

const TD = styled.p`
    color: #474A52;
    font-family: Pretendard-SemiBold;
    font-size: 12px;
    margin: 0;
`;

const EmergencyPage = () => {
    const [selected1, setSelect1] = useState('');
    const [selected2, setSelect2] = useState('');

    const handleSelect1 = (region) => {
        setSelect1(region); 
        setSelect2(''); //이게 문제인 것 같기도 함...
    };

    const handleSelect2 = (city) => {
        setSelect2(city); //일단 이 리스트도 아직 불러오지 못 함...
    };
    return (
        <><Card>
            <Title>
                주변 응급실 조회
            </Title>
            <Title>
                주소
            </Title>
            <AddressContainer>
                <Dropdown
                    options={Object.keys(addressdata)}
                    selected={selected1}
                    onSelect={handleSelect1}
                    placeholder={"도/특별시/광역시"} />
                {selected1 && (
                    <Dropdown
                        options={addressdata[selected1]}
                        selected={selected2}
                        onSelect={handleSelect2}
                        placeholder={"시/군/구"} />
                )}
            </AddressContainer>
            <Button text={"현 위치 기반으로 응급실 찾기"} />
        </Card><EmergencyPageTable /></>
    );
};

function EmergencyPageTable() {
    return(
        <Table>
        <TBody>
        <TR>
            <TD>
                어쩌구저쩌고병원응급실
            </TD>
        </TR>
        <TR>
            <TD>
                어쩌구저쩌고병원응급실
            </TD>
        </TR>
        <TR>
            <TD>
                어쩌구저쩌고병원응급실
            </TD>
        </TR>
        <TR>
            <TD>
                어쩌구저쩌고병원응급실
            </TD>
        </TR>
        <TR>
            <TD>
                어쩌구저쩌고병원응급실
            </TD>
        </TR>
        <TR>
            <TD>
                어쩌구저쩌고병원응급실
            </TD>
        </TR>
        </TBody>
    </Table>
    );
};
export default EmergencyPage;