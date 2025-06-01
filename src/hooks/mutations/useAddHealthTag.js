import { useMutation,useQueryClient } from '@tanstack/react-query';
import { addHealthTag } from '../../apis/user';

const useAddHealthTag = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: addHealthTag,
    onSuccess: (data) => {
      if (data.code === 'GEN-000') {
        alert('건강 태그가 생성되었습니다!');
        queryClient.invalidateQueries({ queryKey: ['getHealthTag'] });

      }
    },
    onError: (error) => {
      const code = error.response?.data?.code;
    },
  });
};
export default useAddHealthTag;