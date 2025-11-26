import { apiClient } from 'api/client';

// API Response wrapper types
export type ApiResponse<T> = {
  data: T;
  errors: Record<string, any>;
  message: string | null;
  status: string;
  meta: Record<string, any>;
};

// Prepare endpoint types
export type PrepareAuthData = {
  loginToken: string;
  botName: string;
  expiredAt: number;
};

export type PrepareAuthResponse = ApiResponse<PrepareAuthData>;

// Login endpoint types
export type LoginAuthData = {
  accessToken: string;
  expiredAt: number;
  refreshToken: string;
  id: number;
};

export type LoginAuthResponse = ApiResponse<LoginAuthData>;

export type LoginTokenPayload = {
  loginToken: string;
};

// User types (simplified for new API)
export type User = {
  id: number;
  accessToken: string;
  refreshToken: string;
  expiredAt: number;
};

// User Me endpoint types
export type UserMeData = {
  login: string;
  userImg: string;
  firstName: string | null;
  middleName: string | null;
  lastName: string | null;
  needKyc: boolean;
  isBlocked: boolean;
  isTrusted: boolean | null;
  referralKey: string;
  hasReferrer: boolean;
  amlStatus: string;
  email: {
    address: string | null;
    verified: boolean;
    previousAddresses: string[];
  };
  phone: string | null;
  identityDocument: any | null;
  selfie: any | null;
  kyc: {
    level: number;
    phoneVerified: boolean;
    identityDocumentVerified: boolean;
    selfieVerified: boolean;
    addressVerified: boolean;
    nextLevel: number | null;
  };
  lastAmlCheck: {
    operation: string;
    status: string;
  };
  settings: {
    languageCode: string;
    hideBalance: boolean;
    mainCurrency: string;
  };
  featureToggles: {
    demoEnabled: boolean;
    rubTopupEnabled: boolean;
  };
  rubTopup: {
    allowed: boolean;
    externalClientStatus: string;
  };
  deletionState: string;
  deleteAt: string | null;
};

export type UserMeResponse = ApiResponse<UserMeData>;

// Telegram auth methods
export async function prepare(): Promise<PrepareAuthData> {
  try {
    const resp = await apiClient.post<PrepareAuthResponse>('/auth/prepare');
    
    if (resp.data.status !== 'ok' || !resp.data.data) {
      throw new Error('Failed to prepare auth');
    }
    
    return resp.data.data;
  } catch (err) {
    console.error('authPrepare error:', err);
    throw new Error('Ошибка при подготовке авторизации');
  }
}

export async function login(loginToken: string): Promise<LoginAuthData> {
  try {
    const resp = await apiClient.post<LoginAuthResponse>('/auth/login', {
      loginToken,
    });
    
    if (resp.data.status !== 'ok' || !resp.data.data) {
      throw new Error('Login not confirmed yet');
    }
    
    return resp.data.data;
  } catch (err) {
    // Это нормально - пользователь еще не подтвердил в боте
    throw err;
  }
}

export async function getUserMe(): Promise<UserMeData> {
  try {
    const resp = await apiClient.get<UserMeResponse>('/user/me');
    
    if (resp.data.status !== 'ok' || !resp.data.data) {
      throw new Error('Failed to get user data');
    }
    
    return resp.data.data;
  } catch (err) {
    console.error('getUserMe error:', err);
    throw new Error('Ошибка при получении данных пользователя');
  }
}
