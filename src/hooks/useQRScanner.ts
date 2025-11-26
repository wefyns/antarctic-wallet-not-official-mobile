import { useState, useRef } from 'react';
import { Vibration, Linking, Alert } from 'react-native';
import { useCameraDevice, useCodeScanner } from 'react-native-vision-camera';

export const useQRScanner = () => {
  const [scannedData, setScannedData] = useState(null);
  const [isScanning, setIsScanning] = useState(true);
  const lastScanTime = useRef(0);

  const device = useCameraDevice('back');

  const codeScanner = useCodeScanner({
    codeTypes: ['qr'],
    onCodeScanned: codes => {
      if (!isScanning || codes.length === 0) return;

      const now = Date.now();
      // Throttle scanning to once per second
      if (now - lastScanTime.current < 1000) return;
      lastScanTime.current = now;

      const code = codes[0];

      // Vibrate on successful scan
      Vibration.vibrate(100);

      // Capture the QR code data and stop scanning
      setScannedData(code.value);
      setIsScanning(false);
    },
  });

  const resetScanner = () => {
    setScannedData(null);
    setIsScanning(true);
  };

  const handleOpenLink = () => {
    if (scannedData) {
      Linking.canOpenURL(scannedData).then(supported => {
        if (supported) {
          Linking.openURL(scannedData);
        } else {
          Alert.alert('Error', 'Unable to open this URL');
        }
      });
    }
  };

  return {
    device,
    isScanning,
    codeScanner,
    scannedData,
    resetScanner,
    handleOpenLink,
  };
};
