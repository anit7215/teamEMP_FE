import { useQuery } from '@tanstack/react-query';
import { getMyHealthTag } from '../../apis/user';

const useGetMyHealthTag = () => {
  return useQuery({
    queryKey: ['healthTag'],
    queryFn: getMyHealthTag,
    retry: false, 
    select: (data) => data.data, 
  });
};

export default useGetMyHealthTag;
