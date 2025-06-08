import React, { useState } from 'react';
import Card from '../../components/common/Card/Card';
import Button from '../../components/common/Button/Button';
import { Title } from '../Statistics/Style';
import KakaoMap from '../../components/KakaoMap/KakaoMap';
import * as S from './Style';
import { fetchNearbyAeds, fetchNearbyHospitals, fetchNearbyBoth } from '../../apis/emergency';
import HeartMark from '../../assets/icons/HeartMark.png';
import EmergencyMark from '../../assets/icons/EmergencyMark.png';

const EmergencyPage = () => {
  const [aedList, setAedList] = useState([]);
  const [hospitalList, setHospitalList] = useState([]);
  const [currentView, setCurrentView] = useState(''); // 'aed' or 'hospital'

  //aed
  const handleFetchAed = async () => {
    try {
      // 현재 위치
      const position = await new Promise((resolve, reject) => {
        navigator.geolocation.getCurrentPosition(resolve, reject);
      });

      const userLatitude = position.coords.latitude;
      const userLongitude = position.coords.longitude;

      console.log('AED 조회 - 실제 사용된 위치:', userLatitude, userLongitude);

      const data = await fetchNearbyAeds({ latitude: userLatitude, longitude: userLongitude });
      setAedList(data);
      setHospitalList([]); // 다른 리스트 초기화
      setCurrentView('aed');
    } catch (error) {
      console.error('AED 불러오기 실패:', error);
      
      // 위치 로딩 실패시 출력되는 위치
      if (error.code === 1) {
        alert('위치 권한이 필요합니다. 브라우저 설정을 확인해주세요.');
      } else {
        alert('현재 위치를 가져올 수 없습니다.');
      }
    }
  };

  // 응급실
  const handleFetchHospital = async () => {
    try {
      // 현재 위치
      const position = await new Promise((resolve, reject) => {
        navigator.geolocation.getCurrentPosition(resolve, reject);
      });

      const userLatitude = position.coords.latitude;
      const userLongitude = position.coords.longitude;

      console.log('응급실 조회 - 실제 사용된 위치:', userLatitude, userLongitude);

      const data = await fetchNearbyHospitals({ latitude: userLatitude, longitude: userLongitude });
      setHospitalList(data);
      setAedList([]); // 다른 리스트 초기화
      setCurrentView('hospital');
    } catch (error) {
      console.error('응급실 불러오기 실패:', error);
      
      // 실패일 경우
      if (error.code === 1) {
        alert('위치 권한이 필요합니다. 브라우저 설정을 확인해주세요.');
      } else {
        alert('현재 위치를 가져올 수 없습니다.');
      }
    }
  };

  //통합
 const handleFetchBoth = async () => {
  try {
    const position = await new Promise((resolve, reject) => {
      navigator.geolocation.getCurrentPosition(resolve, reject);
    });

    const userLatitude = position.coords.latitude;
    const userLongitude = position.coords.longitude;

    console.log('통합 조회 - 실제 사용된 위치:', userLatitude, userLongitude);

    const data = await fetchNearbyBoth({ latitude: userLatitude, longitude: userLongitude });

    setAedList(data.aedLocations || []);
    setHospitalList(data.emergencyRooms || []);
    setCurrentView('both');
  } catch (error) {
    console.error('통합 조회 실패:', error);

    if (error.code === 1) {
      alert('위치 권한이 필요합니다. 브라우저 설정을 확인해주세요.');
    } else {
      alert('현재 위치를 가져올 수 없습니다.');
    }
  }
};

  return (
    <>
      <Card>
        <S.Title>주변 응급실 및 제세동기 조회</S.Title>
        <S.ButtonWrapper>
          <Button type="button" text="응급실 조회" onClick={handleFetchHospital} />
          <Button type="button" text="제세동기 (AED) 조회" onClick={handleFetchAed} />
        </S.ButtonWrapper>
        <S.ButtonWrapper>
          <Button type="button" buttonStyle="gradient" text="응급실 및 제세동기(AED) 조회" onClick={handleFetchBoth} />
        </S.ButtonWrapper>
      </Card>

      <Card>
        <div>
          <S.Content>
            {currentView === 'aed' && '주변 제세동기 목록'}
            {currentView === 'hospital' && '주변 응급실 목록'}
            {currentView === 'both' && '주변 응급실 및 제세동기 목록'}
            {!currentView && '조회된 정보가 없습니다.'}
          </S.Content>
        </div>
        <KakaoMap 
          aedList={aedList} 
          hospitalList={hospitalList}
          aedMarkerImage={HeartMark}
          hospitalMarkerImage={EmergencyMark}
        />
        <EmergencyPageTable 
          aedList={aedList} 
          hospitalList={hospitalList}
          currentView={currentView}
        />
      </Card>
    </>
  );
};

function EmergencyPageTable({ aedList, hospitalList, currentView }) {
  const hasAedData = aedList && aedList.length > 0;
  const hasHospitalData = hospitalList && hospitalList.length > 0;
  
  if (!hasAedData && !hasHospitalData) {
    return <S.Content>조회된 정보가 없습니다.</S.Content>;
  }

  return (
    <S.Table>
      <S.TBody>
        {hasAedData && (
          <>
            {(currentView === 'both') && (
              <S.TR>
                <S.TD style={{ backgroundColor: '#f8f9fa', fontWeight: 'bold', textAlign: 'center' }}>
                  주변 제세동기 (AED) 조회
                </S.TD>
              </S.TR>
            )}
            {aedList.map((aed, index) => (
              <S.TR key={`aed-${index}`}>
                <S.TD>
                  <div><strong>{aed.buildPlace}</strong></div>
                  <div>{aed.installationOrg}</div>
                  <div>연락처: {aed.telNumber}</div>
                  <div>위치: {aed.aedLatitude}, {aed.aedLongitude}</div>
                </S.TD>
              </S.TR>
            ))}
          </>
        )}

        {hasHospitalData && (
          <>
            {(currentView === 'both') && (
              <S.TR>
                <S.TD style={{ backgroundColor: '#f8f9fa', fontWeight: 'bold', textAlign: 'center' }}>
                  주변 응급실 조회
                </S.TD>
              </S.TR>
            )}
            {hospitalList.map((hospital, index) => (
              <S.TR key={`hospital-${index}`}>
                <S.TD>
                  <div><strong>{hospital.hospitalName}</strong></div>
                  <div>연락처: {hospital.hospitalTel}</div>
                </S.TD>
              </S.TR>
            ))}
          </>
        )}
      </S.TBody>
    </S.Table>
  );
}

export default EmergencyPage;