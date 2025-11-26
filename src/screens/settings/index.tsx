import { StatusBar, View, Text } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { CommonActions } from '@react-navigation/native';

import { AppScreenLayout } from 'common/app-layout';
import { CustomButton } from 'common/button';
import { UserStore } from 'storage';

import { styles } from './styles';

export const SettingsScreen: React.FC = () => {
  const navigation = useNavigation();

  const handleLogout = async () => {
    // Очищаем токен
    await UserStore.clear();
    
    // Переходим на Welcome и сбрасываем стек навигации
    navigation.dispatch(
      CommonActions.reset({
        index: 0,
        routes: [{ name: 'Welcome' }],
      })
    );
  };

  return (
    <AppScreenLayout safeAreaEdges={['top']}>
      <StatusBar animated barStyle="light-content" />
      
      <View style={styles.container}>
        <View style={styles.header}>
          <Text style={styles.title}>Настройки</Text>
        </View>

        <View style={styles.buttonContainer}>
          <CustomButton 
            title="Выйти из аккаунта" 
            onPress={handleLogout}
            variant="danger"
          />
        </View>
      </View>
    </AppScreenLayout>
  );
};
