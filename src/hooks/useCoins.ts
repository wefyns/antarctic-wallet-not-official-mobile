import { useQuery } from '@tanstack/react-query';
import { api } from 'api';
import type { Coin, CoinRate, UserAddress, AccountsData } from 'api/coins';

export function useCoins() {
  return useQuery<Coin[]>({
    queryKey: ['coins', 'all'],
    queryFn: () => api.coins.getCoins(),
    staleTime: 10 * 60 * 1000, // 10 minutes
  });
}

export function useRates() {
  return useQuery<CoinRate[]>({
    queryKey: ['coins', 'rates'],
    queryFn: () => api.coins.getRates(),
    staleTime: 30 * 1000, // 30 seconds (rates change frequently)
    refetchInterval: 30 * 1000, // Auto-refetch every 30 seconds
  });
}

export function useUserAddresses() {
  return useQuery<UserAddress[]>({
    queryKey: ['user', 'addresses'],
    queryFn: () => api.coins.getUserAddresses(),
    staleTime: 5 * 60 * 1000, // 5 minutes
  });
}

export function useAccounts() {
  return useQuery<AccountsData>({
    queryKey: ['accounts', 'all'],
    queryFn: () => api.coins.getAccounts(),
    staleTime: 30 * 1000, // 30 seconds
    refetchInterval: 30 * 1000, // Auto-refetch every 30 seconds
  });
}
