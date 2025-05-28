import React, { useState } from 'react';
import Card from '../../components/common/Card/Card';
import Tag from '../../components/common/Tag/Tag';
import Input from '../../components/common/Input/Input';
import Button from '../../components/common/Button/Button'
import defaultImage from '../../assets/icons/defaultProfile.svg';
import AddButton from '../../assets/icons/addButton.svg';
import * as S from './Style';

const MyPage = () => {
    const [isPublic, setIsPublic] = useState("");
    const [keywordForms, setKeywordForms] = useState([{ id: Date.now() }]); 

    const handleAddKeyword = () => {
        setKeywordForms(prev => [...prev, { id: Date.now() }]);
    };
    return (
        <S.Container>
            <Card>
                <S.Title>마이페이지</S.Title>
                <S.Content>나의 건강토픽을 설정하고 공개 및 비공개 여부를 설정하세요. 가족에게 해당 키워드를 공개하게 되면 보여집니다.</S.Content>
            </Card>
            <Card>
                <S.Wrapper>
                    <S.ProfileImage src={defaultImage} />
                    <S.MeIcon>나</S.MeIcon>
                    <S.InfoContainer>
                        <S.Name>현재 공개 키워드</S.Name>
                        <S.TagContainer>
                            <Tag text={"체중조절"} />
                            <Tag text={"철분부족"} />
                            <Tag text={"28세"} disabled={true} />
                        </S.TagContainer>
                    </S.InfoContainer>
                </S.Wrapper>
            </Card>
            <Card>
                <S.Title>비공개 키워드</S.Title>
            </Card>
            <Card>
                <S.Title>나의 건강 키워드 등록하기</S.Title>
                <S.Content>건강 키워드는 전부 사용자 정의 키워드이며,<br/> 상위 공개 키워드 2개까지만 가족관리 탭에 노출됩니다.</S.Content>
                {keywordForms.map((form, index) => (
                    <S.NameAndGenderWrapper key={form.id}>
                        <S.NameWrapper>
                            <S.Name>
                                <S.Title>새 건강 키워드</S.Title>
                                <S.AddText>최대 4자</S.AddText>
                            </S.Name>
                            <Input />
                        </S.NameWrapper>

                        <S.GenderBlock>
                            <S.Name>가족 공개여부</S.Name>
                            <S.GenderButtonGroup>
                                <S.GenderButton
                                    selected={isPublic === "공개"}
                                    onClick={() => setIsPublic("공개")}
                                >
                                    공개
                                </S.GenderButton>
                                <S.GenderButton
                                    selected={isPublic === "비공개"}
                                    onClick={() => setIsPublic("비공개")}
                                >
                                    비공개
                                </S.GenderButton>
                            </S.GenderButtonGroup>
                        </S.GenderBlock>
                    </S.NameAndGenderWrapper>
                ))}
                <S.AddButton src={AddButton} onClick={handleAddKeyword}/>
                <Button text="키워드 등록하기"/>
            </Card>
            
            
        </S.Container>
    );
};
export default MyPage;