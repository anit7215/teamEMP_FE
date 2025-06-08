import Card from '../../common/Card/Card';
import MedicationCard from '../CategoryContents/MedicationCard';
import TreatmentCard from '../CategoryContents/TreatmentCard';
import ScheduleCard from '../CategoryContents/ScheduleCard';
import * as S from "./Style";

function CategoryContentCard({ selectedCategory, selectedDate, onClose }) {
  const renderContent = () => {
    switch (selectedCategory) {
      case "복약관리":
        return <MedicationCard selectedDate={selectedDate} onClose={onClose} />;
      case "진료관리":
        return <TreatmentCard selectedDate={selectedDate} onClose={onClose} />;
      case "진료일정":
        return <ScheduleCard selectedDate={selectedDate} onClose={onClose} />;
      default:
        return null;
    }
  };

  return (
    <Card>
      <S.Title>{selectedCategory} 등록</S.Title>
      {renderContent()}
    </Card>
  );
}

export default CategoryContentCard;