import React, { useState, useEffect } from 'react';
import Input from '../../common/Input/Input';
import Button from '../../common/Button/Button';
import Category from '../../common/Category/Cateogry';
import { createCalendarEvent, createTreatmentSchedule, updateCalendarEvent, deleteCalendarEvent } from '../../../apis/calendar';
import dayjs from 'dayjs';
import * as S from './Style';

const ScheduleCard = ({ selectedDate, onClose, editMode = false, editData = null }) => {
  const secret = ['공개', '비공개'];
  const [selectedSecret, setSelectedSecret] = useState(secret[0]);
  
  const [title, setTitle] = useState('');
  const [location, setLocation] = useState('');
  const [time, setTime] = useState('');
  const [memo, setMemo] = useState('');
  const [isPublic, setIsPublic] = useState(true); 
  const [priority, setPriority] = useState(1); 
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (editMode && editData) {
      console.log('진료일정 편집 모드 데이터 로딩:', editData);
      
      setTitle(editData.title || '');
      setPriority(editData.priority || 1);
      setIsPublic(editData.isPublic !== false); 
      setSelectedSecret(editData.isPublic !== false ? "공개" : "비공개");
      setLocation(editData.location || '');
      setTime(editData.time || '');
      setMemo(editData.memo || '');
    }
  }, [editMode, editData]);

  const handleSecretChange = (secret) => {
    setSelectedSecret(secret);
    setIsPublic(secret === "공개");
  };

  const handleTimeChange = (e) => {
    setTime(e.target.value);
  };

  const handleDelete = async () => {
    if (!editMode || !editData) return;
    if (!window.confirm(`"${title}" 일정을 삭제하시겠습니까?`)) {
      return;
    }

    setLoading(true);
    try {
      await deleteCalendarEvent(editData.eventId);
      alert('진료일정이 삭제되었습니다.');
      if (onClose) {
        onClose();
      }
    } catch (error) {
      console.error('일정 삭제 실패:', error);
      alert('삭제에 실패했습니다.');
    } finally {
      setLoading(false);
    }
  };

  const handleSubmit = async () => {
    if (!title.trim()) {
      alert("제목을 입력해주세요.");
      return;
    }
    if (!location.trim()) {
      alert("장소를 입력해주세요.");
      return;
    }
    if (!selectedDate) {
      alert("날짜를 선택해주세요.");
      return;
    }

    setLoading(true);

    try {
      if (editMode && editData) {
        const startDate = selectedDate ? dayjs(selectedDate).startOf('day') : dayjs().startOf('day');
        const endDate = selectedDate ? dayjs(selectedDate).endOf('day') : dayjs().endOf('day');

        const calendarEventData = {
          eventType: 'RESERVATION',
          title: title.trim(),
          startDate: startDate.format('YYYY-MM-DDTHH:mm:ss'),
          endDate: endDate.format('YYYY-MM-DDTHH:mm:ss'),
          priority: priority
        };

        console.log('진료일정 수정 요청:', calendarEventData);
        const response = await updateCalendarEvent(editData.eventId, calendarEventData);
        console.log('진료일정 수정 성공:', response);

        alert('진료일정이 수정되었습니다!');
      } else {
        
        const startDate = selectedDate ? dayjs(selectedDate).startOf('day') : dayjs().startOf('day');
        const endDate = selectedDate ? dayjs(selectedDate).endOf('day') : dayjs().endOf('day');

        const calendarEventData = {
          eventType: 'RESERVATION', 
          title: title.trim(),
          startDate: startDate.format('YYYY-MM-DDTHH:mm:ss'),
          endDate: endDate.format('YYYY-MM-DDTHH:mm:ss'),
          priority: priority
        };

        console.log('캘린더 이벤트 생성 요청:', calendarEventData);
        const calendarEventResponse = await createCalendarEvent(calendarEventData);
        console.log('캘린더 이벤트 생성 성공:', calendarEventResponse);

        const treatmentDateTime = time 
          ? dayjs(`${selectedDate.toISOString().split('T')[0]} ${time}`)
          : dayjs(selectedDate).hour(9).minute(0); 

        const treatmentScheduleData = {
          eventId: calendarEventResponse.eventId, 
          location: location.trim(),
          time: treatmentDateTime.format('YYYY-MM-DDTHH:mm:ss'),
          memo: memo.trim() || null,
          isPublic: isPublic
        };

        console.log('진료일정 생성 요청:', treatmentScheduleData);
        const treatmentResponse = await createTreatmentSchedule(treatmentScheduleData);
        console.log('진료일정 생성 성공:', treatmentResponse);

        alert('진료일정이 성공적으로 등록되었습니다!');
      }
      
      if (onClose) {
        onClose();
      }
      
    } catch (error) {
      console.error('진료일정 처리 실패:', error);
      
      if (error.response) {
        const errorMessage = error.response.data.message || '서버 오류가 발생했습니다.';
        alert(`처리 실패: ${errorMessage}`);
      } else if (error.request) {
        alert('네트워크 오류가 발생했습니다. 인터넷 연결을 확인해주세요.');
      } else {
        alert('예상치 못한 오류가 발생했습니다.');
      }
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      <S.Content>{editMode ? '진료일정 정보를 수정할 수 있습니다.' : '진료장소, 간단한 길안내 등을 기록해보세요.'}</S.Content>
      <div style={{ display: 'flex', margin: '16px 0', flexWrap: 'wrap' }}>
        <S.Text>
          <S.Title>제목</S.Title>
          <S.AddText>필수, 최대 20자</S.AddText>
        </S.Text>
        <Input 
          type="text"
          value={title}
          onChange={(e) => setTitle(e.target.value.slice(0, 20))} 
          label="제목"
          placeholder="진료 제목을 입력하세요."
        />
      </div>

      <div style={{ display: 'flex', gap: '16px', margin: '16px 0'}}>
        <S.Wrapper>
          <S.Text>
            <S.Title>장소</S.Title>
            <S.AddText>필수</S.AddText>
          </S.Text>
          <Input type="text"
            value={location}
            onChange={(e) => setLocation(e.target.value)}
            label="장소" 
            placeholder="장소를 입력하세요." 
          />
        </S.Wrapper>
        <S.Wrapper>
          <S.Text>
            <S.Title>시간</S.Title>
            <S.AddText>선택</S.AddText>
          </S.Text>
          <Input
            type="time"
            value={time}
            onChange={handleTimeChange}
            label="시간" 
            placeholder="진료시간을 선택하세요." 
          />
        </S.Wrapper>
      </div>

      <div style={{ marginBottom: '16px' }}>
        <S.Title>캘린더 표시 우선순위</S.Title>
        <S.AddText>숫자가 낮을수록 높은 우선순위</S.AddText>
        <Input 
          type="number"
          value={priority}
          onChange={(e) => setPriority(parseInt(e.target.value) || 1)}
          label="우선순위"
          placeholder="1"
          min="1"
          max="10"
        />
      </div>

      <S.Title>메모</S.Title>
      <div style={{ marginBottom: '16px'}}>
        <S.InputField
          value={memo}
          onChange={(e) => setMemo(e.target.value)}
          placeholder="메모를 입력하세요."
        />
      </div>

      <S.Title>일정공개 여부</S.Title>
      <div style={{marginTop: '8px', marginBottom: '8px'}}>
        <Category
          labels={secret}
          selectedTab={selectedSecret} 
          onTabClick={handleSecretChange}
          buttonStyle="gradient"
        />
      </div>

      <div style={{ display: 'flex', gap: '8px' }}>
        <Button text={loading ? (editMode ? "수정 중..." : "등록 중...") : (editMode ? "진료일정 수정하기" : "진료일정 기록완료")}
          onClick={handleSubmit}
          disabled={loading || !title.trim() || !location.trim()}
          style={{ flex: 1 }}
        />
        
        {editMode && (
          <Button 
            text={loading ? "삭제 중..." : "삭제"}
            onClick={handleDelete}
            disabled={loading}
            style={{ 
              backgroundColor: '#ff6b6b',
              border: '1px solid #ff6b6b',
              color: 'white',
              minWidth: '80px'
            }}
          />
        )}
      </div>
    </>
  );
};

export default ScheduleCard;