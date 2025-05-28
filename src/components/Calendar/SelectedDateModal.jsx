import Card from '../common/Card/Card';
import Modal from '../common/Modal/Modal';
import Category from '../common/Category/Cateogry';
import MedicationCard from './CategoryContents/MedicationCard';
import TreatmentCard from './CategoryContents/TreatmentCard';
import ScheduleCard from './CategoryContents/ScheduleCard';
import PriorityList from './PriorityList';

import styled from 'styled-components';

const Title = styled.h2`
  color: #474A52;
  font-family: Pretendard-SemiBold;
  font-size: 16px;
`;

const Content = styled.p`
  margin-top: 4px;
  color: var(--greyscale-600, #686B73);
  font-family: Pretendard-Regular;
  font-size: 11px;
  font-weight: 400;
  line-height: 14px;
`;
const ScheduleGroup = styled.div`
  display: flex;
  gap: 16px;
  flex-direction: column;
`;

const ScheduleTitle = styled.div`
  display: flex;
  align-items: center;
  gap: 4px;
  color: #474A52;
  font-family: Pretendard-SemiBold;
  font-size: 12px;
  margin-bottom: 6px;
`;
const ScheduleWrapper = styled.div`
  display: flex;
  border-bottom: 2.5px solid #42CCC5;

`;

function SelectedDateModal({ selectedDate, onClose, selectedCategory, onCategoryChange, categories }) {
  if (!selectedDate) return null;
  // const hasSchedule = null; 
  const hasSchedule = 1;
  


  return (
    <Modal onClose={onClose}>
      <Card>
        <Title>일정 기록하기</Title>
        <div style={{ display: 'flex', marginTop: '8px', marginBottom: '8px', alignItems: 'center', color: '#686B73', gap: '4px' }}>
          <div style={{ fontFamily: 'Pretendard-Medium', fontSize: '20px' }}>
            {selectedDate.getFullYear()}년 {selectedDate.getMonth() + 1}월 {selectedDate.getDate()}일
          </div>
          <Content> 을 기준으로 기록합니다.</Content>
        </div>
        <div style={{ width: '70%', alignItems: 'center', margin: '4px auto', marginTop: '4px' }}>
          <Category
            labels={categories}
            selectedTab={selectedCategory}
            onTabClick={onCategoryChange}
            buttonStyle="gradient"
          />
        </div>
      </Card>

      <Card>
        {selectedCategory ? (
          <>
            <Title>{selectedCategory}</Title>
            {selectedCategory === "복약관리" && <MedicationCard />}
            {selectedCategory === "진료관리" && <TreatmentCard />}
            {selectedCategory === "진료일정" && <ScheduleCard />}
          </>
        ) : (
          <>
            <Title>상세 일정 확인하기</Title>
            {hasSchedule ? (
              <ScheduleGroup>
                <Content>각 부분을 터치하여 세부 일정을 확인할 수 있습니다.</Content>
                <ScheduleWrapper>
                  <ScheduleTitle>복약관리
                    <Content>어쩌구저쩌구</Content>
                  </ScheduleTitle>
                </ScheduleWrapper>
               <ScheduleWrapper>
                  <ScheduleTitle>진료결과
                    <Content>어쩌구저쩌구</Content>
                  </ScheduleTitle>
                </ScheduleWrapper>
                <ScheduleWrapper>
                  <ScheduleTitle>진료일정
                    <Content>어쩌구저쩌구</Content>
                  </ScheduleTitle>
                </ScheduleWrapper>

              </ScheduleGroup>
            ) : (
              <Content>일정이 없습니다.</Content>
            )}
          </>
        )}
      </Card>
      {!selectedCategory && hasSchedule && (
        <Card>
          <Title>상세 일정 노출 순위</Title>
          <Content>캘린더에 최대 2개 보여질 수 있습니다.</Content>
          <Content>글자 수는 4글자로 제한됩니다.</Content>
          <PriorityList/>
        </Card>
      )};
      
    </Modal>
  );
}

export default SelectedDateModal;
