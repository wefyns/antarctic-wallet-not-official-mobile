import { StyleSheet, Platform } from 'react-native';

export const styles = StyleSheet.create({
  base: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    borderWidth: 1,
  },
  fullWidth: { alignSelf: 'stretch' },
  content: { alignItems: 'center', justifyContent: 'center' },
  title: { fontWeight: '700', textAlign: 'center' },
  leftIcon: { marginRight: 8, alignItems: 'center', justifyContent: 'center' },
  rightIcon: { marginLeft: 8, alignItems: 'center', justifyContent: 'center' },
  disabled: { opacity: 0.6 },
});
