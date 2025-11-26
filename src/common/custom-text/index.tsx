import React, { useMemo } from 'react';
import {
  Text as RNText,
  TextProps as RNTextProps,
  StyleSheet,
  TextStyle,
  StyleProp,
} from 'react-native';

type SizeToken = 'xs' | 'sm' | 'md' | 'lg' | 'xl' | '2xl';
type WeightToken = 'regular' | 'medium' | 'semibold' | 'bold';
type ToneToken =
  | 'default'
  | 'muted'
  | 'primary'
  | 'danger'
  | 'success'
  | 'subtle';

export type CustomTextProps = Omit<RNTextProps, 'style'> & {
  children?: React.ReactNode;
  size?: SizeToken | number;
  weight?: WeightToken | number;
  tone?: ToneToken | string;
  caps?: boolean;
  center?: boolean;
  right?: boolean;
  tokenOverrides?: {
    sizes?: Partial<Record<SizeToken, number>>;
    weights?: Partial<Record<WeightToken, TextStyle['fontWeight'] | number>>;
    tones?: Partial<Record<ToneToken, string>>;
  };
  style?: StyleProp<TextStyle>;
};

const DEFAULT_SIZES: Record<SizeToken, number> = {
  xs: 12,
  sm: 14,
  md: 16,
  lg: 18,
  xl: 20,
  '2xl': 24,
};

const DEFAULT_WEIGHTS: Record<WeightToken, TextStyle['fontWeight']> = {
  regular: '400',
  medium: '500',
  semibold: '600',
  bold: '700',
};

const DEFAULT_TONES: Record<ToneToken, string> = {
  default: '#000000',
  muted: 'grey',
  primary: '#1e88e5',
  danger: 'red',
  success: 'green',
  subtle: '#8B9198',
};

export const CustomText: React.FC<CustomTextProps> = props => {
  const {
    children,
    size = 'md',
    weight = 'regular',
    tone = 'default',
    caps = false,
    center = false,
    right = false,
    tokenOverrides,
    style,
    testID,
    selectable = false,
    numberOfLines,
    ellipsizeMode = 'tail',
    onPress,
    accessibilityLabel,
    ...rest
  } = props;

  const sizes = useMemo(
    () => ({ ...DEFAULT_SIZES, ...(tokenOverrides?.sizes ?? {}) }),
    [tokenOverrides],
  );
  const weights = useMemo(
    () => ({ ...DEFAULT_WEIGHTS, ...(tokenOverrides?.weights ?? {}) }),
    [tokenOverrides],
  );
  const tones = useMemo(
    () => ({ ...DEFAULT_TONES, ...(tokenOverrides?.tones ?? {}) }),
    [tokenOverrides],
  );

  const fontSize = useMemo(() => {
    if (typeof size === 'number') return size;
    return sizes[size] ?? DEFAULT_SIZES.md;
  }, [size, sizes]);

  const fontWeight = useMemo(() => {
    if (typeof weight === 'number')
      return String(weight) as TextStyle['fontWeight'];
    if (/^\d+$/.test(String(weight)))
      return String(weight) as TextStyle['fontWeight'];
    return (
      (weights[weight as WeightToken] as TextStyle['fontWeight']) ??
      DEFAULT_WEIGHTS.regular
    );
  }, [weight, weights]);

  const color = useMemo(() => {
    if (typeof tone === 'string' && !(tone in DEFAULT_TONES)) {
      return tone;
    }
    return (
      (tones as Record<string, string>)[tone as string] ?? DEFAULT_TONES.default
    );
  }, [tone, tones]);

  const textTransform = caps ? 'uppercase' : undefined;

  const baseStyle = useMemo<TextStyle>(
    () => ({ fontSize, fontWeight, color, textTransform }),
    [fontSize, fontWeight, color, textTransform],
  );

  const alignmentStyle = useMemo<TextStyle | undefined>(() => {
    if (center) return { textAlign: 'center' };
    if (right) return { textAlign: 'right' };
    return undefined;
  }, [center, right]);

  const composedStyle = useMemo(() => {
    const stylesArr: StyleProp<TextStyle>[] = [baseStyle];
    if (alignmentStyle) stylesArr.push(alignmentStyle);
    if (style) stylesArr.push(style);
    return StyleSheet.flatten(stylesArr) as TextStyle;
  }, [baseStyle, alignmentStyle, style]);

  return (
    <RNText
      style={composedStyle}
      testID={testID}
      selectable={selectable}
      numberOfLines={numberOfLines}
      ellipsizeMode={ellipsizeMode}
      onPress={onPress}
      accessibilityLabel={accessibilityLabel}
      {...(rest as RNTextProps)}
    >
      {children}
    </RNText>
  );
};
