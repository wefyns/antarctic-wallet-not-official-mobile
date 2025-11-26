import React from 'react';
import { StyleSheet, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Icons } from 'components/icons';

const splashStyles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  logo: {
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'center',
  },
});

export const SplashScreen = () => (
  <SafeAreaView style={splashStyles.container}>
    <View style={splashStyles.logo}>
    </View>
  </SafeAreaView>
);
