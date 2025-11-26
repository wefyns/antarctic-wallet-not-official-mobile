import { useQuery } from '@tanstack/react-query';
import { getTransactionStatus } from 'api/scan';

export const useTransactionStatus = (txId: string | null, enabled: boolean = true) => {
  return useQuery({
    queryKey: ['transaction', txId],
    queryFn: () => getTransactionStatus(txId!),
    enabled: enabled && !!txId,
    refetchInterval: (query) => {
      const status = query.state.data?.status;
      // Stop polling if transaction is completed or failed
      if (status === 'completed' || status === 'failed' || status === 'cancelled') {
        return false;
      }
      // Poll every 3 seconds while pending
      return 3000;
    },
    staleTime: 0,
  });
};
