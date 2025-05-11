import { useForm } from 'react-hook-form';
import * as S from './Style';
import Card from '../../components/common/Card/Card';
import Button from '../../components/common/Button/Button';

const LoginPage = () => {
  const {
    register,
    handleSubmit,
    watch,
    formState: { errors },
  } = useForm({
    mode: 'onChange',
  });

  const onSubmit = (data) => {
    console.log('로그인 데이터:', data);
  };

  const values = watch();
  const password = values.password || "";

  const isDisabled =
    Object.values(errors || {}).some((error) => error?.message?.length > 0) ||
    Object.values(values).some((value) => value === '') ||
    password.length < 8;

  return (
    <S.Container onSubmit={handleSubmit(onSubmit)} as="form">
      <Card>
        <S.Title>로그인</S.Title>

        <S.Input
          type="email"
          {...register('email', {
            required: '이메일을 입력해주세요.',
            pattern: {
              value: /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
              message: '올바른 이메일 형식이 아닙니다.',
            },
          })}
          placeholder="이메일을 입력하세요."
          hasError={!!errors.email}
        />
        {errors.email && <S.ErrorMessage>{errors.email.message}</S.ErrorMessage>}

        <S.Input
          type="password"
          {...register('password', {
            required: '비밀번호를 입력해주세요.',
          })}
          placeholder="비밀번호를 입력하세요."
          hasError={!!errors.password}
        />
        {errors.password && <S.ErrorMessage>{errors.password.message}</S.ErrorMessage>}

        <Button type="submit" text="로그인 하기" to="/home" disabled={isDisabled} />
      </Card>
    </S.Container>
  );
};

export default LoginPage;
