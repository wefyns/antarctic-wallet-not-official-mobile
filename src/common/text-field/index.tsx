import React, { useCallback, useMemo, useState } from 'react';
import {
  View,
  Text,
  TextInput,
  TextInputProps,
  StyleSheet,
  Platform,
  Pressable,
  StyleProp,
  TextStyle,
  ViewStyle,
} from 'react-native';

import { Icons } from 'components/icons';

import { styles as baseStyles } from './styles';

const ICON_TOUCH_HITSLOP = { top: 8, bottom: 8, left: 8, right: 8 };

export type TextFieldProps = {
  value?: string;
  onChange?: (text: string) => void;
  onChangeText?: (text: string) => void;
  onBlur?: TextInputProps['onBlur'];
  onFocus?: TextInputProps['onFocus'];
  placeholder?: string;
  placeholderTextColor?: string;
  secure?: boolean;
  showToggle?: boolean;
  errorMessage?: string | null;
  leftIcon?: React.ReactNode;
  rightIcon?: React.ReactNode;
  multiline?: boolean;
  numberOfLines?: number;
  editable?: boolean;
  keyboardType?: TextInputProps['keyboardType'];
  returnKeyType?: TextInputProps['returnKeyType'];
  onSubmitEditing?: TextInputProps['onSubmitEditing'];
  maxLength?: number;
  testID?: string;
  accessibilityLabel?: string;
  containerStyle?: StyleProp<ViewStyle>;
  inputStyle?: StyleProp<TextStyle>;
  inputProps?: Partial<TextInputProps>;
};

const TextFieldInner = (props: TextFieldProps, ref: React.Ref<TextInput>) => {
  const {
    value,
    onChange,
    onChangeText,
    onBlur,
    onFocus,
    placeholder,
    placeholderTextColor = 'grey',
    secure = false,
    showToggle = true,
    errorMessage,
    leftIcon,
    rightIcon,
    multiline = false,
    numberOfLines,
    editable = true,
    keyboardType = 'default',
    returnKeyType = 'done',
    onSubmitEditing,
    maxLength,
    testID,
    accessibilityLabel,
    containerStyle,
    inputStyle,
    inputProps = {},
  } = props;

  const [visible, setVisible] = useState(false);
  const secureEntry = useMemo(() => secure && !visible, [secure, visible]);

  const handleChange = useCallback(
    (text: string) => {
      onChange && onChange(text);
      onChangeText && onChangeText(text);
    },
    [onChange, onChangeText],
  );

  const toggleVisibility = useCallback(() => setVisible(v => !v), []);

  const safeInputProps: Partial<TextInputProps> = useMemo(() => {
    const base: Partial<TextInputProps> = {
      multiline,
      numberOfLines,
      editable,
      keyboardType,
      returnKeyType,
      onSubmitEditing,
      maxLength,
      autoCapitalize: inputProps.autoCapitalize ?? 'none',
      autoCorrect: inputProps.autoCorrect ?? false,
      autoComplete: inputProps.autoComplete,
      textAlignVertical: multiline
        ? 'top'
        : (inputProps.textAlignVertical as any),
    };

    if (
      'importantForAutofill' in inputProps &&
      inputProps.importantForAutofill != null
    ) {
      (base as any).importantForAutofill = inputProps.importantForAutofill;
    }

    return base;
  }, [
    inputProps,
    multiline,
    numberOfLines,
    editable,
    keyboardType,
    returnKeyType,
    onSubmitEditing,
    maxLength,
  ]);

  const computedMultilineStyle = useMemo(() => {
    if (!multiline || !numberOfLines) return null;

    const flattened = StyleSheet.flatten(inputStyle) as TextStyle | undefined;

    let fontSize = flattened?.fontSize ?? 16;
    let lineHeight = flattened?.lineHeight;

    if (!lineHeight) {
      lineHeight = Math.round(fontSize * 1.3);
    }

    const verticalPaddingGuess = 16;
    const minHeight = Math.round(
      lineHeight * numberOfLines + verticalPaddingGuess,
    );

    return { minHeight };
  }, [multiline, numberOfLines, inputStyle]);

  const inputContainerStyle = useMemo<StyleProp<ViewStyle>>(
    () => [
      baseStyles.container,
      containerStyle,
      errorMessage ? baseStyles.containerError : null,
    ],
    [containerStyle, errorMessage],
  );

  const finalInputStyle = useMemo<StyleProp<TextStyle>>(() => {
    const arr: StyleProp<TextStyle>[] = [
      baseStyles.input,
      multiline && baseStyles.inputMultiline,
      inputStyle,
      errorMessage ? baseStyles.inputError : null,
    ];
    if (computedMultilineStyle) arr.push(computedMultilineStyle as TextStyle);
    return arr;
  }, [inputStyle, multiline, errorMessage, computedMultilineStyle]);

  const renderLeft = useMemo(
    () =>
      leftIcon ? (
        <View style={baseStyles.leftIconWrapper} pointerEvents="box-none">
          {leftIcon}
        </View>
      ) : null,
    [leftIcon],
  );
  const renderRightProvided = useMemo(
    () =>
      rightIcon ? (
        <View style={baseStyles.rightIconWrapper} pointerEvents="box-none">
          {rightIcon}
        </View>
      ) : null,
    [rightIcon],
  );

  return (
    <View style={inputContainerStyle}>
      <View style={baseStyles.row}>
        {renderLeft}

        <TextInput
          ref={ref}
          style={finalInputStyle}
          value={value}
          onChangeText={handleChange}
          onBlur={onBlur}
          onFocus={onFocus}
          placeholder={placeholder}
          placeholderTextColor={placeholderTextColor}
          secureTextEntry={secureEntry}
          editable={editable}
          underlineColorAndroid="transparent"
          testID={testID}
          accessibilityLabel={accessibilityLabel ?? placeholder}
          {...safeInputProps}
        />

        {renderRightProvided}
      </View>

      {errorMessage ? (
        <Text style={baseStyles.errorText}>{errorMessage}</Text>
      ) : null}
    </View>
  );
};

export const TextField = React.forwardRef<TextInput, TextFieldProps>(
  TextFieldInner,
);

TextField.displayName = 'TextField';
export default TextField;
