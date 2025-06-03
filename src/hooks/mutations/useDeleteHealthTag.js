import { useMutation, useQueryClient } from '@tanstack/react-query';
import { deleteHealthTag } from '../../apis/user';

const useDeleteHealthTag = (options = {}) => {
  const queryClient = useQueryClient();

 return useMutation(deleteHealthTag, {
  onMutate: async (deletedTagId) => {
    await queryClient.cancelQueries(['getHealthTag']);
    const previousHealthTag = queryClient.getQueryData(['getHealthTag']);

    queryClient.setQueryData(['getHealthTag'], (old) => {
      if (!old) return old;
      return old.filter(tag => tag.id !== deletedTagId);
    });

    return { previousHealthTag };
  },
  onError: (error, variables, context) => {
    if (context?.previousHealthTag) {
      queryClient.setQueryData(['getHealthTag'], context.previousHealthTag);
    }
  },
  onSuccess: (data, variables) => {
    queryClient.setQueryData(['getHealthTag'], (old) => {
      if (!old) return old;
      return old.filter(tag => tag.id !== variables); 
    });

    if (options.onSuccess) options.onSuccess(data, variables);
  },
  onSettled: () => {
    queryClient.invalidateQueries(['getHealthTag']);
  }
});
};

export default useDeleteHealthTag;
