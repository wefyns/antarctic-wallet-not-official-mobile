import { StatusBar, View, Text, ScrollView, ActivityIndicator, TouchableOpacity, Alert, Clipboard } from 'react-native';
import { useNavigation } from '@react-navigation/native';

import { AppScreenLayout } from 'common/app-layout';
import { useUserAddresses, useCoins } from 'hooks';

import { styles } from './styles';

export const TopUpScreen: React.FC = () => {
  const navigation = useNavigation();
  const { data: addresses, isLoading: addressesLoading } = useUserAddresses();
  const { data: coins, isLoading: coinsLoading } = useCoins();

  const handleCopyAddress = (address: string, coin: string, network: string) => {
    Clipboard.setString(address);
    Alert.alert(
      'Скопировано',
      `Адрес ${coin} (${network}) скопирован в буфер обмена`,
      [{ text: 'OK' }]
    );
  };

  const isLoading = addressesLoading || coinsLoading;

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

  if (!addresses || addresses.length === 0) {
    return (
      <AppScreenLayout safeAreaEdges={['top']}>
        <StatusBar animated barStyle="light-content" />
        <View style={styles.container}>
          <View style={styles.header}>
            <TouchableOpacity onPress={() => navigation.goBack()} style={styles.backButton}>
              <Text style={styles.backButtonText}>← Назад</Text>
            </TouchableOpacity>
            <Text style={styles.title}>Пополнение</Text>
          </View>
          
          <View style={styles.emptyState}>
            <Text style={styles.emptyText}>Нет доступных адресов для пополнения</Text>
          </View>
        </View>
      </AppScreenLayout>
    );
  }

  // Group addresses by coin
  const groupedAddresses = addresses.reduce((acc, addr) => {
    if (!acc[addr.coin]) {
      acc[addr.coin] = [];
    }
    acc[addr.coin].push(addr);
    return acc;
  }, {} as Record<string, typeof addresses>);

  return (
    <AppScreenLayout safeAreaEdges={['top']}>
      <StatusBar animated barStyle="light-content" />
      
      <View style={styles.container}>
        <View style={styles.header}>
          <TouchableOpacity onPress={() => navigation.goBack()} style={styles.backButton}>
            <Text style={styles.backButtonText}>← Назад</Text>
          </TouchableOpacity>
          <Text style={styles.title}>Пополнение</Text>
        </View>

        <ScrollView 
          style={styles.scrollContainer}
          showsVerticalScrollIndicator={false}
        >
          <View style={styles.infoCard}>
            <Text style={styles.infoText}>
              Выберите монету и сеть, скопируйте адрес кошелька для пополнения
            </Text>
          </View>

          {Object.entries(groupedAddresses).map(([coinCode, coinAddresses]) => {
            const coinInfo = coins?.find(c => c.code === coinCode);
            
            return (
              <View key={coinCode} style={styles.coinSection}>
                <View style={styles.coinSectionHeader}>
                  <Text style={styles.coinSectionTitle}>
                    {coinInfo?.name || coinCode}
                  </Text>
                  <Text style={styles.coinSectionCode}>{coinCode}</Text>
                </View>

                {coinAddresses.map((address) => (
                  <TouchableOpacity
                    key={`${address.coin}-${address.network}`}
                    style={styles.addressCard}
                    onPress={() => handleCopyAddress(address.address, address.coin, address.network)}
                    activeOpacity={0.7}
                  >
                    <View style={styles.addressHeader}>
                      <View style={styles.networkBadge}>
                        <Text style={styles.networkBadgeText}>{address.network}</Text>
                      </View>
                      
                      {parseFloat(address.commissionValue) > 0 && (
                        <View style={styles.commissionBadge}>
                          <Text style={styles.commissionText}>
                            Комиссия: {address.commissionValue}%
                          </Text>
                        </View>
                      )}
                    </View>

                    <View style={styles.addressContent}>
                      <Text style={styles.addressLabel}>Адрес кошелька:</Text>
                      <Text style={styles.addressText} numberOfLines={1} ellipsizeMode="middle">
                        {address.address}
                      </Text>
                    </View>

                    <View style={styles.copyHint}>
                      <Text style={styles.copyHintText}>Нажмите, чтобы скопировать</Text>
                    </View>
                  </TouchableOpacity>
                ))}
              </View>
            );
          })}

          <View style={styles.warningCard}>
            <Text style={styles.warningTitle}>⚠️ Важно</Text>
            <Text style={styles.warningText}>
              • Отправляйте только {Object.keys(groupedAddresses).join(', ')} на соответствующие адреса{'\n'}
              • Убедитесь, что выбрали правильную сеть{'\n'}
              • Проверьте адрес перед отправкой{'\n'}
              • Учитывайте комиссию сети при пополнении
            </Text>
          </View>
        </ScrollView>
      </View>
    </AppScreenLayout>
  );
};
