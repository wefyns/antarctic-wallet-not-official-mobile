import { StyleSheet } from 'react-native';
import { colors } from 'constants/colors';

export const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'space-between',
    paddingHorizontal: 24,
    paddingVertical: 40,
    backgroundColor: colors.darkBackground,
  },
  content: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  title: {
    fontSize: 32,
    fontWeight: 'bold',
    color: colors.white,
    marginBottom: 16,
    textAlign: 'center',
  },
  description: {
    fontSize: 18,
    color: colors.white,
    textAlign: 'center',
    opacity: 0.8,
    lineHeight: 26,
  },
  buttonContainer: {
    width: '100%',
  },
});
