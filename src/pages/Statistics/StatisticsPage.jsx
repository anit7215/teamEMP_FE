import React, { useState } from 'react';
import Card from '../../components/common/Card/Card';
import Category from '../../components/common/Category/Cateogry';
import CalendarHeader from '../../components/Calendar/Header';
import CalendarGrid from '../../components/Calendar/Calendar';
import * as S from './Style';

const StatisticsPage = () => {
    const categories = ["주간", "월간"];
    const [selectedCategory, setSelectedCategory] = useState(categories[0]);

    const handleCategoryChange = (category) => {
        setSelectedCategory(category);
    };

    const getContentForCategory = () =>{
        switch(selectedCategory){
            case "주간" :
                return{};
            case "월간" :
                return{};
        }
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
            <Category labels={categories} selectedTab={selectedCategory} onTabClick={handleCategoryChange}/>
            {selectedCategory === 0 ? (
                <div>주간그래프</div>
            ) : (
                <div>월간그래프</div>
            )}
            <Card>
                    <CalendarHeader
                      year={year}
                      month={month}
                      onPrev={handlePrevMonth}
                      onNext={handleNextMonth}
                    />
            
                    <CalendarGrid
                      weeks={weeks}
                      today={today}
                      selectedDate={selectedDate}
                      year={year}
                      month={month}
                      onDateClick={handleDateClick}
                    />
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