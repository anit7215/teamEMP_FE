import {useState} from 'react';
import Input from '../../common/Input/Input';
import Button from '../../common/Button/Button';
import ImageUpload from '../ImageUpload';
import Category from '../../common/Category/Cateogry';
import * as S from './Style';

const TreatmentCard = () => {
    const secret = ["공개", "비공개"];
    const [selectedSecret, setSelectedSecret] = useState(secret[0]);
  return (
    <>
      <S.Content>진료 결과를 입력할 수 있습니다.</S.Content>
      <div style={{ display: 'flex', margin: '16px 0', flexWrap: 'wrap'}}>
            <S.Text>
                <S.Title>병명</S.Title>
                <S.AddText>필수, 최대 10자</S.AddText>
            </S.Text>
            <Input  label="병명" placeholder="병명을 입력하세요." />
      </div>
      
      <S.Title>진료결과 이미지 업로드하기</S.Title>
      <div style={{ margin: '8px 0'}}>
        <ImageUpload />
      </div>
    <S.Title>메모</S.Title>
    <div style={{ marginBottom: '16px'}}>
    <S.InputField placeholder='메모를 입력하세요.'/>
    </div>
    

    <S.Title>일정공개 여부</S.Title>
      <div style={{marginTop: '8px', marginBottom: '8px'}}>
      <Category labels={secret} selectedTab={selectedSecret}  onTabClick={setSelectedSecret}buttonStyle="gradient" />
      </div>

      <Button text="진료결과 기록완료" />
    </>
  );
};

export default TreatmentCard;
