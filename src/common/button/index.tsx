import React, { useCallback, useMemo } from 'react';
import {
  TouchableOpacity,
  Text,
  ActivityIndicator,
  View,
  Keyboard,
  GestureResponderEvent,
  StyleProp,
  ViewStyle,
  TextStyle,
} from 'react-native';

import { styles } from './styles';

import { colors } from 'constants/colors';

type Variant = 'primary' | 'secondary' | 'danger' | 'dangerSecondary' | 'ghost';
type Size = 'sm' | 'md' | 'lg';

export type CustomButtonProps = {
  title?: string;
  onPress?: (e: GestureResponderEvent) => void;
  disabled?: boolean;
  loading?: boolean;
  variant?: Variant;
  size?: Size;
  fullWidth?: boolean;
  rounded?: boolean;
  leftIcon?: React.ReactNode;
  rightIcon?: React.ReactNode;
  testID?: string;
  accessibilityLabel?: string;
  containerStyle?: StyleProp<ViewStyle>;
  textStyle?: StyleProp<TextStyle>;
  dismissKeyboardOnPress?: boolean;
  allowPressWhileLoading?: boolean;
};

export const CustomButton: React.FC<CustomButtonProps> = ({
  title,
  onPress,
  disabled = false,
  loading = false,
  variant = 'primary',
  size = 'md',
  fullWidth = true,
  rounded = false,
  leftIcon,
  rightIcon,
  testID,
  accessibilityLabel,
  containerStyle,
  textStyle,
  dismissKeyboardOnPress = true,
  allowPressWhileLoading = false,
}) => {
  const isDisabled = useMemo(
    () => disabled || (loading && !allowPressWhileLoading),
    [disabled, loading, allowPressWhileLoading],
  );

  const variantStyle = useMemo(() => {
    switch (variant) {
      case 'secondary':
        return {
          backgroundColor: colors.transparent,
          borderColor: colors.primaryButton,
          textColor: colors.primaryButton,
        };
      case 'danger':
        return {
          backgroundColor: colors.error,
          borderColor: colors.transparent,
          textColor: colors.white,
        };
      case 'dangerSecondary':
        return {
          backgroundColor: colors.transparent,
          borderColor: colors.error,
          textColor: colors.error,
        };
      case 'ghost':
        return {
          backgroundColor: colors.transparent,
          borderColor: colors.transparent,
          textColor: colors.primaryButton,
        };
      case 'primary':
      default:
        return {
          backgroundColor: colors.primaryButton,
          borderColor: colors.transparent,
          textColor: colors.white,
        };
    }
  }, [variant]);

  const sizeStyle = useMemo(() => {
    switch (size) {
      case 'sm':
        return { height: 40, fontSize: 14, paddingHorizontal: 12, borderRadius: 20 };
      case 'lg':
        return { height: 56, fontSize: 18, paddingHorizontal: 20, borderRadius: 28 };
      case 'md':
      default:
        return { height: 48, fontSize: 16, paddingHorizontal: 16, borderRadius: 24 };
    }
  }, [size]);

  const handlePress = useCallback(
    (e?: GestureResponderEvent) => {
      if (isDisabled) return;
      if (dismissKeyboardOnPress) Keyboard.dismiss();
      onPress?.(e as GestureResponderEvent);
    },
    [isDisabled, onPress, dismissKeyboardOnPress],
  );

  const activityColor = useMemo(
    () => variantStyle.textColor ?? '#fff',
    [variantStyle],
  );

  return (
    <TouchableOpacity
      testID={testID}
      accessibilityLabel={accessibilityLabel ?? title}
      accessibilityRole="button"
      accessibilityState={{ disabled: isDisabled, busy: loading }}
      activeOpacity={0.8}
      onPress={handlePress}
      disabled={isDisabled}
      style={[
        styles.base,
        fullWidth && styles.fullWidth,
        {
          backgroundColor: variantStyle.backgroundColor,
          borderColor: variantStyle.borderColor,
          height: sizeStyle.height,
          paddingHorizontal: sizeStyle.paddingHorizontal,
          borderRadius: rounded ? sizeStyle.borderRadius : sizeStyle.borderRadius,
        },
        isDisabled && styles.disabled,
        containerStyle,
      ]}
    >
      {leftIcon ? <View style={styles.leftIcon}>{leftIcon}</View> : null}

      <View style={styles.content}>
        {loading ? (
          <ActivityIndicator size="small" color={String(activityColor)} />
        ) : (
          <Text
            selectable={false}
            numberOfLines={1}
            ellipsizeMode="tail"
            style={[
              styles.title,
              { color: variantStyle.textColor, fontSize: sizeStyle.fontSize },
              textStyle,
            ]}
          >
            {title}
          </Text>
        )}
      </View>

      {rightIcon ? <View style={styles.rightIcon}>{rightIcon}</View> : null}
    </TouchableOpacity>
  );
};
