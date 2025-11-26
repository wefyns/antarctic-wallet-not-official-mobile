import { useMutation, useQuery } from '@tanstack/react-query';
import { scanIDService, submitActionService } from 'services/scan-service';

import type { ScanInput } from 'components/forms/scan-form/config';
import type { QRCodeScannerType } from 'screens/scanner-qr';

type Variables = {
  action: QRCodeScannerType;
  payload: Partial<ScanInput>;
  photos?: string[];
};

export function useSubmitScan() {
  return useMutation({
    mutationFn: (vars: Variables) =>
      submitActionService({
        action: vars.action,
        payload: vars.payload,
        photos: vars?.photos,
      }),
  });
}

export function useScanID(id: string) {
  return useQuery({
    queryKey: ['scanID', id],
    queryFn: () => scanIDService(id),
    enabled: !!id,
    staleTime: 0,
  });
}
