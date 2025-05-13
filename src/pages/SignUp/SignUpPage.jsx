import { useForm } from 'react-hook-form';
import * as S from './Style';
import Card from '../../components/common/Card/Card';
import Button from '../../components/common/Button/Button';

const SignupPage = () => {
  const {
    register,
    handleSubmit,
    watch,
    formState: { errors, isValid },
  } = useForm({
    mode: 'onChange',
  });

  const onSubmit = (data) => {
    console.log('폼 데이터 제출:', data);
  };

  const password = watch('password');
    const values = watch();
    const isDisabled = Object.values(errors || {}).some((error) => error?.message?.length > 0) ||
    Object.values(values).some((value) => value === '');
  return (
    <S.Container onSubmit={handleSubmit(onSubmit)}>
      <Card>
        <S.Title>회원가입</S.Title>
        <S.Input
          type="email"
          {...register('email', {
            required: '이메일을 반드시 입력해주세요.',
            pattern: {
              value: /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
              message: '올바른 이메일 형식이 아닙니다. 다시 확인해주세요!',
            },
          })}
          placeholder="이메일을 입력하세요."
          hasError={!!errors.email}
        />
        {errors.email && <S.ErrorMessage>{errors.email.message}</S.ErrorMessage>}
        <S.Input
          type="password"
          {...register('password', {
            required: '비밀번호를 반드시 입력해주세요.',
            minLength: {
              value: 8,
              message: '비밀번호는 8 ~ 16자 사이로 입력해주세요!',
            },
            maxLength: {
              value: 16,
              message: '비밀번호는 8 ~ 16자 사이로 입력해주세요!',
            },
          })}
          placeholder="비밀번호를 입력하세요."
          hasError={!!errors.password}
        />
        {errors.password && <S.ErrorMessage>{errors.password.message}</S.ErrorMessage>}

        <S.Input
          type="password"
          {...register('passwordCheck', {
            required: '비밀번호 검증 또한 필수 입력요소입니다.',
            validate: (value) =>
              value === password || '비밀번호가 일치하지 않습니다.',
          })}
          placeholder="비밀번호를 다시 입력해주세요!"
          hasError={!!errors.passwordCheck}
        />
        {errors.passwordCheck && <S.ErrorMessage>{errors.passwordCheck.message}</S.ErrorMessage>}
      <Button type="submit" text="프로필 입력하러 가기" to="/profilesetting" disabled={isDisabled}/>
      </Card>
    </S.Container>
  );
};

export default SignupPage;

