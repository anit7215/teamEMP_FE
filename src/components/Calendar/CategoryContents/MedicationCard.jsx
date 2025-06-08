import React, { useState, useEffect } from "react";
import Input from '../../common/Input/Input';
import Button from '../../common/Button/Button';
import DateSelect from '../../Dropdown/DateSelect';
import Category from '../../common/Category/Cateogry';
import CustomCheckbox from '../../common/Checkbox/Checkbox';
import dayjs from 'dayjs';
import { createCalendarEvent, updateCalendarEvent, deleteCalendarEvent } from '../../../apis/calendar';

import * as S from './Style';

const MedicationCard = ({ selectedDate, onClose, editMode = false, editData = null }) => {
  const use = ["내복약만 복용", "외용약만 복용", "함께 복용"];
  const secret = ["공개", "비공개"];
  const [selectedCategory, setSelectedCategory] = useState(use[0]);
  const [selectedSecret, setSelectedSecret] = useState(secret[0]);
  const [title, setTitle] = useState('');
  const [startDate, setStartDate] = useState(null);
  const [endDate, setEndDate] = useState(null);
  const [alarm, setAlarm] = useState(false);
  const [isPublic, setIsPublic] = useState(true);
  const [priority, setPriority] = useState(1);
  const [loading, setLoading] = useState(false);
  const [times, setTimes] = useState({
    morning: false,
    noon: false,
    evening: false,
  });


  useEffect(() => {
    if (editMode && editData) {
      console.log('편집 모드 데이터 로딩:', editData);
      
      setTitle(editData.title || '');
      setPriority(editData.priority || 1);
      setIsPublic(editData.isPublic !== false);
      setSelectedSecret(editData.isPublic !== false ? "공개" : "비공개");
      
      if (editData.startDate) {
        setStartDate(dayjs(editData.startDate).toDate());
      }
      if (editData.endDate) {
        setEndDate(dayjs(editData.endDate).toDate());
      }
    }
  }, [editMode, editData]);

  const toggleTimes = (key) => {
    setTimes((prev) => ({ ...prev, [key]: !prev[key] }));
  };

  const handleStartDateChange = (date) => {
    if (date.year && date.month && date.day) {
      const formatted = dayjs(`${date.year}-${date.month}-${date.day}`);
      setStartDate(formatted.isValid() ? formatted.toDate() : null);
    }
  };

  const handleEndDateChange = (date) => {
    if (date.year && date.month && date.day) {
      const formatted = dayjs(`${date.year}-${date.month}-${date.day}`);
      setEndDate(formatted.isValid() ? formatted.toDate() : null);
    }
  };

  const handleSecretChange = (secret) => {
    setSelectedSecret(secret);
    setIsPublic(secret === "공개");
  };

  const handleDelete = async () => {
    if (!editMode || !editData) return;
    
    if (!window.confirm(`"${title}" 일정을 삭제하시겠습니까?`)) {
      return;
    }

    setLoading(true);
    try {
      await deleteCalendarEvent(editData.eventId);
      alert('복약 일정이 삭제되었습니다.');
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
      alert("병명을 입력해주세요.");
      return;
    }

    if (!startDate || !endDate) {
      alert("복약 시작일과 종료일을 모두 선택해주세요.");
      return;
    }

    if (startDate > endDate) {
      alert("종료일은 시작일보다 늦어야 합니다.");
      return;
    }

    setLoading(true);

    const eventData = {
      eventType: 'MEDICATION',
      title: title.trim(),
      startDate: dayjs(startDate).format('YYYY-MM-DDTHH:mm:ss'),
      endDate: dayjs(endDate).format('YYYY-MM-DDTHH:mm:ss'),
      priority: priority
    };

    try {
      let response;
      if (editMode && editData) {
        response = await updateCalendarEvent(editData.eventId, eventData);
        console.log('복약 일정 수정 성공:', response);
        alert('복약 일정이 수정되었습니다!');
      } else {
        response = await createCalendarEvent(eventData);
        console.log('복약 일정 등록 성공:', response);
        alert('복약 일정이 캘린더에 등록되었습니다!');
      }
      
      if (onClose) {
        onClose();
      }
      
    } catch (error) {
      console.error('복약 일정 처리 실패:', error);
      
      if (error.response) {
        alert(`처리 실패: ${error.response.data.message || '서버 오류가 발생했습니다.'}`);
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
      <S.Content>{editMode ? '복약 일정을 수정하거나 추가 정보를 입력할 수 있습니다.' : '복약알림을 받거나, 캘린더에 복약기간을 등록해보세요.'}</S.Content>
      <div style={{ display: 'flex', margin: '16px 0', flexWrap: 'wrap' }}>
        <S.Text>
          <S.Title>병명</S.Title>
          <S.AddText>필수, 최대 10자</S.AddText>
        </S.Text>
        <Input type="text"
          value={title}
          onChange={(e) => setTitle(e.target.value.slice(0, 10))}
          label="병명"
          placeholder="병명을 입력하세요."
        />
      </div>
      <div style={{ display: 'flex', gap: '16px', marginBottom: '16px'}}>
        <S.Wrapper>
          <S.Title>복약 시작일</S.Title>
          <DateSelect
            year={startDate?.getFullYear()}
            month={startDate?.getMonth() + 1}
            day={startDate?.getDate()}
            onChange={handleStartDateChange}
          />
        </S.Wrapper>

        <S.Wrapper>
          <S.Title>복약 종료일</S.Title>
          <DateSelect
            year={endDate?.getFullYear()}
            month={endDate?.getMonth() + 1}
            day={endDate?.getDate()}
            onChange={handleEndDateChange}
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

      <S.Title>약물명 및 복약량(횟수)</S.Title>
      <div style={{ display: 'flex', gap: '4px', marginBottom: '16px'}}> 
        <S.Input placeholder="약물명"/>
        <S.Input placeholder="n"/>
      </div>

      <S.Title>복약시기 및 주의사항</S.Title>
      <S.TimeCheckboxWrapper>
        {["morning", "noon", "evening"].map((time) => (
          <S.CheckWrapper key={time}>
            <CustomCheckbox
              label={{ morning: "아침", noon: "점심", evening: "저녁" }[time]}
              checked={times[time]}
              onChange={() => toggleTimes(time)}
            />
            <S.Input placeholder="주의사항"/>
          </S.CheckWrapper>
        ))}
      </S.TimeCheckboxWrapper>

      <S.Title>일정공개 여부</S.Title>
      <div style={{marginTop: '8px', marginBottom: '8px'}}>
     <Category labels={secret} selectedTab={selectedSecret}  onTabClick={handleSecretChange}buttonStyle="gradient" />
      </div>
      <div style={{ display: 'flex', gap: '8px' }}>
        <Button 
          text={loading ? (editMode ? "수정 중..." : "등록 중...") : (editMode ? "복약일정 수정하기" : "복약일정 및 정보 기록하기")}
          onClick={handleSubmit}
          disabled={loading || !title.trim() || !startDate || !endDate}
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

export default MedicationCard;