import { useMutation, useQueryClient } from '@tanstack/react-query';
import { deleteFamily } from '../../apis/family';

const useDeleteFamily = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: deleteFamily,
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

    onError: (_err, _vars, context) => {
      if (context?.previousFamily) {
        queryClient.setQueryData(['getFamily'], context.previousFamily);
      }
    },

    onSettled: () => {
      queryClient.invalidateQueries({ queryKey: ['getFamily'] });
    },
  });
};

export default useDeleteFamily;
