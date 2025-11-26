import React, { useMemo } from 'react';
import { View, ViewStyle, StyleProp } from 'react-native';
import {
  SafeAreaView,
  useSafeAreaInsets,
  Edge,
} from 'react-native-safe-area-context';

import { styles } from './styles';

type Props = {
  style?: StyleProp<ViewStyle>;
  children?: React.ReactNode;
  hPadding?: number;
  animateOnFocus?: boolean;
  safeAreaEdges?: Edge[];
};

export const AppScreenLayout: React.FC<Props> = ({
  style,
  children,
  hPadding = 0,
  animateOnFocus = true,
  safeAreaEdges = ['top', 'bottom'],
}) => {
  const insets = useSafeAreaInsets();

  const containerStyles: StyleProp<ViewStyle> = useMemo(
    () => [
      styles.container,
      {
        paddingTop: Math.max(insets.top, 0),
        paddingBottom: Math.max(insets.bottom, 0),
        paddingLeft: Math.max(insets.left, 0) + hPadding,
        paddingRight: Math.max(insets.right, 0) + hPadding,
      } as ViewStyle,
      style,
    ],
    [insets, hPadding, style],
  );

  return (
    <SafeAreaView style={containerStyles} edges={safeAreaEdges}>
      <View style={styles.content}>{children}</View>
    </SafeAreaView>
  );
};
