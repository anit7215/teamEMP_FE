import { useForm } from 'react-hook-form';
import * as S from './Style';
import Card from '../../components/common/Card/Card';
import Button from '../../components/common/Button/Button';
import { postSignup } from '../../apis/auth';

const SignupPage = () => {
  const {
    register,
    handleSubmit,
    watch,
    formState: { errors, isValid },
  } = useForm({
    mode: 'onChange',
  });

  const onSubmit = async (data) => {
    const { email, password } = data;
    try {
      const response = await postSignup({ email, password });
      console.log(response);
      alert('회원가입 성공!');
      // window.location.href = '/login';
      window.location.href = '/profilesetting';
    } catch (error) {
      console.error('회원가입 실패:', error);
      if (error.response && error.response.data.code === 'AUTH-004') {
        alert('중복된 이메일입니다. 다른 이메일을 사용해주세요.');
      } else if (error.response && error.response.data.code === 'GEN-003') {
        alert('입력 값이 유효하지 않습니다. 다시 확인해주세요.');
      } else {
        alert('알 수 없는 오류가 발생했습니다. 다시 시도해주세요.');
      }
    }
  };

  const password = watch('password');
  const values = watch();
  const isDisabled =
    Object.values(errors || {}).some((error) => error?.message?.length > 0) ||
    Object.values(values).some((value) => value === '');

  return (
    <S.Container onSubmit={handleSubmit(onSubmit)} as="form">
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
          pattern: {
            value: /^(?=.*\d)(?=.*[^a-zA-Z0-9]).{8,}$/,
            message: '비밀번호는 8자 이상, 숫자와 특수문자를 포함해야 합니다.',
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

        <Button type="submit" text="프로필 입력하러 가기" disabled={isDisabled} />
      </Card>
    </S.Container>
  );
};

export default SignupPage;
