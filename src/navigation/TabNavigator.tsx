import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { HomeScreen } from 'screens/home';
import { QRCodeScannerScreen } from 'screens/scanner-qr';
import { SettingsScreen } from 'screens/settings';
import { colors } from 'constants/colors';
import { Icons } from 'components/icons';

export type TabParamList = {
  HomeTab: undefined;
  QRScanner: undefined;
  SettingsTab: undefined;
};

const Tab = createBottomTabNavigator<TabParamList>();

export const TabNavigator: React.FC = () => {
  return (
    <Tab.Navigator
      screenOptions={{
        headerShown: false,
        tabBarActiveTintColor: colors.primary,
        tabBarInactiveTintColor: colors.textSecondary,
        tabBarStyle: {
          backgroundColor: colors.darkBackground,
          borderTopColor: colors.border,
        },
      }}
    >
      <Tab.Screen
        name="HomeTab"
        component={HomeScreen}
        options={{
          tabBarLabel: 'Главная',
          tabBarIcon: () => <Icons.Home />,
        }}
      />
      <Tab.Screen
        name="QRScanner"
        component={QRCodeScannerScreen}
        options={{
          tabBarLabel: 'Сканер',
          tabBarIcon: () => <Icons.Qr />,
        }}
      />
      <Tab.Screen
        name="SettingsTab"
        component={SettingsScreen}
        options={{
          tabBarLabel: 'Настройки',
          tabBarIcon: () => <Icons.Settings />,
        }}
      />
    </Tab.Navigator>
  );
};
