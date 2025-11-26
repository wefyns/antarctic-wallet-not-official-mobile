import { Alert, Linking, Platform } from 'react-native';

const PermissionLabels: Record<string, string> = {
  camera: 'Камера',
  location: 'Местоположение',
};

export const showPermissionAlert = (
  permissionType: 'camera' | 'location',
  onCancel?: () => void
) => {
  const title = `Разрешение для "${PermissionLabels[permissionType]}" Отключено`;
  const message = `Вы должны включить разрешения для модуля "${PermissionLabels[permissionType]}" в настройках устройства, чтобы использовать эту функцию.`;

  Alert.alert(
    title,
    message,
    [
      {
        text: 'Отмена',
        style: 'cancel',
        onPress: onCancel,
      },
      {
        text: 'Открыть настройки',
        onPress: () => {
          if (Platform.OS === 'ios') {
            Linking.openURL('app-settings:');
          } else {
            Linking.openSettings();
          }
        },
      },
    ],
    { cancelable: false }
  );
};
