import { StyleSheet } from 'react-native';

import { colors } from 'constants/colors';

export const styles = StyleSheet.create({
  container: {
    width: '100%',
  },
  containerError: {},
  row: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: colors.background,
    borderRadius: 0,
    borderWidth: 1,
    borderColor: colors.border,
    paddingHorizontal: 12,
    minHeight: 48,
  },
  leftIconWrapper: {
    marginRight: 8,
    justifyContent: 'center',
    alignItems: 'center',
  },
  rightIconWrapper: {
    marginLeft: 8,
    justifyContent: 'center',
    alignItems: 'center',
  },
  input: {
    flex: 1,
    color: colors.text,
    fontSize: 16,
  },
  inputMultiline: {
    paddingVertical: 10,
    minHeight: 80,
    textAlignVertical: 'top',
  },
  inputError: {
    borderColor: colors.error,
  },
  toggleTouchable: {
    marginLeft: 8,
    paddingHorizontal: 6,
    paddingVertical: 6,
    justifyContent: 'center',
    alignItems: 'center',
  },
  eyeText: {
    fontSize: 18,
    color: colors.placeholder,
  },
  errorText: {
    marginTop: 6,
    color: colors.error,
    fontSize: 12,
  },
});
