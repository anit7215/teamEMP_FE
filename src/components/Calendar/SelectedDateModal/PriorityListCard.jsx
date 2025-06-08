import Card from '../../common/Card/Card';
import PriorityList from '../PriorityList';
import * as S from "./Style";

function PriorityListCard({ events, selectedDate, onPriorityUpdate }) {
  return (
    <Card>
      <S.Title>상세 일정 노출 순위</S.Title>
      <S.Content>캘린더에 최대 2개 보여질 수 있습니다.</S.Content>
      <S.Content>글자 수는 4글자로 제한됩니다.</S.Content>
      <PriorityList events={events} selectedDate={selectedDate} onPriorityUpdate={onPriorityUpdate} />
    </Card>
  );
}

export default PriorityListCard;