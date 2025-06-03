import { useMutation,useQueryClient } from '@tanstack/react-query';
import { addHealthValue } from '../../apis/user';

const useAddHealthValue = () => {
  return useMutation({
    mutationFn: addHealthValue,
    onSuccess: (data) => {
      if (data.code === 'GEN-000') {
        alert('정보가 등록되었습니다!');
      }
    },
    onError: (error) => {
      const code = error.response?.data?.code;
      alert(data.message);
    }
})
};
export default useAddHealthValue;