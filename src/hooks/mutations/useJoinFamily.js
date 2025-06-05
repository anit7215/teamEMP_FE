import { useMutation,useQueryClient } from '@tanstack/react-query';
import { joinFamily } from '../../apis/family';

const useJoinFamily = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: joinFamily,
    onSuccess: (data) => {
      if (data.code === 'GEN-000') {
        alert('가족에 가입되었습니다!');
        queryClient.invalidateQueries({ queryKey: ['getFamily'] });
      }
    },
    onError: (error) => {
      const code = error.response?.data?.code;

      switch (code) {
        case 'FAM-001':
          alert('이미 가족에 속해있는 유저입니다.');
          break;
        case 'FAM-002':
          alert('존재하지 않는 가족입니다.');
          break;
        case 'FAM-003':
          alert('잘못된 가족 코드입니다.');
          break;
        case 'FAM-004':
          alert('가족의 장이 아닙니다.');
          break;
        case 'FAM-005':
          alert('가족의 장은 탈퇴할 수 없습니다.');
          break;
        default:
          alert('알 수 없는 오류가 발생했습니다.');
      }
    },
  });
};
export default useJoinFamily;