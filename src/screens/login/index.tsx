import { useEffect, useState, useRef } from 'react';
import {
  StatusBar,
  View,
  ActivityIndicator,
  Text,
  Linking,
  TouchableOpacity,
  AppState,
} from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { CommonActions } from '@react-navigation/native';

import { AppScreenLayout } from 'common/app-layout';
import { CustomButton } from 'common/button';
import { UserStore } from 'storage';
import { RootStackParamList } from 'navigation';
import { prepare, login } from 'api/auth';

import { styles } from './styles';
import { api } from 'api/index';

type NavigationProp = NativeStackNavigationProp<RootStackParamList, 'Login'>;

export const LoginScreen: React.FC = () => {
  const navigation = useNavigation<NavigationProp>();
  const [loading, setLoading] = useState(true);
  const [loginToken, setLoginToken] = useState<string>('');
  const [botName, setBotName] = useState<string>('');
  const [telegramUrl, setTelegramUrl] = useState<string>('');
  const [error, setError] = useState<string>('');
  const pollingIntervalRef = useRef<ReturnType<typeof setInterval> | null>(
    null,
  );
  const appState = useRef(AppState.currentState);
  const isPollingActive = useRef(false);

  // Step 1: Prepare auth and get login token
  useEffect(() => {
    const prepare = async () => {
      try {
        setLoading(true);
        setError('');

        const data = await api.auth.prepare();

        setLoginToken(data.loginToken);
        setBotName(data.botName);

        // Construct Telegram URL
        const url = `https://t.me/${data.botName}?start=${data.loginToken}`;
        setTelegramUrl(url);

        setLoading(false);
      } catch (err) {
        console.error('Prepare auth error:', err);
        setError('Не удалось подготовить авторизацию. Попробуйте еще раз.');
        setLoading(false);
      }
    };

    prepare();
  }, []);

  // Step 2: Start polling for auth confirmation
  const startPolling = () => {
    // Prevent duplicate polling
    if (isPollingActive.current) {
      stopPolling();
    }

    console.log('Starting polling for loginToken:', loginToken);

    setLoading(true);
    isPollingActive.current = true;

    // Poll every 5 seconds
    pollingIntervalRef.current = setInterval(async () => {
      try {
        const authData = await api.auth.login(
          loginToken?.replace('login_', ''),
        );

        // Success! Stop polling
        stopPolling();

        // Save token and user data
        await UserStore.save({
          token: authData.accessToken,
          user: {
            id: authData.id,
            accessToken: authData.accessToken,
            refreshToken: authData.refreshToken,
            expiredAt: authData.expiredAt,
          },
        });

        // Navigate to Home
        navigation.dispatch(
          CommonActions.reset({
            index: 0,
            routes: [{ name: 'Home' }],
          }),
        );
      } catch (err) {
        // User hasn't confirmed yet, continue polling
        // No error shown - this is expected
      }
    }, 5000);
  };

  const stopPolling = () => {
    if (pollingIntervalRef.current) {
      clearInterval(pollingIntervalRef.current);
      pollingIntervalRef.current = null;
    }
    isPollingActive.current = false;
  };

  // Open Telegram and start polling
  const handleOpenTelegram = async () => {
    try {
      await Linking.openURL(telegramUrl);
      startPolling();
    } catch (err) {
      console.error('Error opening Telegram:', err);
      setError('Ошибка при открытии Telegram');
    }
  };

  // Cleanup on unmount
  useEffect(() => {
    return () => {
      if (pollingIntervalRef.current) {
        clearInterval(pollingIntervalRef.current);
      }
    };
  }, []);

  // Handle app state changes (background/foreground)
  useEffect(() => {
    const subscription = AppState.addEventListener('change', nextAppState => {
      if (
        appState.current.match(/inactive|background/) &&
        nextAppState === 'active'
      ) {
        // App came to foreground
        // Resume polling if it was active before
        if (isPollingActive.current && !pollingIntervalRef.current) {
          startPolling();
        }
      } else if (nextAppState.match(/inactive|background/)) {
        // App went to background
        // Stop polling to save battery
        if (pollingIntervalRef.current) {
          clearInterval(pollingIntervalRef.current);
          pollingIntervalRef.current = null;
        }
      }

      appState.current = nextAppState;
    });

    return () => {
      subscription.remove();
    };
  }, [loginToken]);

  console.log('Loading', loading);

  if (loading && !telegramUrl) {
    return (
      <AppScreenLayout safeAreaEdges={['top']}>
        <StatusBar animated barStyle="light-content" />
        <View style={styles.container}>
          <ActivityIndicator size="large" color="#fff" />
          <Text style={styles.loadingText}>Подготовка авторизации...</Text>
        </View>
      </AppScreenLayout>
    );
  }

  if (loading) {
    return (
      <AppScreenLayout safeAreaEdges={['top']}>
        <View style={styles.container}>
          <ActivityIndicator size="large" color="#fff" />
          <Text style={styles.loadingText}>
            Ожидание подтверждения в Telegram...
          </Text>
          <Text style={styles.instructionText}>
            Откройте бота и подтвердите вход
          </Text>
        </View>
      </AppScreenLayout>
    );
  }

  return (
    <AppScreenLayout safeAreaEdges={['top']}>
      <StatusBar animated barStyle="light-content" />

      <View style={styles.container}>
        {error ? (
          <View style={styles.errorContainer}>
            <Text style={styles.errorText}>{error}</Text>
            <CustomButton
              title="Попробовать снова"
              onPress={() => {
                setError('');
                navigation.replace('Login');
              }}
            />
          </View>
        ) : (
          <>
            <View style={styles.content}>
              <Text style={styles.title}>Авторизация через Telegram</Text>
              <Text style={styles.instruction}>
                Нажмите кнопку ниже, чтобы открыть бот {botName} и подтвердить
                вход
              </Text>

              <View style={styles.buttonContainer}>
                <CustomButton
                  title="Открыть Telegram"
                  onPress={handleOpenTelegram}
                />
              </View>

              <TouchableOpacity
                onPress={() => navigation.goBack()}
                style={styles.backButton}
              >
                <Text style={styles.backButtonText}>Назад</Text>
              </TouchableOpacity>
            </View>
          </>
        )}
      </View>
    </AppScreenLayout>
  );
};
