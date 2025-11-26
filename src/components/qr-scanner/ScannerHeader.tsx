import React from 'react';
import { View, Text, StyleSheet } from 'react-native';

import { colors } from 'constants/colors';

export const ScannerHeader: React.FC = () => {
  return (
    <View style={styles.header}>
      <Text style={styles.headerText}>Отсканируйте QR код</Text>
      <Text style={styles.instructionText}>
        Поместите QR код в рамку
      </Text>
    </View>
  );
};

const styles = StyleSheet.create({
  header: {
    position: 'absolute',
    top: 60,
    left: 0,
    right: 0,
    alignItems: 'center',
    zIndex: 1,
  },
  headerText: {
    fontSize: 24,
    fontWeight: 'bold',
    color: colors.background,
    marginBottom: 8,
  },
  instructionText: {
    fontSize: 14,
    color: colors.placeholder,
    textAlign: 'center',
  },
});
