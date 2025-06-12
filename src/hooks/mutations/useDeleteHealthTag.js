import { useMutation, useQueryClient } from '@tanstack/react-query';
import { deleteHealthTag } from '../../apis/user';

const useDeleteHealthTag = (options = {}) => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: deleteHealthTag,
    
    onMutate: async (deletedTagId) => {
      await queryClient.cancelQueries({ queryKey: ['healthTag'] });
      
      const previousData = queryClient.getQueryData(['healthTag']);
      
      queryClient.setQueryData(['healthTag'], (old) => {
        if (!old?.data || !Array.isArray(old.data)) return old;
        
        return {
          ...old,
          data: old.data.filter(tag => tag.id !== deletedTagId),
        };
      });

      return { previousData };
    },

    onError: (error, variables, context) => {
      console.error('Delete error:', error);
      if (context?.previousData) {
        queryClient.setQueryData(['healthTag'], context.previousData);
      }
    },

    onSuccess: (data, variables) => {
      console.log('Delete success:', data);
      if (options.onSuccess) {
        options.onSuccess(data, variables);
      }
    },

    onSettled: () => {
      queryClient.invalidateQueries({ queryKey: ['healthTag'] });
    },
  });
};

export default useDeleteHealthTag;