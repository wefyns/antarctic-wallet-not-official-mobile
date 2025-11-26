import { StyleSheet } from 'react-native';
import { colors } from 'constants/colors';

export const styles = StyleSheet.create({
  scrollContent: {
    flexGrow: 1,
  },
  wrapperLogo: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    paddingTop: 40,
  },
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    paddingHorizontal: 24,
    backgroundColor: colors.darkBackground,
  },
  content: {
    width: '100%',
    alignItems: 'center',
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    color: colors.white,
    marginBottom: 16,
    textAlign: 'center',
  },
  instruction: {
    fontSize: 16,
    color: colors.white,
    opacity: 0.8,
    textAlign: 'center',
    marginBottom: 32,
    lineHeight: 24,
  },
  loadingText: {
    fontSize: 16,
    color: colors.white,
    marginTop: 16,
    textAlign: 'center',
  },
  instructionText: {
    fontSize: 14,
    color: colors.white,
    opacity: 0.7,
    marginTop: 8,
    textAlign: 'center',
  },
  buttonContainer: {
    width: '100%',
    marginBottom: 16,
  },
  backButton: {
    marginTop: 16,
    padding: 12,
  },
  backButtonText: {
    color: colors.white,
    opacity: 0.6,
    fontSize: 16,
    textAlign: 'center',
  },
  errorContainer: {
    width: '100%',
    alignItems: 'center',
  },
  errorText: {
    fontSize: 16,
    color: '#ff6b6b',
    marginBottom: 24,
    textAlign: 'center',
  },
});
