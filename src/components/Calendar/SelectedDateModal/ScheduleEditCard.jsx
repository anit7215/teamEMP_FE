import Card from '../../common/Card/Card';
import MedicationCard from '../CategoryContents/MedicationCard';
import TreatmentCard from '../CategoryContents/TreatmentCard';
import ScheduleCard from '../CategoryContents/ScheduleCard';
import * as S from "./Style";

function ScheduleEditCard({ selectedEventType, selectedEvent, selectedDate, onBack, onClose }) {
  const getEventTypeName = (eventType) => {
    switch (eventType) {
      case "MEDICATION": return "복약관리";
      case "CHECKUP": return "진료결과";
      case "RESERVATION": return "진료일정";
      default: return "기타";
    }
  };

  const renderEditContent = () => {
    switch (selectedEventType) {
      case 'MEDICATION':
        return <MedicationCard selectedDate={selectedDate} onClose={onClose} editMode={true} editData={selectedEvent} />;
      case 'CHECKUP':
        return <TreatmentCard selectedDate={selectedDate} onClose={onClose} editMode={true} editData={selectedEvent} />;
      case 'RESERVATION':
        return <ScheduleCard selectedDate={selectedDate} onClose={onClose} editMode={true} editData={selectedEvent} />;
      default:
        return null;
    }
  };

  return (
    <Card>
      <S.BackButton onClick={onBack}>← 목록으로 돌아가기</S.BackButton>
      <S.Title>{getEventTypeName(selectedEventType)} 편집</S.Title>
      {renderEditContent()}
    </Card>
  );
}

export default ScheduleEditCard;