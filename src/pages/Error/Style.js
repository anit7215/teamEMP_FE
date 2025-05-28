import styled from 'styled-components';

export const Container = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  height: 100vh;
  text-align: center;
  background: linear-gradient( #FFFFF7 0.98%, #FBFFF6 55.78%, #F7FFFF 97.97%);
  padding: 2rem;
  font-family:Pretendard-Regular;
`;

export const Title = styled.h1`
  font-size: 6rem;
  margin-bottom: 1rem;
  color: #59ABEC;
`;

export const Subtitle = styled.h2`
  font-size: 2rem;
  margin-bottom: 1rem;
`;

export const HomeButton = styled.button`
  padding: 0.8rem 1.5rem;
  font-size: 1rem;
  background-color: #59ABEC;
  color: white;
  border: none;
  border-radius: 8px;
  cursor: pointer;
  transition: 0.3s;

  &:hover {
    background-color:rgb(80, 155, 217);
  }
`;
