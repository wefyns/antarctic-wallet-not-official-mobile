import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';

import { colors } from 'constants/colors';

interface PermissionRequestProps {
  message?: string;
  onRequestPermission?: () => void;
}

export const PermissionRequest: React.FC<PermissionRequestProps> = ({
  message = 'Camera permission is required',
  onRequestPermission,
}) => {
  return (
    <View style={styles.container}>
      <Text style={styles.permissionText}>{message}</Text>
      {onRequestPermission && (
        <TouchableOpacity style={styles.button} onPress={onRequestPermission}>
          <Text style={styles.buttonText}>Grant Permission</Text>
        </TouchableOpacity>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.text,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 20,
  },
  permissionText: {
    fontSize: 16,
    color: colors.background,
    textAlign: 'center',
    marginBottom: 20,
  },
  button: {
    paddingVertical: 12,
    paddingHorizontal: 24,
    borderRadius: 8,
    minWidth: 120,
    alignItems: 'center',
    backgroundColor: colors.primary,
  },
  buttonText: {
    color: colors.background,
    fontSize: 16,
    fontWeight: '600',
  },
});
