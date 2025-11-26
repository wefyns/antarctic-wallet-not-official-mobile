import { useQuery } from '@tanstack/react-query';
import { api } from 'api';
import type { UserMeData } from 'api/auth';

export function useUserMe() {
  return useQuery<UserMeData>({
    queryKey: ['user', 'me'],
    queryFn: () => api.auth.getUserMe(),
    staleTime: 5 * 60 * 1000, // 5 minutes
    retry: 2,
  });
}
