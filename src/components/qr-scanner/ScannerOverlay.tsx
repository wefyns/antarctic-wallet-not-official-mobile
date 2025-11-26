import React, { useEffect, useRef } from 'react';
import { StyleSheet, Animated, Easing, View } from 'react-native';
import { Svg, Rect, Defs, Mask, Path } from 'react-native-svg';

import { colors } from 'constants/colors';

interface ScannerOverlayProps {
  isScanning: boolean;
  screenWidth: number;
  screenHeight: number;
  scanSuccess: boolean;
  onAnimationComplete: () => void;
}

export const ScannerOverlay: React.FC<ScannerOverlayProps> = ({
  isScanning,
  screenWidth,
  screenHeight,
  scanSuccess,
  onAnimationComplete,
}) => {
  const animatedValue = useRef(new Animated.Value(0)).current;
  const scaleValue = useRef(new Animated.Value(1)).current;
  const opacityValue = useRef(new Animated.Value(1)).current;
  const successOpacityValue = useRef(new Animated.Value(0)).current;

  // Static scanning frame dimensions
  const frameX = screenWidth * 0.15;
  const frameY = screenHeight * 0.3;
  const frameWidth = screenWidth * 0.7;
  const frameHeight = screenWidth * 0.7;

  // Corner styling
  const cornerSize = 40;
  const cornerThickness = 4;
  const borderColor = colors.scan;

  // Animated values for frame
  const animatedScale = scaleValue.interpolate({
    inputRange: [0, 1],
    outputRange: [0.3, 1],
  });

  const animatedOpacity = opacityValue.interpolate({
    inputRange: [0, 1],
    outputRange: [0, 1],
  });

  // Success checkmark animation
  useEffect(() => {
    if (scanSuccess) {
      // Only collapse the frame corners, not the background
      Animated.parallel([
        Animated.timing(scaleValue, {
          toValue: 0.3,
          duration: 400,
          useNativeDriver: true,
          easing: Easing.out(Easing.cubic),
        }),
        Animated.timing(opacityValue, {
          toValue: 0,
          duration: 300,
          useNativeDriver: true,
        }),
      ]).start();

      // Show success animation
      Animated.sequence([
        Animated.delay(300),
        Animated.timing(successOpacityValue, {
          toValue: 1,
          duration: 300,
          useNativeDriver: true,
        }),
        Animated.delay(600),
      ]).start(() => {
        // Notify parent component when animation is complete
        onAnimationComplete();
      });
    } else {
      // Reset animations when returning to scanning
      scaleValue.setValue(1);
      opacityValue.setValue(1);
      successOpacityValue.setValue(0);
    }
  }, [scanSuccess]);

  // Scanning animation - moves a line up and down
  useEffect(() => {
    if (isScanning && !scanSuccess) {
      Animated.loop(
        Animated.sequence([
          Animated.timing(animatedValue, {
            toValue: 1,
            duration: 1500,
            easing: Easing.linear,
            useNativeDriver: true,
          }),
          Animated.timing(animatedValue, {
            toValue: 0,
            duration: 1500,
            easing: Easing.linear,
            useNativeDriver: true,
          }),
        ]),
      ).start();
    } else {
      animatedValue.stopAnimation();
    }
  }, [isScanning, scanSuccess]);

  // Calculate the position of the scanning line
  const scanLineTranslateY = animatedValue.interpolate({
    inputRange: [0, 1],
    outputRange: [0, frameHeight],
  });

  return (
    <>
      {/* Always visible background with cutout */}
      <View style={StyleSheet.absoluteFill}>
        <Svg style={StyleSheet.absoluteFill}>
          <Defs>
            <Mask id="mask">
              <Rect width="100%" height="100%" fill="white" />
              <Rect
                x={frameX}
                y={frameY}
                width={frameWidth}
                height={frameHeight}
                fill="black"
              />
            </Mask>
          </Defs>

          {/* Semi-transparent overlay with cutout */}
          <Rect
            width="100%"
            height="100%"
            fill="rgba(0, 0, 0, 0.6)"
            mask="url(#mask)"
          />
        </Svg>
      </View>

      {/* Animated frame corners only */}
      <Animated.View
        style={[
          StyleSheet.absoluteFill,
          {
            transform: [{ scale: animatedScale }],
            opacity: animatedOpacity,
          },
        ]}
      >
        <Svg style={StyleSheet.absoluteFill}>
          {/* Scanning frame corners */}
          {/* Top-left corner */}
          <Rect
            x={frameX}
            y={frameY}
            width={cornerSize}
            height={cornerThickness}
            fill={borderColor}
          />
          <Rect
            x={frameX}
            y={frameY}
            width={cornerThickness}
            height={cornerSize}
            fill={borderColor}
          />

          {/* Top-right corner */}
          <Rect
            x={frameX + frameWidth - cornerSize}
            y={frameY}
            width={cornerSize}
            height={cornerThickness}
            fill={borderColor}
          />
          <Rect
            x={frameX + frameWidth - cornerThickness}
            y={frameY}
            width={cornerThickness}
            height={cornerSize}
            fill={borderColor}
          />

          {/* Bottom-left corner */}
          <Rect
            x={frameX}
            y={frameY + frameHeight - cornerThickness}
            width={cornerSize}
            height={cornerThickness}
            fill={borderColor}
          />
          <Rect
            x={frameX}
            y={frameY + frameHeight - cornerSize}
            width={cornerThickness}
            height={cornerSize}
            fill={borderColor}
          />

          {/* Bottom-right corner */}
          <Rect
            x={frameX + frameWidth - cornerSize}
            y={frameY + frameHeight - cornerThickness}
            width={cornerSize}
            height={cornerThickness}
            fill={borderColor}
          />
          <Rect
            x={frameX + frameWidth - cornerThickness}
            y={frameY + frameHeight - cornerSize}
            width={cornerThickness}
            height={cornerSize}
            fill={borderColor}
          />
        </Svg>
      </Animated.View>

      {/* Scanning line */}
      {isScanning && !scanSuccess && (
        <Animated.View
          style={{
            position: 'absolute',
            left: frameX,
            top: frameY,
            width: frameWidth,
            height: 2,
            backgroundColor: 'rgba(0, 255, 0, 0.8)',
            transform: [{ translateY: scanLineTranslateY }],
          }}
        />
      )}

      {/* Success checkmark */}
      <Animated.View
        style={[
          styles.successContainer,
          {
            opacity: successOpacityValue,
            backgroundColor: colors.transparent, // Make this transparent to keep dark background visible
          },
        ]}
      >
        <Animated.View
          style={{
            transform: [
              {
                scale: successOpacityValue.interpolate({
                  inputRange: [0, 1],
                  outputRange: [0.5, 1],
                }),
              },
            ],
          }}
        >
          <Svg width={100} height={100} viewBox="0 0 24 24">
            <Path
              d="M9,16.17L4.83,12l-1.42,1.41L9,19 21,7l-1.41-1.41L9,16.17z"
              fill="#00FF00"
              strokeWidth={1}
            />
          </Svg>
        </Animated.View>
      </Animated.View>
    </>
  );
};

const styles = StyleSheet.create({
  successContainer: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    justifyContent: 'center',
    alignItems: 'center',
  },
});
