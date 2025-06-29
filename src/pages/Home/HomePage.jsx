import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Card from '../../components/common/Card/Card';
import Tag from '../../components/common/Tag/Tag';
import Category from '../../components/common/Category/Cateogry';
import Button from '../../components/common/Button/Button';
import Input from '../../components/common/Input/Input';
import defaultImage from '../../assets/icons/defaultProfile.svg';
import useGetMyInfo from '../../hooks/queries/useGetMyInfo';
import useAddHealthValue from '../../hooks/mutations/useAddHealthValue';
import GraphIcon from '../../assets/icons/Graph.svg';

import * as S from './Style';

const HomePage = () => {
    const navigate = useNavigate(); 
    const [inputValue, setInputValue] = useState('');
    const { mutate: addHealthValueMutate } = useAddHealthValue();
    const categories = ["혈당", "혈압", "체중", "수면"];
    const [selectedCategory, setSelectedCategory] = useState(categories[0]);

    const { data: myInfo } = useGetMyInfo();

    const handleCategoryChange = (category) => {
        setSelectedCategory(category);
    };

    const getContentForCategory = () => {
        switch (selectedCategory) {
            case "혈당":
                return {
                    title: "오늘의 혈당 기록",
                    content: "혈당 수치를 기록하여 관리해보세요.",
                    subtitle:"혈당 수치",
                    inputPlaceholder: "혈당을 입력하세요.",
                    unit: "mg/dL"
                };
            case "혈압":
                return {
                    title: "오늘의 혈압 기록",
                    content: "혈압 수치를 기록하여 관리해보세요.",
                    subtitle:"혈압 수치",
                    inputPlaceholder: "혈압을 입력하세요.",
                    unit: "mmHg"
                };
            case "체중":
                return {
                    title: "오늘의 체중 기록",
                    content: "체중을 기록하여 관리해보세요.",
                    subtitle:"체중",
                    inputPlaceholder: "체중을 입력하세요.",
                    unit: "kg"
                };
            case "수면":
                return {
                    title: "오늘의 수면 기록",
                    content: "수면 시간을 기록하여 관리해보세요.",
                    subtitle:"수면 시간",
                    inputPlaceholder: "수면 시간을 입력하세요.",
                    unit: "시간"
                };
            default:
                return {};
        }
    };
    const handleSubmit = () => {
        const typeMap = {
            "혈당": "BLOOD_SUGAR",
            "혈압": "BLOOD_PRESSURE",
            "체중": "WEIGHT",
            "수면": "SLEEP_TIME",
        };

        const type = typeMap[selectedCategory];

        if (!type || inputValue.trim() === '') {
            alert("값을 입력해주세요.");
            return;
        }

        addHealthValueMutate(
            {
                type,
                value: parseFloat(inputValue)
            },
            {
                onSuccess: (data) => {
                    if (data.code === 'GEN-000') {
                        alert(`${selectedCategory} 정보가 기록되었습니다!`);
                    }
                }
            }
        );
        navigate(`/statistics?type=${type}`);


        setInputValue('');
    };


    const { title, content, subtitle, inputPlaceholder, unit } = getContentForCategory();

    return (
        <S.Container>
            <S.Card>
                오늘도 {myInfo?.name}님의 건강을 체크해보세요!
            </S.Card>
            <Card>
                <S.Wrapper>
                    <S.ProfileImage src={defaultImage} />
                    <S.MeIcon>나</S.MeIcon>
                    <S.InfoContainer>
                        <S.Name>{myInfo?.name}</S.Name>
                        <S.TagContainer>
                            {myInfo?.healthTags?.slice().sort((a, b) => Number(b.public) - Number(a.public)).map((tag) => (
                                <Tag key={tag.id} text={tag.content} disabled={!tag.public} />
                            ))}
                        </S.TagContainer>

                    </S.InfoContainer>
                </S.Wrapper>
            </Card>
            <Card>
                <S.Title>
                    오늘의 건강 기록하기
                </S.Title>
                <S.Content>
                    오늘의 건강기록을 통하여 나의 건강을 분석해봅시다.
                </S.Content>
                <Category labels={categories} selectedTab={selectedCategory} onTabClick={handleCategoryChange} buttonStyle="default" />
            </Card>
            <Card>
                 <S.TitleWrapper>
                    <div>
                    <S.Title>{title}</S.Title>
                    <S.Content>{content}</S.Content>
                    </div>
                    <S.GraphButton
                    src={GraphIcon}
                    alt="통계 바로가기"
                    onClick={() => {
                        const typeMap = {
                        "혈당": "BLOOD_SUGAR",
                        "혈압": "BLOOD_PRESSURE",
                        "체중": "WEIGHT",
                        "수면": "SLEEP_TIME",
                        };
                        const type = typeMap[selectedCategory];
                        if (type) {
                        navigate(`/statistics?type=${type}`);
                        } else {
                        alert("잘못된 카테고리입니다.");
                        }
                    }}
                    />
                </S.TitleWrapper>
                <S.Title>{subtitle}</S.Title>
                <S.InputWrapper>
                    <Input placeholder={inputPlaceholder} value={inputValue}
  onChange = {(e) => setInputValue(e.target.value)}/>
                    <S.Title>{unit}</S.Title>
                </S.InputWrapper>
                <Button text={`등록 후 ${selectedCategory} 통계 보러가기`} onClick={handleSubmit} />
            </Card>
        </S.Container>
    );
};

export default HomePage;
