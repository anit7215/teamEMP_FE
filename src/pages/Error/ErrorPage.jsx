import { useNavigate } from 'react-router-dom';
import * as S from './Style';

const ErrorNotFound = () => {
  const navigate = useNavigate();

  return (
    <S.Container>
      <S.Title>404</S.Title>
      <S.Subtitle>페이지를 찾을 수 없습니다</S.Subtitle>
      <S.HomeButton onClick={() => navigate('/home')}>
        홈으로 이동
      </S.HomeButton>
    </S.Container>
  );
};

export default ErrorNotFound;
