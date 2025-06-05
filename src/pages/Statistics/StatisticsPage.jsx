import React, { useState, useEffect } from 'react';
import {
  LineChart, Line, XAxis, Tooltip, ResponsiveContainer
} from "recharts";
import Card from '../../components/common/Card/Card';
import Category from '../../components/common/Category/Cateogry';
import CalendarHeader from '../../components/Calendar/Header';
import * as S from './Style';
import { fetchWeeklyHealthData, fetchMonthlyHealthData } from '../../apis/Statistics';
import useGetMyInfo from '../../hooks/queries/useGetMyInfo'; //커스텀 훅 import
import dayjs from 'dayjs';

const groupByWeekOfMonth = (records) => {
  const weekMap = {};

  records.forEach(item => {
    const date = dayjs(item.date);
    const week = Math.ceil(date.date() / 7); // 1~7일 → 1주차, ...

    if (!weekMap[week]) {
      weekMap[week] = [];
    }
    weekMap[week].push(Number(item.value));
  });

  // 각 주차의 평균값 계산
  const groupedData = Object.entries(weekMap).map(([week, values]) => {
    const average = values.reduce((sum, v) => sum + v, 0) / values.length;
    return {
      name: `${week}주차`,
      value: Number(average.toFixed(2)),
    };
  });

  return groupedData.sort((a, b) => parseInt(a.name) - parseInt(b.name));
};

const StatisticsPage = () => {
  const categories = ["주간", "월간"];
  const [selectedCategory, setSelectedCategory] = useState(categories[0]);
  const [graphData, setGraphData] = useState([]);
  const [healthComment, setHealthComment] = useState("");

  const [year, setYear] = useState(new Date().getFullYear());
  const [month, setMonth] = useState(new Date().getMonth());

  // 월 이동 함수
  const handlePrevMonth = () => {
    if (month === 0) {
      setMonth(11);
      setYear(prev => prev - 1);
    } else {
      setMonth(prev => prev - 1);
    }
  };

  const handleNextMonth = () => {
    if (month === 11) {
      setMonth(0);
      setYear(prev => prev + 1);
    } else {
      setMonth(prev => prev + 1);
    }
  };

  const { data: userInfo, isLoading, isError } = useGetMyInfo(); //사용자 정보 가져오기
  const token = localStorage.getItem("accessToken");
  console.log(userInfo?.verifyId);
  useEffect(() => {
    const getWeeklyData = async () => {
      if (!token || isError || !userInfo?.verifyId) {
        setHealthComment("로그인이 필요합니다.");
        setGraphData([]);
        return;
      }

      try {
        const data = await fetchWeeklyHealthData(userInfo.verifyId, 2025, 6, 1, "BLOOD_SUGAR", token);
        const apiData = data.recordGraphRes.map(item => ({
          name: item.date.slice(5), // MM-DD
          value: Number(item.value),
        }));
        setGraphData(apiData);
        setHealthComment(data.healthComment || "");
      } catch (error) {
        console.error("건강 데이터 불러오기 실패:", error);
        setHealthComment("데이터를 불러오는 데 실패했습니다.");
        setGraphData([]);
      }
    };

    const getMonthlyData = async () => {
      if (!token || isError || !userInfo?.verifyId) {
        setHealthComment("로그인이 필요합니다.");
        setGraphData([]);
        return;
      }

      try {
        const data = await fetchMonthlyHealthData(userInfo.verifyId, 2025, 6, "BLOOD_SUGAR", token);
        const groupedData = groupByWeekOfMonth(data.recordGraphRes);
        setGraphData(groupedData);
        setHealthComment(data.healthComment || "");
      } catch (error) {
        console.error("월간 건강 데이터 불러오기 실패:", error);
        setHealthComment("월간 데이터를 불러오는 데 실패했습니다.");
        setGraphData([]);
      }
    };


    if (selectedCategory === "주간" && userInfo && !isLoading) {
      getWeeklyData();
    } else if (selectedCategory === "월간" && userInfo && !isLoading) {
      getMonthlyData();
    }
  }, [selectedCategory, userInfo, isLoading, isError, token, year, month]);


  return (
    <S.Container>
      <Card style={{ marginBottom: '16px' }}>
        <S.Title>나의 혈당통계</S.Title>
        <S.Content>월간 혈당을 한 눈에 볼 수 있습니다.</S.Content>
      </Card>

      <Category
        labels={categories}
        selectedTab={selectedCategory}
        onTabClick={setSelectedCategory}
      />

      <Card style={{ marginTop: '16px' }}>
        <CalendarHeader
          year={year}
          month={month}
          onPrev={handlePrevMonth}
          onNext={handleNextMonth}
        />
        <S.GraphWrapper>
          <ResponsiveContainer width="100%" height={320}>
            <LineChart data={graphData} margin={{ right: 30 }}>
              <XAxis
                dataKey="name"
                padding={{ left: 20, right: 20 }}
                interval="preserveStartEnd"
              />
              <Tooltip />
              <Line
                type="linear"
                dataKey="value"
                strokeWidth={2}
                stroke="#42CCC5"
              />
            </LineChart>
          </ResponsiveContainer>
        </S.GraphWrapper>
      </Card>

      <S.Card>
        <S.CardTitle>혈당 통계요약</S.CardTitle>
        <S.CardContent>{healthComment}</S.CardContent>
      </S.Card>
    </S.Container>
  );
};

export default StatisticsPage;
