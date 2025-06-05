// src/pages/Emergency/EmergencyPage.jsx

import React, { useState } from 'react';
import Card from '../../components/common/Card/Card';
import Button from '../../components/common/Button/Button';
import { Title } from '../Statistics/Style';
import KakaoMap from '../../components/KakaoMap/KakaoMap';
import * as S from './Style';
import { fetchNearbyAeds } from '../../apis/emergency'; // ✅ axiosInstance 기반 API 사용

const EmergencyPage = () => {
  const [aedList, setAedList] = useState([]);

  const handleFetchAed = async () => {
    const userLatitude = 37.6154;
    const userLongitude = 126.7157;

    try {
      const data = await fetchNearbyAeds({ latitude: userLatitude, longitude: userLongitude });
      setAedList(data);
    } catch (error) {
      console.error('AED 불러오기 실패:', error);
    }
  };

  return (
    <>
      <Card>
        <S.Title>주변 응급실 및 제세동기 조회</S.Title>
        <S.ButtonWrapper>
          <Button type="button" text="응급실 찾기" />
          <Button type="button" text="제세동기 찾기" onClick={handleFetchAed} />
        </S.ButtonWrapper>
        <S.ButtonWrapper>
          <Button type="button" buttonStyle="gradient" text="현 위치 기반으로 응급실 찾기" />
        </S.ButtonWrapper>
      </Card>

      <Card>
        <S.Content>주변 응급실 및 제세동기 목록</S.Content>
        <KakaoMap />
        <EmergencyPageTable aedList={aedList} />
      </Card>
    </>
  );
};

function EmergencyPageTable({ aedList }) {
  if (!aedList || aedList.length === 0) {
    return <S.Content>조회된 AED 정보가 없습니다.</S.Content>;
  }

  return (
    <S.Table>
      <S.TBody>
        {aedList.map((aed, index) => (
          <S.TR key={index}>
            <S.TD>
              <div><strong>{aed.buildPlace}</strong></div>
              <div>{aed.installationOrg}</div>
              <div>연락처: {aed.telNumber}</div>
              <div>위치: {aed.aedLatitude}, {aed.aedLongitude}</div>
            </S.TD>
          </S.TR>
        ))}
      </S.TBody>
    </S.Table>
  );
}

export default EmergencyPage;