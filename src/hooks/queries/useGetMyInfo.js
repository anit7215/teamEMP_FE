import { useQuery } from '@tanstack/react-query';
import { getMyInfo } from '../../apis/user';

const useGetMyInfo = () => {
  return useQuery({
    queryKey: ['myInfo'],
    queryFn: getMyInfo,
    retry: false, 
    select: (data) => data.data, 
  });
};

export default useGetMyInfo;
