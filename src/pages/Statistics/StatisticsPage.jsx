import React, { useState, useEffect } from 'react';
import {
  LineChart, Line, XAxis, Tooltip, ResponsiveContainer
} from "recharts";
import Card from '../../components/common/Card/Card';
import Category from '../../components/common/Category/Cateogry';
import CalendarHeader from '../../components/Calendar/Header';
import GraphImage from '../../assets/icons/graph.png';
import * as S from './Style';

const StatisticsPage = () => {
    const categories = ["주간", "월간"];
    const [selectedCategory, setSelectedCategory] = useState(categories[0]);
    const [graphData, setGraphData] = useState([]);

    const sampleDailyData = [ //더미데이터
    { name: "05/19", value: 90 },
    { name: "05/20", value: 110 },
    { name: "05/21", value: 100 },
    { name: "05/22", value: 130 },
    { name: "05/23", value: 95 },
    { name: "05/24", value: 120 },
    { name: "05/25", value: 105 },
  ];

  const calculateWeeklyAverages = (dailyData) => {
    // 일단은 1주만 값 존재
    const week1 = dailyData.slice(0, 7);
    const avg = Math.round(
      week1.reduce((acc, cur) => acc + cur.value, 0) / week1.length
    );

    return [
      { name: "1주차", value: avg },
      { name: "2주차", value: 115 }, // 더미
      { name: "3주차", value: 125 },
      { name: "4주차", value: 105 },
    ];
  };

  useEffect(() => {
    if (selectedCategory === "주간") {
      const formattedData = sampleDailyData.map((d, idx) => ({
        name: ["05/19", "05/20", "05/21", "05/22", "05/23", "05/24",  "05/25"][idx],
        value: d.value,
      }));
      setGraphData(formattedData);
    } else if (selectedCategory === "월간") {
      const weeklyAvgData = calculateWeeklyAverages(sampleDailyData);
      setGraphData(weeklyAvgData);
    }
  }, [selectedCategory]);

    const handleCategoryChange = (category) => {
        setSelectedCategory(category);
    };

    const getContentForCategory = () =>{
      return (
        <S.GraphWrapper>
          <ResponsiveContainer width="100%" height={320}>
            <LineChart data={graphData} margin={{  right: 30 }}>
              <XAxis dataKey="name"/>
              <Tooltip />
              <Line type="linear" dataKey="value" strokewidth={2} stroke="#42CCC5"/>
            </LineChart>
          </ResponsiveContainer>
        </S.GraphWrapper>
      );
    };

      const today = new Date();
      const [currentDate, setCurrentDate] = useState(new Date());
      const [selectedDate, setSelectedDate] = useState(null);
    
      const year = currentDate.getFullYear();
      const month = currentDate.getMonth();
      const weeks = getMonthData(year, month);
    
      const handlePrevMonth = () => {
        setCurrentDate(new Date(year, month - 1, 1));
        setSelectedDate(null);
      };
    
      const handleNextMonth = () => {
        setCurrentDate(new Date(year, month + 1, 1));
        setSelectedDate(null);
      };
    
      const handleDateClick = (day) => {
        if (day) setSelectedDate(new Date(year, month, day));
      };

    return (
        <S.Container>
            <Card>
                <S.Title>
                    나의 혈당통계
                </S.Title>
                <S.Content>
                    월간 혈당을 한 눈에 볼 수 있습니다.
                </S.Content>
            </Card>
            <Category labels={categories} selectedTab={selectedCategory} onTabClick={setSelectedCategory}/>
            <Card>

                    <CalendarHeader
                      year={year}
                      month={month}
                      onPrev={handlePrevMonth}
                      onNext={handleNextMonth}
                    />
                    {getContentForCategory()}
                  </Card>

            <S.Card>
                <S.CardTitle>
                    혈당 통계요약
                </S.CardTitle>
                <S.CardContent>
                    주간 혈당 통계가 일정하지 않습니다. 혈당 조절에 더욱 힘써보세요. 혈당 상승은 알게 모르게 일어납니다. 혹시나 식사 후 액상과당을 섭취하고 있지는 않나요? 생활습관을 다시 한 번 돌아보세요.
                </S.CardContent>
            </S.Card>
        </S.Container>
    );
}

function getMonthData(year, month) {
  const firstDay = new Date(year, month, 1).getDay();
  const lastDate = new Date(year, month + 1, 0).getDate();

  const weeks = [];
  let dayCounter = 1;

  let firstWeek = new Array(7).fill(null);
  for (let i = firstDay; i < 7; i++) {
    firstWeek[i] = dayCounter++;
  }
  weeks.push(firstWeek);

  while (dayCounter <= lastDate) {
    let week = new Array(7).fill(null);
    for (let i = 0; i < 7 && dayCounter <= lastDate; i++) {
      week[i] = dayCounter++;
    }
    weeks.push(week);
  }

  return weeks;
}

export default StatisticsPage;