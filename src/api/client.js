import axios from 'axios';
import { Alert } from 'react-native';
import { UserStore } from 'storage';

export const BASE_URL = 'https://app.antarcticwallet.com/api/v2';

export const apiClient = axios.create({
  baseURL: BASE_URL,
  headers: {
    'Content-Type': 'application/json',
  },
});

// Event to emit when unauthorized
export const authEvents = {
  onUnauthorized: () => {},
};

apiClient.interceptors.request.use(
  async config => {
    try {
      config.headers = config.headers ?? {};

      const hasAuthInConfig = !!(
        config.headers.Authorization || config.headers.authorization
      );

      if (!hasAuthInConfig) {
        const stored = await UserStore.get();
        const token = stored?.token;
        if (token) {
          config.headers.Authorization = `Bearer ${token}`;
        }
      }
    } catch (e) {
      console.warn('apiClient: token read error', e);
    }
    return config;
  },
  error => Promise.reject(error),
);

apiClient.interceptors.response.use(
  response => response,
  async error => {
    // Check if error is due to unauthorized access
    if (error.response && error.response.status === 401) {
      try {
        // ingone on login endpoint
        if (error.config.url?.endsWith('/auth/login')) {
          return Promise.reject(error);
        }

        await UserStore.clear();
        Alert.alert(
          'Сессия истекла',
          'Пожалуйста, выйдите из аккаунта и войдите снова.',
          [{ text: 'OK' }],
          { cancelable: false },
        );
        authEvents.onUnauthorized();
      } catch (e) {
        console.warn('Error handling 401 response', e);
      }
    }
    return Promise.reject(error);
  },
);
