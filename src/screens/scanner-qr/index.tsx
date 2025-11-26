import React, { useState, useRef } from 'react';
import {
  Dimensions,
  StyleSheet,
  View,
} from 'react-native';
import { Camera } from 'react-native-vision-camera';
import { useRoute, RouteProp } from '@react-navigation/native';

import { colors } from 'constants/colors';

import { useQRScanner } from 'hooks/useQRScanner';
import { useCameraPermission } from 'hooks/useCameraPermission';

import {
  ScannerHeader,
  ScannerOverlay,
  PermissionRequest,
  PaymentModal,
} from 'components/qr-scanner';

const { width: SCREEN_WIDTH, height: SCREEN_HEIGHT } = Dimensions.get('window');

export type QRCodeScannerType = 'scan' | 'fix' | 'remove' | 'tmc' | 'incident';

type RouteParams = RouteProp<
  { QRCodeScanner: { action?: QRCodeScannerType } },
  'QRCodeScanner'
>;

export const QRCodeScannerScreen: React.FC = () => {
  const route = useRoute<RouteParams>();
  const camera = useRef<Camera>(null);

  const { hasPermission, requestCameraPermission } = useCameraPermission();
  const {
    device,
    isScanning,
    codeScanner,
    scannedData,
    resetScanner,
  } = useQRScanner();

  const [showModal, setShowModal] = useState(false);

  // When QR code is scanned, show the modal
  React.useEffect(() => {
    if (scannedData) {
      setShowModal(true);
    }
  }, [scannedData]);

  // Handle modal close
  const handleCloseModal = () => {
    setShowModal(false);
    resetScanner();
  };

  if (hasPermission === false) {
    return <PermissionRequest onRequestPermission={requestCameraPermission} />;
  }

  if (!device) {
    return <PermissionRequest message="No camera device found" />;
  }

  return (
    <View style={styles.container}>
      <Camera
        ref={camera}
        style={StyleSheet.absoluteFill}
        device={device}
        isActive={isScanning}
        codeScanner={codeScanner}
      />

      <ScannerOverlay
        isScanning={isScanning}
        screenWidth={SCREEN_WIDTH}
        screenHeight={SCREEN_HEIGHT}
        scanSuccess={!!scannedData}
        onAnimationComplete={() => {}}
      />

      <ScannerHeader />

      {scannedData && (
        <PaymentModal
          visible={showModal}
          qrUrl={scannedData}
          coin="USDT"
          onClose={handleCloseModal}
        />
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.text,
  },
});

