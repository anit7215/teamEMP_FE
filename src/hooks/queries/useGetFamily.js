import { useQuery } from '@tanstack/react-query';
import { getFamily } from '../../apis/family';

const useGetFamily = () => {
  return useQuery({
    queryKey: ['family'],
    queryFn: getFamily,
    retry: false, 
  });
};

export default useGetFamily;
