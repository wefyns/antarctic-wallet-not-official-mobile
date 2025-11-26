import Toast, { BaseToast, ErrorToast, BaseToastProps } from 'react-native-toast-message';
import { colors } from 'constants/colors';

export const toastConfig = {
  success: (props) => (
    <BaseToast
      {...props}
      style={{ borderLeftColor: colors.success }}
      contentContainerStyle={{ paddingHorizontal: 15, zIndex: 100000 }}
      text1Style={{
        fontSize: 15,
        fontWeight: '500'
      }}
    />
  ),
  error: (props) => (
    <ErrorToast
      {...props}
      style={{ borderLeftColor: colors.error }}
      contentContainerStyle={{ paddingHorizontal: 15, zIndex: 100000 }}
      text1Style={{
        fontSize: 15,
        fontWeight: '500'
      }}
    />
  ),
};

export const showToast = {
  success: (message) => {
    Toast.show({
      type: 'success',
      text1: message,
      position: 'top',
      visibilityTime: 3000,
    });
  },
  error: (message) => {
    Toast.show({
      type: 'error',
      text1: message,
      position: 'top',
      visibilityTime: 3000,
    });
  },
};