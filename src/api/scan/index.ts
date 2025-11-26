import { apiClient } from 'api/client';

export type ScanResponse = any;

export type ScanIDResponse = {
  sender: string;
  receiver: string;
  seal_identifier: string;
  location: string;
  id: number;
  executor_id: number;
  fixed_at?: string | null;
  operation_type?: string;
  comment?: string | null;
  installed_by_id?: number | null;
  installed_at?: string | null;
  installed_by_fullname?: string | null;
  installed_by_username?: string | null;
};

// SBP Payment types
export type PrepareSBPPaymentRequest = {
  coin: string;
  qr_url: string;
};

export type PrepareSBPPaymentData = {
  fiatAmount: string;
  value: string;
  updatedAt: number;
  validTime: number;
  rate: string;
  idempotency: string;
};

export type PrepareSBPPaymentResponse = {
  data: PrepareSBPPaymentData;
  errors: Record<string, any>;
  message: string | null;
  status: string;
  meta: Record<string, any>;
};

export async function prepareSBPPayment(
  payload: PrepareSBPPaymentRequest,
): Promise<PrepareSBPPaymentData> {
  const resp = await apiClient.post<PrepareSBPPaymentResponse>(
    '/pay/sbp/prepare',
    payload,
  );
  return resp.data.data;
}

// Create SBP Payment types
export type CreateSBPPaymentRequest = {
  idempotency: string;
  qr_url: string;
  coin: string;
};

export type CreateSBPPaymentData = {
  txId: string;
  fiatAmount: string;
  value: string;
  state: string;
  createdAt: number;
  shopName: string | null;
  mcc: string | null;
};

export type CreateSBPPaymentResponse = {
  data: CreateSBPPaymentData;
  errors: Record<string, any>;
  message: string | null;
  status: string;
  meta: Record<string, any>;
};

export async function createSBPPayment(
  payload: CreateSBPPaymentRequest,
): Promise<CreateSBPPaymentData> {
  const resp = await apiClient.post<CreateSBPPaymentResponse>(
    '/pay/sbp/create',
    payload,
  );
  return resp.data.data;
}

// Transaction Status types
export type TransactionData = {
  type: string;
  createdAt: number;
  txHash: string;
  status: string;
  shopName: string;
  mcc: string;
  value: string;
  coin: string;
  fiatValue: string;
};

export type TransactionResponse = {
  data: TransactionData;
  errors: Record<string, any>;
  message: string | null;
  status: string;
  meta: Record<string, any>;
};

export async function getTransactionStatus(
  txId: string,
): Promise<TransactionData> {
  const resp = await apiClient.get<TransactionResponse>(
    `/transactions/${txId}`,
  );
  return resp.data.data;
}
