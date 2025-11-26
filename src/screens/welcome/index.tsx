import { StatusBar, View, Text } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';

import { AppScreenLayout } from 'common/app-layout';
import { CustomButton } from 'common/button';
import { RootStackParamList } from 'navigation';

import { styles } from './styles';

type NavigationProp = NativeStackNavigationProp<RootStackParamList, 'Welcome'>;

export const WelcomeScreen: React.FC = () => {
  const navigation = useNavigation<NavigationProp>();

  const handleLogin = () => {
    navigation.navigate('Login');
  };

  return (
    <AppScreenLayout safeAreaEdges={['top', 'bottom']}>
      <StatusBar animated barStyle="light-content" />
      
      <View style={styles.container}>
        <View style={styles.content}>
          <Text style={styles.title}>Добро пожаловать!</Text>
          <Text style={styles.description}>
            Это приложение для быстрой и удобной оплаты по QR коду
          </Text>
        </View>

        <View style={styles.buttonContainer}>
          <CustomButton title="Login with Telegram" onPress={handleLogin} />
        </View>
      </View>
    </AppScreenLayout>
  );
};
