import { useEffect, useState } from 'react';

import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';

import { UserStore } from 'storage';

import { LoginScreen } from 'screens/login';
import { SplashScreen } from 'screens/splash';
import { TopUpScreen } from 'screens/top-up';
import { WelcomeScreen } from 'screens/welcome';

import { TabNavigator } from './TabNavigator';

export type RootStackParamList = {
  Welcome: undefined;
  Login: undefined;
  ForgotPassword: undefined;
  Home: undefined;
  TopUp: undefined;
};

interface AppStackProps {
  initialScreen: keyof RootStackParamList;
}

const screenOptions = {
  headerShown: false,
};

const Stack = createNativeStackNavigator<RootStackParamList>();

const AppStack: React.FC<AppStackProps> = ({ initialScreen }) => (
  <Stack.Navigator
    screenOptions={screenOptions}
    initialRouteName={initialScreen}
  >
    <Stack.Screen name="Welcome" component={WelcomeScreen} />
    <Stack.Screen name="Login" component={LoginScreen} />
    <Stack.Screen name="Home" component={TabNavigator} />
    <Stack.Screen name="TopUp" component={TopUpScreen} />
  </Stack.Navigator>
);

export const Routes: React.FC = () => {
  const [initialScreen, setInitialScreen] = useState<'Welcome' | 'Home' | null>(
    null,
  );

  useEffect(() => {
    let mounted = true;

    (async () => {
      try {
        const stored = await UserStore.get();

        if (!mounted) return;
        if (stored?.token) {
          setInitialScreen('Home');
        } else {
          setInitialScreen('Welcome');
        }
      } catch (e) {
        console.warn('Routes init error', e);
        if (mounted) setInitialScreen('Welcome');
      }
    })();
    return () => {
      mounted = false;
    };
  }, []);

  if (initialScreen === null) return <SplashScreen />;

  return (
    <NavigationContainer>
      <AppStack initialScreen={initialScreen} />
    </NavigationContainer>
  );
};
