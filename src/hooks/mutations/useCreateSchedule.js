import { useMutation } from '@tanstack/react-query';
import { createSchedule } from '../../apis/calendar';

const useCreateSchedule = () => {
  return useMutation({
    mutationFn: createSchedule,
    onSuccess: (data) => {
      alert('진료 일정이 등록되었습니다!');
    },
    onError: (error) => {
      const code = error.response?.data?.code;
      const message = error.response?.data?.message || '등록 중 오류가 발생했습니다.';
      alert(message);
    },
  });
};

export default useCreateSchedule;
