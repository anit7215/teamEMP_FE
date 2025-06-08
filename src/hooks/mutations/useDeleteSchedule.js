import { useMutation } from '@tanstack/react-query';
import { deleteSchedule } from '../../apis/calendar';

const useDeleteSchedule = () => {
  return useMutation({
    mutationFn: (treatmentId) => deleteSchedule(treatmentId),
    onSuccess: () => {
      alert('치료 일정이 삭제되었습니다!');
    },
    onError: (error) => {
      const message = error.response?.data?.message || '삭제 중 오류가 발생했습니다.';
      alert(message);
    },
  });
};

export default useDeleteSchedule;
