import React, { useEffect, useRef, useState } from 'react';

const KakaoMap = () => {
  const mapRef = useRef(null);
  const [status, setStatus] = useState('로딩 중...');
  const [coords, setCoords] = useState({ lat: 37.5665, lng: 126.9780 }); // 기본: 서울시청

  // 👉 브라우저에서 현재 위치 가져오기
  useEffect(() => {
    if (!navigator.geolocation) {
      setStatus('브라우저가 위치 정보를 지원하지 않아요.');
      return;
    }

    navigator.geolocation.getCurrentPosition(
      (pos) => {
        const lat = pos.coords.latitude;
        const lng = pos.coords.longitude;
        console.log('현재 위치:', lat, lng);
        setCoords({ lat, lng });
      },
      (err) => {
        console.error('위치 정보 오류:', err);
        setStatus('위치 정보를 가져오지 못했어요.');
      }
    );
  }, []);

  // 👉 지도 로드
  useEffect(() => {
    const loadMap = () => {
      if (!window.kakao || !window.kakao.maps || !mapRef.current) {
        setStatus('카카오 지도 초기화 실패');
        return;
      }

      try {
        setStatus('지도 생성 중...');
        const container = mapRef.current;
        const options = {
          center: new window.kakao.maps.LatLng(coords.lat, coords.lng),
          level: 5,
        };

        const map = new window.kakao.maps.Map(container, options);

        const marker = new window.kakao.maps.Marker({
          position: new window.kakao.maps.LatLng(coords.lat, coords.lng),
        });
        marker.setMap(map);

        setStatus('지도 로드 완료');
      } catch (error) {
        console.error('맵 생성 오류:', error);
        setStatus(`맵 생성 오류: ${error.message}`);
      }
    };

    const checkAndLoad = () => {
      if (window.kakao && window.kakao.maps) {
        window.kakao.maps.load(loadMap);
      } else if (window.kakaoScriptError) {
        setStatus('카카오 스크립트 로드 실패');
      } else {
        setTimeout(checkAndLoad, 500);
      }
    };

    const timer = setTimeout(checkAndLoad, 100);
    return () => clearTimeout(timer);
  }, [coords]);

  return (
    <div style={{ position: 'relative', width: '100%' }}>
      <div
        ref={mapRef}
        style={{ 
          width: '100%', 
          height: '400px', 
          borderRadius: '10px',
          backgroundColor: '#f0f0f0',
          border: '1px solid #ddd'
        }}
      />
      </div>
  );
};

export default KakaoMap;
