import { useMutation,useQueryClient } from '@tanstack/react-query';
import { addHealthTag } from '../../apis/user';

const useAddHealthTag = (options = {}) => {
  const queryClient = useQueryClient();

  return useMutation(addHealthTag, {
    onSuccess: (data, variables, context) => {
      if (data.code === 'GEN-000') {
        alert('건강 태그가 생성되었습니다!');
        queryClient.invalidateQueries(['getHealthTag']);
      }
      if (options.onSuccess) options.onSuccess(data, variables, context);
    },
    onError: (error) => {
      const code = error.response?.data?.code;
      if (code === "TAG-001") {
        alert("건강 키워드는 최대 4자까지 가능합니다!");
      }
    },
  });
};
export default useAddHealthTag;