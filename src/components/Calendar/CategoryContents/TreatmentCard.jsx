import React, { useState, useEffect } from 'react';
import Input from '../../common/Input/Input';
import Button from '../../common/Button/Button';
import ImageUpload from '../ImageUpload';
import Category from '../../common/Category/Cateogry';
import { createCalendarEvent, updateCalendarEvent, deleteCalendarEvent, createMedicalResult, updateMedicalResult, deleteMedicalResult,  getMedicalResult, uploadMedicalImage, deleteMedicalImage } from '../../../apis/calendar';
import dayjs from 'dayjs';
import * as S from './Style';

const TreatmentCard = ({ selectedDate, onClose, editMode = false, editData = null }) => {
  const secret = ["공개", "비공개"];
  const [selectedSecret, setSelectedSecret] = useState(secret[0]);
  const [title, setTitle] = useState(''); 
  const [memo, setMemo] = useState('');
  const [isPublic, setIsPublic] = useState(true);
  const [priority, setPriority] = useState(1); 
  const [loading, setLoading] = useState(false);
  const [uploadedImages, setUploadedImages] = useState([]);
  const [medicalResultData, setMedicalResultData] = useState(null);

  useEffect(() => {
    if (editMode && editData) {    
      setTitle(editData.title || '');
      setPriority(editData.priority || 1);
      setIsPublic(editData.isPublic !== false); 
      setSelectedSecret(editData.isPublic !== false ? "공개" : "비공개");
      
      loadExistingMedicalResult(editData.eventId);
    }
  }, [editMode, editData]);

  const loadExistingMedicalResult = async (eventId) => {
    try {
      const result = await getMedicalResult(eventId);
      setMedicalResultData(result);
      setMemo(result.memo || '');
      if (result.imageIds && result.imageIds.length > 0) {
        setUploadedImages(result.imageIds.map(id => ({ id, url: `/api/auth/user/images/${id}` })));
      }
    } catch (error) {
      console.log('기존 진료결과 데이터 없음 또는 로드 실패:', error);
    }
  };

  const handleSecretChange = (secret) => {
    setSelectedSecret(secret);
    setIsPublic(secret === "공개");
  };

  const handleImageUpload = async (imageFile) => {
    try {
      const imageResponse = await uploadMedicalImage(imageFile);
      const newImage = {
        id: imageResponse.imageId,
        url: URL.createObjectURL(imageFile),
        file: imageFile
      };
      setUploadedImages(prev => [...prev, newImage]);
      return imageResponse;
    } catch (error) {
      console.error('이미지 업로드 실패:', error);
      alert('이미지 업로드에 실패했습니다.');
      throw error;
    }
  };

  const handleImageDelete = async (imageId) => {
    try {
      await deleteMedicalImage(imageId);
      setUploadedImages(prev => prev.filter(img => img.id !== imageId));
    } catch (error) {
      console.error('이미지 삭제 실패:', error);
      alert('이미지 삭제에 실패했습니다.');
    }
  };

  const handleDelete = async () => {
    if (!editMode || !editData) return;
    if (!window.confirm(`"${title}" 일정을 삭제하시겠습니까?`)) {
      return;
    }
    
    setLoading(true);
    try {
      for (const image of uploadedImages) {
        await deleteMedicalImage(image.id);
      }
      
      if (medicalResultData) {
        await deleteMedicalResult(editData.eventId);
      }
      
      await deleteCalendarEvent(editData.eventId);
      
      alert('진료결과가 삭제되었습니다.');
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
    if (!selectedDate) {
      alert("날짜를 선택해주세요.");
      return;
    }
    
    setLoading(true);
    try {
      const startDate = selectedDate ? dayjs(selectedDate).startOf('day') : dayjs().startOf('day');
      const endDate = selectedDate ? dayjs(selectedDate).endOf('day') : dayjs().endOf('day');

      const calendarEventData = {
        eventType: 'CHECKUP', 
        title: title.trim(),
        startDate: startDate.format('YYYY-MM-DDTHH:mm:ss'),
        endDate: endDate.format('YYYY-MM-DDTHH:mm:ss'),
        priority: priority
      };

      let eventResponse;
      
      if (editMode && editData) {
        console.log('진료결과 수정 요청:', calendarEventData);
        eventResponse = await updateCalendarEvent(editData.eventId, calendarEventData);
        console.log('진료결과 수정 성공:', eventResponse);
      } else {
        console.log('진료결과 이벤트 생성 요청:', calendarEventData);
        eventResponse = await createCalendarEvent(calendarEventData);
        console.log('진료결과 이벤트 생성 성공:', eventResponse);
      }

      const medicalResultPayload = {
        memo: memo.trim() || null,
        imageIds: uploadedImages.map(img => img.id),
        isPublic: isPublic
      };

      const eventId = editMode ? editData.eventId : eventResponse.eventId;
      
      if (editMode && medicalResultData) {
        await updateMedicalResult(eventId, medicalResultPayload);
        console.log('진료결과 데이터 수정 성공');
      } else {
        await createMedicalResult(eventId, medicalResultPayload);
        console.log('진료결과 데이터 생성 성공');
      }

      alert(editMode ? '진료결과가 수정되었습니다!' : '진료결과가 성공적으로 등록되었습니다!');
      
      if (onClose) {
        onClose();
      }
    } catch (error) {
      console.error('진료결과 처리 실패:', error);
      
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
      <S.Content>{editMode ? '진료 결과 정보를 수정할 수 있습니다.' : '진료 결과를 입력할 수 있습니다.'}</S.Content>
      <div style={{ display: 'flex', margin: '16px 0', flexWrap: 'wrap'}}>
        <S.Text>
          <S.Title>병명</S.Title>
          <S.AddText>필수, 최대 10자</S.AddText>
        </S.Text>
        <Input 
          type="text"
          value={title}
          onChange={(e) => setTitle(e.target.value.slice(0, 10))}
          label="병명" 
          placeholder="병명을 입력하세요." 
        />
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
      
      <S.Title>진료결과 이미지 업로드하기</S.Title>
      <div style={{ margin: '8px 0'}}>
        <ImageUpload 
          onImageUpload={handleImageUpload}
          onImageDelete={handleImageDelete}
          uploadedImages={uploadedImages}
        />
      </div>
      
      <S.Title>메모</S.Title>
      <div style={{ marginBottom: '16px'}}>
        <S.InputField 
          value={memo} 
          onChange={(e) => setMemo(e.target.value)} 
          placeholder='메모를 입력하세요.'
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
        <Button 
          text={loading ? (editMode ? "수정 중..." : "등록 중...") : (editMode ? "진료결과 수정하기" : "진료결과 기록완료")}
          onClick={handleSubmit}
          disabled={loading || !title.trim()}
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

export default TreatmentCard;