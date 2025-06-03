import React, { useState } from 'react';
import Card from '../../components/common/Card/Card';
import Tag from '../../components/common/Tag/Tag';
import Input from '../../components/common/Input/Input';
import Button from '../../components/common/Button/Button'
import defaultImage from '../../assets/icons/defaultProfile.svg';
import AddButton from '../../assets/icons/addButton.svg';
import * as S from './Style';
import useGetMyHealthTag from '../../hooks/queries/useGetMyHealthTag';
import useAddHealthTag from '../../hooks/mutations/useAddHealthTag';
import useDeleteHealthTag from '../../hooks/mutations/useDeleteHealthTag';
import { useAuth } from '../../context/AuthContext';

const MyPage = () => {
    const { logout } = useAuth();
    const [isPublic, setIsPublic] = useState("");
    const [keywordForms, setKeywordForms] = useState([{ id: Date.now(), isPublic: "", content: "" }]);

    const { data, isLoading, isError, refetch,error } = useGetMyHealthTag();
    const { mutate: addHealthTag } = useAddHealthTag();
    const { mutate: deleteHealthTag } = useDeleteHealthTag();

    const publicTags = (data || []).filter(tag => tag.public === true || tag.public === 'true');
    const privateTags = (data || []).filter(tag => tag.public === false || tag.public === 'false');


    data?.data?.forEach(tag => console.log(tag.content, '-', tag.public, '-', typeof tag.public));


    const handleAddKeyword = () => {
        setKeywordForms(prev => [...prev, { id: Date.now() }]);
    };
    const handlePublicChange = (id, value) => {
        setKeywordForms(prev =>
            prev.map(form =>
            form.id === id ? { ...form, isPublic: value } : form
            )
        );
    };
    const handleSubmit = () => {
        const validTags = keywordForms.filter(form => form.content && form.isPublic);
        const payload = validTags.map(form => ({
            content: form.content,
            public: form.isPublic === "공개" ? true : false,
    }));

    if (payload.length > 0) {
        addHealthTag(payload);
    }};


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
                        {publicTags.length > 0 ? publicTags.map(tag => (
                        <Tag
                        key={tag.id}
                        text={tag.content}
                        onDelete={() => deleteHealthTag(tag.id)}
                        />
                    )) : <S.Content>공개된 키워드가 없습니다.</S.Content>}
                        </S.TagContainer>

                    </S.InfoContainer>
                </S.Wrapper>
            </Card>
            <Card>
                <S.InfoContainer>
                <S.Title>비공개 키워드</S.Title>
                <S.TagContainer>
                        {privateTags.length > 0 ? privateTags.map(tag => (
                        <Tag
                        key={tag.id}
                        text={tag.content}
                        onDelete={() => deleteHealthTag(tag.id)}
                        disabled={true}
                        />
                    )) : <S.Content>비공개 키워드가 없습니다.</S.Content>}
                </S.TagContainer>
                </S.InfoContainer>
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
                            <Input value={form.content}      onChange={(e) =>
          setKeywordForms(prev =>
            prev.map(f =>
              f.id === form.id ? { ...f, content: e.target.value } : f
            )
          )
        }/>
                        </S.NameWrapper>

                        <S.GenderBlock>
                            <S.Name>가족 공개여부</S.Name>
                            <S.GenderButtonGroup>
                                <S.GenderButton
                                    selected={form.isPublic === "공개"}
                                    onClick={() => handlePublicChange(form.id, "공개")}
                                >
                                    공개
                                </S.GenderButton>
                                <S.GenderButton
                                    selected={form.isPublic === "비공개"}
                                    onClick={() => handlePublicChange(form.id, "비공개")}
                                >
                                    비공개
                                </S.GenderButton>
                            </S.GenderButtonGroup>
                        </S.GenderBlock>
                    </S.NameAndGenderWrapper>
                ))}
                <S.AddButton src={AddButton} onClick={handleAddKeyword}/>
                <Button text="키워드 등록하기" onClick={handleSubmit}/>
            </Card>
            
            <Card>
                <S.Title>내가 쓴 글 모아보기</S.Title>
            </Card>
            <Card onClick={logout}>
                <S.Title>로그아웃</S.Title>
            </Card>
        </S.Container>
    );
};
export default MyPage;