import { useMutation, useQueryClient } from '@tanstack/react-query';
import { deleteHealthTag } from '../../apis/user';

const useDeleteHealthTag = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: deleteHealthTag,
    onMutate: async () => {
      await queryClient.cancelQueries({ queryKey: ['getHealthTag'] });
      const previousHealthTag = queryClient.getQueryData(['getHealthTag']);
      

      return { previousHealthTag };
    },

    onError: (_err, _vars, context) => {
      if (context?.previousHealthTag) {
        queryClient.setQueryData(['getHealthTag'], context.previousHealthTag);
      }
    },

    onSettled: () => {
      queryClient.invalidateQueries({ queryKey: ['getHealthTag'] });
    },
  });
};

export default useDeleteHealthTag;
