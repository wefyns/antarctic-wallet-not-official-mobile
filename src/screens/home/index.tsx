import React, { useState, useCallback } from 'react';
import { StatusBar, View, Text, Image, ActivityIndicator, ScrollView, FlatList, RefreshControl } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { BottomTabNavigationProp } from '@react-navigation/bottom-tabs';
import { CompositeNavigationProp } from '@react-navigation/native';

import { AppScreenLayout } from 'common/app-layout';
import { CustomButton } from 'common/button';
import { useUserMe, useCoins, useRates, useAccounts } from 'hooks';
import { RootStackParamList } from 'navigation';
import { TabParamList } from 'navigation/TabNavigator';

import { styles } from './styles';

type NavigationProp = CompositeNavigationProp<
  BottomTabNavigationProp<TabParamList, 'HomeTab'>,
  NativeStackNavigationProp<RootStackParamList>
>;

export const HomeScreen: React.FC = () => {
  const navigation = useNavigation<NavigationProp>();
  const { data: userData, isLoading: userLoading, refetch: refetchUser } = useUserMe();
  const { data: coins, isLoading: coinsLoading, refetch: refetchCoins } = useCoins();
  const { data: rates, isLoading: ratesLoading, refetch: refetchRates } = useRates();
  const { data: accounts, isLoading: accountsLoading, refetch: refetchAccounts } = useAccounts();

  const [refreshing, setRefreshing] = useState(false);

  const onRefresh = useCallback(async () => {
    setRefreshing(true);
    await Promise.all([refetchUser(), refetchCoins(), refetchRates(), refetchAccounts()]);
    setRefreshing(false);
  }, [refetchUser, refetchCoins, refetchRates, refetchAccounts]);

  const handleTopUp = () => {
    navigation.navigate('TopUp');
  };

  const handleOpenScanner = () => {
    navigation.navigate('QRScanner');
  };

  const isLoading = userLoading || coinsLoading || ratesLoading || accountsLoading;

  if (isLoading) {
    return (
      <AppScreenLayout safeAreaEdges={['top']}>
        <StatusBar animated barStyle="light-content" />
        <View style={styles.loadingContainer}>
          <ActivityIndicator size="large" color="#fff" />
        </View>
      </AppScreenLayout>
    );
  }

  if (!userData) {
    return (
      <AppScreenLayout safeAreaEdges={['top']}>
        <StatusBar animated barStyle="light-content" />
        <View style={styles.errorContainer}>
          <Text style={styles.errorText}>Ошибка загрузки данных</Text>
        </View>
      </AppScreenLayout>
    );
  }

  const displayName = userData.firstName || userData.login;

  // Get total balance from accounts
  const totalBalance = accounts?.totalFiat || '0';
  const balanceCurrency = accounts?.currency || userData.settings.mainCurrency;

  // Combine coins with their rates and balances
  const coinsWithRates =
    coins?.map(coin => {
      const rate = rates?.find(r => r.coin === coin.code);
      // Find balance for this coin (sum all networks)
      const coinAccounts = accounts?.items.filter(acc => acc.coin === coin.code) || [];
      const totalCoinBalance = coinAccounts.reduce((sum, acc) => sum + parseFloat(acc.balance), 0);
      const totalCoinBalanceFiat = coinAccounts.reduce((sum, acc) => sum + parseFloat(acc.balanceFiat), 0);

      return {
        ...coin,
        buyRate: rate?.buyRate,
        sellRate: rate?.sellRate,
        balance: totalCoinBalance,
        balanceFiat: totalCoinBalanceFiat,
        accounts: coinAccounts,
      };
    }) || [];

  return (
    <AppScreenLayout safeAreaEdges={['top']}>
      <StatusBar animated barStyle="light-content" />

      <ScrollView
        style={styles.scrollContainer}
        showsVerticalScrollIndicator={false}
        refreshControl={<RefreshControl refreshing={refreshing} onRefresh={onRefresh} tintColor="#fff" colors={['#0A84FF']} />}
      >
        <View style={styles.container}>
          {/* User Header */}
          <View style={styles.header}>
            <View style={styles.userInfo}>
              {userData.userImg && <Image source={{ uri: userData.userImg }} style={styles.avatar} />}
              <View>
                <Text style={styles.greeting}>Привет, {displayName}!</Text>
                {userData.login && <Text style={styles.username}>@{userData.login}</Text>}
              </View>
            </View>
          </View>

          {/* Total Balance Card */}
          <View style={styles.balanceCard}>
            <Text style={styles.balanceLabel}>Общий баланс</Text>
            <Text style={styles.balanceAmount}>{userData.settings.hideBalance ? '••••••' : `${totalBalance} ${balanceCurrency}`}</Text>

            <View style={styles.buttonContainer}>
              <CustomButton title="Пополнить" onPress={handleTopUp} />
            </View>
          </View>

          {/* QR Scanner Card */}
          <View style={styles.scannerCard}>
            <View style={styles.scannerContent}>
              <Text style={styles.scannerTitle}>Оплата по QR коду</Text>
              <Text style={styles.scannerDescription}>Отсканируйте QR код СБП для оплаты</Text>
            </View>
            <CustomButton title="Открыть QR сканнер" onPress={handleOpenScanner} size="lg" />
          </View>

          {/* Coins List */}
          <View style={styles.coinsSection}>
            <Text style={styles.sectionTitle}>Мои активы</Text>

            {coinsWithRates.length === 0 ? (
              <View style={styles.emptyState}>
                <Text style={styles.emptyText}>Нет доступных монет</Text>
              </View>
            ) : (
              coinsWithRates.map((coin, index) => (
                <View key={coin.code} style={styles.coinCard}>
                  <View style={styles.coinHeader}>
                    <View style={styles.coinInfo}>
                      <Text style={styles.coinName}>{coin.name}</Text>
                      <Text style={styles.coinCode}>{coin.code}</Text>
                    </View>

                    <View style={styles.coinBalance}>
                      <Text style={styles.coinBalanceAmount}>{userData.settings.hideBalance ? '••••' : coin.balance.toFixed(4)}</Text>
                      <Text style={styles.coinBalanceLabel}>{coin.code}</Text>
                      {coin.balanceFiat > 0 && !userData.settings.hideBalance && (
                        <Text style={styles.coinBalanceFiat}>
                          ≈ {coin.balanceFiat.toFixed(2)} {balanceCurrency}
                        </Text>
                      )}
                    </View>
                  </View>

                  {coin.buyRate && coin.sellRate && (
                    <View style={styles.coinRates}>
                      <View style={styles.rateItem}>
                        <Text style={styles.rateLabel}>Покупка</Text>
                        <Text style={styles.rateValue}>
                          {coin.buyRate} {balanceCurrency}
                        </Text>
                      </View>
                      <View style={styles.rateDivider} />
                      <View style={styles.rateItem}>
                        <Text style={styles.rateLabel}>Продажа</Text>
                        <Text style={styles.rateValue}>
                          {coin.sellRate} {balanceCurrency}
                        </Text>
                      </View>
                    </View>
                  )}

                  {coin.networks.length > 0 && (
                    <View style={styles.networksContainer}>
                      <Text style={styles.networksLabel}>Сети:</Text>
                      <View style={styles.networksList}>
                        {coin.networks.map(network => (
                          <View key={network.network} style={[styles.networkBadge, !network.isAvailable && styles.networkBadgeDisabled]}>
                            <Text style={[styles.networkBadgeText, !network.isAvailable && styles.networkBadgeTextDisabled]}>
                              {network.network}
                            </Text>
                          </View>
                        ))}
                      </View>
                    </View>
                  )}
                </View>
              ))
            )}
          </View>
        </View>
      </ScrollView>
    </AppScreenLayout>
  );
};
