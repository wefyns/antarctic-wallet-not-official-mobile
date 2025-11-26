import { apiClient } from 'api/client';
import type { ApiResponse } from '../auth';

// Coins types
export type CoinNetwork = {
  network: string;
  isAvailable: boolean;
};

export type Coin = {
  name: string;
  code: string;
  isAvailable: boolean;
  networks: CoinNetwork[];
};

export type CoinsResponse = ApiResponse<Coin[]>;

// Rates types
export type CoinRate = {
  coin: string;
  buyRate: string;
  sellRate: number;
  ttl: string;
};

export type RatesData = {
  items: CoinRate[];
};

export type RatesResponse = ApiResponse<RatesData>;

// User addresses types
export type UserAddress = {
  address: string;
  network: string;
  coin: string;
  commissionValue: string;
};

export type UserAddressesResponse = ApiResponse<UserAddress[]>;

// Accounts types
export type AccountItem = {
  coin: string;
  balance: string;
  balanceFiat: string;
  network: string;
};

export type AccountsData = {
  totalFiat: string;
  currency: string;
  items: AccountItem[];
};

export type AccountsResponse = ApiResponse<AccountsData>;

// API methods
export async function getCoins(): Promise<Coin[]> {
  try {
    const resp = await apiClient.get<CoinsResponse>('/coins/all');
    
    if (resp.data.status !== 'ok' || !resp.data.data) {
      throw new Error('Failed to get coins');
    }
    
    return resp.data.data;
  } catch (err) {
    console.error('getCoins error:', err);
    throw new Error('Ошибка при получении списка монет');
  }
}

export async function getRates(): Promise<CoinRate[]> {
  try {
    const resp = await apiClient.get<RatesResponse>('/coins/rates');
    
    if (resp.data.status !== 'ok' || !resp.data.data) {
      throw new Error('Failed to get rates');
    }
    
    return resp.data.data.items;
  } catch (err) {
    console.error('getRates error:', err);
    throw new Error('Ошибка при получении курсов');
  }
}

export async function getUserAddresses(): Promise<UserAddress[]> {
  try {
    const resp = await apiClient.get<UserAddressesResponse>('/user/addresses');
    
    if (resp.data.status !== 'ok' || !resp.data.data) {
      throw new Error('Failed to get user addresses');
    }
    
    return resp.data.data;
  } catch (err) {
    console.error('getUserAddresses error:', err);
    throw new Error('Ошибка при получении адресов');
  }
}

export async function getAccounts(): Promise<AccountsData> {
  try {
    const resp = await apiClient.get<AccountsResponse>('/accounts/all');
    
    if (resp.data.status !== 'ok' || !resp.data.data) {
      throw new Error('Failed to get accounts');
    }
    
    return resp.data.data;
  } catch (err) {
    console.error('getAccounts error:', err);
    throw new Error('Ошибка при получении балансов');
  }
}
