import React, { useState, useEffect } from "react";
import { useLocation } from "react-router-dom";
import {
  LineChart,
  Line,
  XAxis,
  Tooltip,
  ResponsiveContainer,
} from "recharts";
import Card from "../../components/common/Card/Card";
import Category from "../../components/common/Category/Cateogry";
import CalendarHeader from "../../components/Calendar/Header"; // 월간 헤더
import WeeklyHeader from "../../components/Calendar/WeeklyHeader.jsx"; // 주간 헤더
import * as S from "./Style.js";
import {
  fetchWeeklyHealthData,
  fetchMonthlyHealthData,
} from "../../apis/Statistics";
import useGetMyInfo from "../../hooks/queries/useGetMyInfo";
import dayjs from "dayjs";

const groupByWeekOfMonth = (records) => {
  const weekMap = {};

  records.forEach((item) => {
    const date = dayjs(item.date);
    const week = Math.ceil(date.date() / 7);

    if (!weekMap[week]) {
      weekMap[week] = [];
    }
    weekMap[week].push(Number(item.value));
  });

  const groupedData = Object.entries(weekMap).map(([week, values]) => {
    const average = values.reduce((sum, v) => sum + v, 0) / values.length;
    return {
      name: `${week}주차`,
      value: Number(average.toFixed(2)),
    };
  });

  return groupedData.sort(
    (a, b) => parseInt(a.name) - parseInt(b.name)
  );
};

const StatisticsPage = () => {
  const categories = ["주간", "월간"];
  const [selectedCategory, setSelectedCategory] = useState(categories[0]); // 기본 주간
  const [graphData, setGraphData] = useState([]);
  const [healthComment, setHealthComment] = useState("");
  const [year, setYear] = useState(new Date().getFullYear());
  const [month, setMonth] = useState(new Date().getMonth());
  const [week, setWeek] = useState(1);

  const location = useLocation();
  const getQueryParam = (param) => {
    const params = new URLSearchParams(location.search);
    return params.get(param);
  };

  const [selectedType, setSelectedType] = useState(
    getQueryParam("type") || "BLOOD_SUGAR"
  );

  useEffect(() => {
    const newType = getQueryParam("type") || "BLOOD_SUGAR";
    setSelectedType(newType);
  }, [location.search]);

  const { data: userInfo, isLoading, isError } = useGetMyInfo();
  const token = localStorage.getItem("accessToken");

  useEffect(() => {
    const getWeeklyData = async () => {
      if (!token || isError || !userInfo?.verifyId) {
        setHealthComment("로그인이 필요합니다.");
        setGraphData([]);
        return;
      }

      try {
        const data = await fetchWeeklyHealthData(
          userInfo.verifyId,
          year,
          month + 1,
          week,
          selectedType,
          token
        );

        const apiData = data.recordGraphRes.map((item) => ({
          name: item.date.slice(5),
          value: Number(item.value),
        }));

        setGraphData(apiData);
        setHealthComment(data.healthComment || "");
      } catch (error) {
        console.error("주간 데이터 불러오기 실패:", error);
        setHealthComment("주간 데이터를 불러오는 데 실패했습니다.");
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
        const data = await fetchMonthlyHealthData(
          userInfo.verifyId,
          year,
          month + 1,
          selectedType,
          token
        );

        const groupedData = groupByWeekOfMonth(data.recordGraphRes);
        setGraphData(groupedData);
        setHealthComment(data.healthComment || "");
      } catch (error) {
        console.error("월간 데이터 불러오기 실패:", error);
        setHealthComment("월간 데이터를 불러오는 데 실패했습니다.");
        setGraphData([]);
      }
    };

    if (selectedCategory === "주간" && userInfo && !isLoading) {
      getWeeklyData();
    } else if (selectedCategory === "월간" && userInfo && !isLoading) {
      getMonthlyData();
    }
  }, [
    selectedCategory,
    selectedType,
    userInfo,
    isLoading,
    isError,
    token,
    year,
    month,
    week,
  ]);

  // 주간 이전/다음
  const handlePrevWeek = () => {
    if (week === 1) {
      if (month === 0) {
        setMonth(11);
        setYear((prev) => prev - 1);
      } else {
        setMonth((prev) => prev - 1);
      }
      setWeek(5); // 최대 5주차 임시 처리
    } else {
      setWeek((prev) => prev - 1);
    }
  };

  const handleNextWeek = () => {
    if (week === 5) {
      if (month === 11) {
        setMonth(0);
        setYear((prev) => prev + 1);
      } else {
        setMonth((prev) => prev + 1);
      }
      setWeek(1);
    } else {
      setWeek((prev) => prev + 1);
    }
  };

  // 월간 이전/다음
  const handlePrevMonth = () => {
    if (month === 0) {
      setMonth(11);
      setYear((prev) => prev - 1);
    } else {
      setMonth((prev) => prev - 1);
    }
  };

  const handleNextMonth = () => {
    if (month === 11) {
      setMonth(0);
      setYear((prev) => prev + 1);
    } else {
      setMonth((prev) => prev + 1);
    }
  };

  const typeNameMap = {
    BLOOD_SUGAR: "혈당",
    BLOOD_PRESSURE: "혈압",
    WEIGHT: "체중",
    SLEEP_TIME: "수면 시간",
  };

  return (
    <S.Container>
      <Card style={{ marginBottom: "16px" }}>
        <S.Title>나의 {typeNameMap[selectedType]} 통계</S.Title>
        <S.Content>
          {selectedCategory} {typeNameMap[selectedType]}을 한 눈에 볼 수 있습니다.
        </S.Content>
      </Card>

      <Category
        labels={categories}
        selectedTab={selectedCategory}
        onTabClick={setSelectedCategory}
      />

      <Card style={{ marginTop: "16px" }}>
      {/* 월간/주간 헤더 */}
      {selectedCategory === "월간" ? (
        <CalendarHeader
          year={year}
          month={month}
          onPrev={handlePrevMonth}
          onNext={handleNextMonth}
        />
      ) : (
        <WeeklyHeader
          year={year}
          month={month}
          week={week}
          onPrev={handlePrevWeek}
          onNext={handleNextWeek}
        />
      )}

      <S.GraphWrapper>
        <ResponsiveContainer width="100%" height={300}>
          <LineChart data={graphData}>
            <XAxis dataKey="name" />
            <Tooltip />
            <Line
              type="monotone"
              dataKey="value"
              stroke="#42CCC5"
              strokeWidth={2}
              dot={{ r: 3 }}
              activeDot={{ r: 5 }}
            />
          </LineChart>
        </ResponsiveContainer>
      </S.GraphWrapper>
      </Card>

      <S.Card>
        <S.CardTitle>건강 상태 코멘트</S.CardTitle>
        <S.CardContent>{healthComment}</S.CardContent>
      </S.Card>
    </S.Container>
  );
};

export default StatisticsPage;
