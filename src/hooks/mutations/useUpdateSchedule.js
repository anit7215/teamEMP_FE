import { useMutation } from '@tanstack/react-query';
import { updateSchedule } from '../../apis/calendar';

const useUpdateSchedule = () => {
  return useMutation({
    mutationFn: ({ treatmentId, data }) => updateSchedule(treatmentId, data),
    onSuccess: () => {
      alert('치료 일정이 수정되었습니다!');
    },
    onError: (error) => {
      const message = error.response?.data?.message || '수정 중 오류가 발생했습니다.';
      alert(message);
    },
  });
};

export default useUpdateSchedule;
