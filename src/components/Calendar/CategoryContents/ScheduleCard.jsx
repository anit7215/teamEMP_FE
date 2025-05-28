import React,{ useState } from 'react';
import Input from '../../common/Input/Input';
import Button from '../../common/Button/Button';
import Category from '../../common/Category/Cateogry';
import * as S from './Style';

const ScheduleCard = () => {
    const secret = ["공개", "비공개"];
        const [selectedSecret, setSelectedSecret] = useState(secret[0]);
  return (
    <>
      <S.Content>진료장소, 간단한 길안내 등을 기록해보세요.</S.Content>
      <div style={{ display: 'flex', gap: '16px', margin: '16px 0'}}>
        <S.Wrapper>
            <S.Text>
                <S.Title>장소</S.Title>
                <S.AddText>필수</S.AddText>
            </S.Text>
            <Input  label="장소" placeholder="장소를 입력하세요." />
        </S.Wrapper>
        <S.Wrapper>
            <S.Text>
                <S.Title>시간</S.Title>
                <S.AddText>선택</S.AddText>
            </S.Text>
            <Input label="시간" placeholder="진료시간을 선택하세요." type="time" />
        </S.Wrapper>
      </div>

      <S.Title>메모</S.Title>
          <div style={{ marginBottom: '16px'}}>
          <S.InputField placeholder="메모를 입력하세요."/>
          </div>

      <S.Title>일정공개 여부</S.Title>
      <div style={{marginTop: '8px', marginBottom: '8px'}}>
      <Category labels={secret} selectedTab={selectedSecret}  onTabClick={setSelectedSecret}buttonStyle="gradient" />
      </div>


      <Button text="진료일정 기록완료" />
    </>
  );
};

export default ScheduleCard;
