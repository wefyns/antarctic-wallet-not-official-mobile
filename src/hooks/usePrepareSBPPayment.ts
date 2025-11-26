import { useQuery } from '@tanstack/react-query';
import { prepareSBPPayment, PrepareSBPPaymentRequest } from 'api/scan';

export const usePrepareSBPPayment = (
  payload: PrepareSBPPaymentRequest,
  enabled: boolean = true
) => {
  return useQuery({
    queryKey: ['sbp-payment', payload.qr_url],
    queryFn: () => prepareSBPPayment(payload),
    enabled,
    refetchInterval: 10000, // Refetch every 10 seconds
    staleTime: 0, // Always consider data stale
  });
};
