import Card from '../../common/Card/Card';
import Category from '../../common/Category/Cateogry';
import * as S from "./Style";

function ScheduleCreationCard({ selectedDate, categories, selectedCategory, onCategorySelect, onClose }) {
  return (
    <Card>
    <div style={{display:"flex", justifyContent:"space-between"}}>
      <S.Title>일정 기록하기</S.Title>
      <S.BackButton onClick={onClose}>✖</S.BackButton>    
    </div>
      <div style={{ display: "flex", marginTop: "8px", marginBottom: "8px", alignItems: "center", color: "#686B73", gap: "4px" }}>
        <div style={{ fontFamily: "Pretendard-Medium", fontSize: "20px" }}>
          {selectedDate.getFullYear()}년 {selectedDate.getMonth() + 1}월 {selectedDate.getDate()}일
        </div>
        <S.Content>을 기준으로 기록합니다.</S.Content>
      </div>
      <div style={{ width: "70%", alignItems: "center", margin: "4px auto", marginTop: "4px" }}>
        <Category
          labels={categories}
          selectedTab={selectedCategory}
          onTabClick={onCategorySelect}
          buttonStyle="gradient"
        />
      </div>
    </Card>
  );
}

export default ScheduleCreationCard;