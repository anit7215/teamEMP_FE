import React, { useEffect, useRef, useState } from 'react';

const KakaoMap = ({ aedList = [], hospitalList = [], aedMarkerImage, hospitalMarkerImage }) => {
  const mapRef = useRef(null);
  const mapInstanceRef = useRef(null); // 지도 인스턴스 저장
  const markersRef = useRef([]); // 마커들 저장
  const [status, setStatus] = useState('로딩 중...');
  const [coords, setCoords] = useState({ lat: 37.5665, lng: 126.9780 });
  const [processedAedMarkerImage, setProcessedAedMarkerImage] = useState(null);
  const [processedHospitalMarkerImage, setProcessedHospitalMarkerImage] = useState(null);

  // AED 마커 이미지 변환
  useEffect(() => {
    if (aedMarkerImage && aedMarkerImage.startsWith('data:image/svg+xml')) {
      try {
        const svgData = decodeURIComponent(aedMarkerImage.split(',')[1]);
        const blob = new Blob([svgData], { type: 'image/svg+xml' });
        const blobUrl = URL.createObjectURL(blob);
        setProcessedAedMarkerImage(blobUrl);
        console.log('AED Blob URL 생성 성공:', blobUrl);
      } catch (error) {
        console.error('AED Blob URL 변환 실패:', error);
        setProcessedAedMarkerImage(null);
      }
    } else {
      setProcessedAedMarkerImage(aedMarkerImage);
    }
  }, [aedMarkerImage]);

  // 응급실 마커 이미지 변환
  useEffect(() => {
    if (hospitalMarkerImage && hospitalMarkerImage.startsWith('data:image/svg+xml')) {
      try {
        const svgData = decodeURIComponent(hospitalMarkerImage.split(',')[1]);
        const blob = new Blob([svgData], { type: 'image/svg+xml' });
        const blobUrl = URL.createObjectURL(blob);
        setProcessedHospitalMarkerImage(blobUrl);
        console.log('응급실 Blob URL 생성 성공:', blobUrl);
      } catch (error) {
        console.error('응급실 Blob URL 변환 실패:', error);
        setProcessedHospitalMarkerImage(null);
      }
    } else {
      setProcessedHospitalMarkerImage(hospitalMarkerImage);
    }
  }, [hospitalMarkerImage]);

  // 현재 위치 가져오기
  useEffect(() => {
    if (!navigator.geolocation) {
      setStatus('브라우저가 위치 정보를 지원하지 않아요.');
      return;
    }

    navigator.geolocation.getCurrentPosition(
      (pos) => {
        const lat = pos.coords.latitude;
        const lng = pos.coords.longitude;
        setCoords({ lat, lng });
      },
      (err) => {
        console.error('위치 정보 오류:', err);
        setStatus('위치 정보를 가져오지 못했어요.');
      }
    );
  }, []);

  // 기존 마커들 제거하는 함수
  const clearMarkers = () => {
    markersRef.current.forEach(marker => {
      marker.setMap(null);
    });
    markersRef.current = [];
  };

  // 유효한 좌표인지 확인하는 함수
  const isValidCoordinate = (lat, lng) => {
    return !isNaN(lat) && !isNaN(lng) && lat !== 0 && lng !== 0 && 
           lat >= -90 && lat <= 90 && lng >= -180 && lng <= 180;
  };

  // 지도 초기화
  useEffect(() => {
    const initMap = () => {
      if (!window.kakao || !window.kakao.maps || !mapRef.current) {
        setStatus('카카오 지도 초기화 실패');
        return;
      }

      try {
        const container = mapRef.current;
        const options = {
          center: new window.kakao.maps.LatLng(coords.lat, coords.lng),
          level: 5,
        };

        const map = new window.kakao.maps.Map(container, options);
        mapInstanceRef.current = map;

        // 현재 위치 마커
        const currentLocationMarker = new window.kakao.maps.Marker({
          map,
          position: new window.kakao.maps.LatLng(coords.lat, coords.lng),
          title: '현재 위치',
        });
        markersRef.current.push(currentLocationMarker);

        setStatus('지도 초기화 완료');
      } catch (error) {
        console.error('지도 초기화 에러:', error);
        setStatus('지도 초기화 실패');
      }
    };

    const checkAndInit = () => {
      if (window.kakao && window.kakao.maps) {
        window.kakao.maps.load(initMap);
      } else if (window.kakaoScriptError) {
        setStatus('카카오 스크립트 로드 실패');
      } else {
        setTimeout(checkAndInit, 500);
      }
    };

    const timer = setTimeout(checkAndInit, 100);
    return () => clearTimeout(timer);
  }, [coords]);

  // 마커 업데이트
  useEffect(() => {
    if (!mapInstanceRef.current) return;

    console.log('마커 업데이트 시작');
    console.log('processedAedMarkerImage 값:', processedAedMarkerImage);
    console.log('processedHospitalMarkerImage 값:', processedHospitalMarkerImage);
    console.log('aedList 길이:', aedList?.length || 0);
    console.log('hospitalList 길이:', hospitalList?.length || 0);

    // 기존 마커들 제거 (현재 위치 마커 제외)
    const currentLocationMarker = markersRef.current[0]; // 첫 번째는 현재 위치 마커
    clearMarkers();
    if (currentLocationMarker) {
      markersRef.current.push(currentLocationMarker);
    }

    const bounds = new window.kakao.maps.LatLngBounds();
    bounds.extend(new window.kakao.maps.LatLng(coords.lat, coords.lng));
    let hasValidMarkers = false;

    // AED 마커 생성
    console.log('AED 마커 생성 시작, aedList:', aedList);
    if (aedList && aedList.length > 0) {
      aedList.forEach((aed, index) => {
        const lat = parseFloat(aed.aedLatitude);
        const lng = parseFloat(aed.aedLongitude);
        
        console.log(`AED ${index}: lat=${lat}, lng=${lng}, place=${aed.buildPlace}`);
        
        if (!isValidCoordinate(lat, lng)) {
          console.warn(`AED ${index} 좌표 오류 또는 무효한 좌표:`, { lat, lng, aed });
          return;
        }

        const position = new window.kakao.maps.LatLng(lat, lng);
        bounds.extend(position);
        hasValidMarkers = true;

        // AED 마커 이미지 설정
        let aedMarkerImg = null;
        if (processedAedMarkerImage) {
          try {
            const imageSize = new window.kakao.maps.Size(32, 47);
            aedMarkerImg = new window.kakao.maps.MarkerImage(processedAedMarkerImage, imageSize);
            console.log(`AED ${index} 마커 이미지 생성 성공`);
          } catch (error) {
            console.error(`AED ${index} 마커 이미지 생성 실패:`, error);
          }
        }

        // AED 마커 생성
        const marker = new window.kakao.maps.Marker({
          map: mapInstanceRef.current,
          position,
          image: aedMarkerImg,
          title: `[AED] ${aed.buildPlace}`,
        });
        
        markersRef.current.push(marker);
        console.log(`AED ${index} 마커 생성 완료`);
      });
    }

    // 응급실 마커 생성
    console.log('응급실 마커 생성 시작, hospitalList:', hospitalList);
    if (hospitalList && hospitalList.length > 0) {
      hospitalList.forEach((hospital, index) => {
        const lat = parseFloat(hospital.hospitalLatitude);
        const lng = parseFloat(hospital.hospitalLongitude);
        
        console.log(`응급실 ${index}: lat=${lat}, lng=${lng}, name=${hospital.hospitalName}`);
        
        if (!isValidCoordinate(lat, lng)) {
          console.warn(`응급실 ${index} 좌표 오류 또는 무효한 좌표:`, { lat, lng, hospital });
          return;
        }

        const position = new window.kakao.maps.LatLng(lat, lng);
        bounds.extend(position);
        hasValidMarkers = true;

        // 응급실 마커 이미지 설정
        let hospitalMarkerImg = null;
        if (processedHospitalMarkerImage) {
          try {
            const imageSize = new window.kakao.maps.Size(32, 47);
            hospitalMarkerImg = new window.kakao.maps.MarkerImage(processedHospitalMarkerImage, imageSize);
            console.log(`응급실 ${index} 마커 이미지 생성 성공`);
          } catch (error) {
            console.error(`응급실 ${index} 마커 이미지 생성 실패:`, error);
          }
        }
        
        // 응급실 마커 생성
        const marker = new window.kakao.maps.Marker({
          map: mapInstanceRef.current,
          position,
          image: hospitalMarkerImg,
          title: `[응급실] ${hospital.hospitalName}`,
        });
        
        markersRef.current.push(marker);
        console.log(`응급실 ${index} 마커 생성 완료`);
      });
    }

    // 유효한 마커가 있으면 지도 범위 조정
    if (hasValidMarkers) {
      try {
        mapInstanceRef.current.setBounds(bounds);
        setStatus('마커 로드 완료');
      } catch (error) {
        console.error('지도 범위 조정 실패:', error);
      }
    } else {
      // 유효한 마커가 없으면 현재 위치 중심으로
      mapInstanceRef.current.setCenter(new window.kakao.maps.LatLng(coords.lat, coords.lng));
      setStatus('마커 없음 - 현재 위치 표시');
    }

    console.log(`총 생성된 마커 수: ${markersRef.current.length}`);
  }, [aedList, hospitalList, processedAedMarkerImage, processedHospitalMarkerImage]);

  return (
    <div style={{ position: 'relative', width: '100%' }}>
      <div
        ref={mapRef}
        style={{
          width: '100%',
          height: '400px',
          borderRadius: '10px',
          backgroundColor: '#f0f0f0',
          border: '1px solid #ddd',
        }}
      />
      <div style={{ 
        position: 'absolute', 
        top: '10px', 
        left: '10px', 
        background: 'rgba(255,255,255,0.8)', 
        padding: '5px',
        fontSize: '12px'
      }}>
        {status}
      </div>
    </div>
  );
};

export default KakaoMap;