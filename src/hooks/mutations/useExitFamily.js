import { useMutation, useQueryClient } from '@tanstack/react-query';
import { exitFamily } from '../../apis/family';

const useExitFamily = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: exitFamily,
    onMutate: async () => {
      await queryClient.cancelQueries({ queryKey: ['getFamily'] });
      const previousFamily = queryClient.getQueryData(['getFamily']);
      queryClient.setQueryData(['getFamily'], (oldData) => ({
        ...oldData,
        familyCode: null,
        familyHead: null,
        familyMembers: [],
      }));

      return { previousFamily };
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

    onSettled: () => {
      queryClient.invalidateQueries({ queryKey: ['getFamily'] });
    },
  });
};

export default useExitFamily;
