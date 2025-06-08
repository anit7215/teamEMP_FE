import Card from '../../common/Card/Card';
import * as S from "./Style";

function ScheduleListCard({ events, loading, error, onEventTypeClick }) {
  const getEventTypeName = (eventType) => {
    switch (eventType) {
      case "MEDICATION": return "복약관리";
      case "CHECKUP": return "진료결과";
      case "RESERVATION": return "진료일정";
      default: return "기타";
    }
  };

  const getEventTypeIcon = (eventType) => {
    switch (eventType) {
      case "MEDICATION": return "💊";
      case "CHECKUP": return "📋";
      case "RESERVATION": return "📅";
      default: return "📌";
    }
  };

  const getEventsByType = (eventType) => {
    return events.filter(event => event.eventType === eventType);
  };

  const renderEventTypeSection = (eventType) => {
    const eventsOfType = getEventsByType(eventType);
    if (eventsOfType.length === 0) return null;

    return (
      <S.ScheduleWrapper onClick={() => onEventTypeClick(eventType)}>
        <S.EventTypeIcon eventType={eventType}>
          {getEventTypeIcon(eventType)}
        </S.EventTypeIcon>
        <S.ScheduleContent>
          <S.ScheduleTitle>
            {getEventTypeName(eventType)} ({eventsOfType.length}개)
          </S.ScheduleTitle>
          {eventsOfType.slice(0, 2).map(event => (
            <S.ScheduleDetail key={event.eventId}>
              • {event.title} (우선순위: {event.priority})
            </S.ScheduleDetail>
          ))}
          {eventsOfType.length > 2 && (
            <S.ScheduleDetail>외 {eventsOfType.length - 2}개</S.ScheduleDetail>
          )}
        </S.ScheduleContent>
      </S.ScheduleWrapper>
    );
  };

  return (
    <Card>
      <S.Title>상세 일정 확인하기</S.Title>
      {loading ? (
        <S.LoadingSpinner>일정을 불러오는 중...</S.LoadingSpinner>
      ) : error ? (
        <S.Content style={{ color: "#ff6b6b", textAlign: "center" }}>{error}</S.Content>
      ) : events.length > 0 ? (
        <S.ScheduleGroup>
          <S.Content>각 부분을 터치하여 세부 일정을 확인할 수 있습니다.</S.Content>
          {renderEventTypeSection("MEDICATION")}
          {renderEventTypeSection("CHECKUP")}
          {renderEventTypeSection("RESERVATION")}
        </S.ScheduleGroup>
      ) : (
        <S.Content style={{ textAlign: "center", padding: "20px 0" }}>
          등록된 일정이 없습니다.<br />위의 카테고리를 선택하여 일정을 추가해보세요.
        </S.Content>
      )}
    </Card>
  );
}

export default ScheduleListCard;