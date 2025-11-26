import { useMutation } from '@tanstack/react-query';
import { createSBPPayment, CreateSBPPaymentRequest } from 'api/scan';

export const useCreateSBPPayment = () => {
  return useMutation({
    mutationFn: (payload: CreateSBPPaymentRequest) => createSBPPayment(payload),
  });
};
