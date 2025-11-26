import { useState, useEffect } from 'react';
import { Camera } from 'react-native-vision-camera';
import { showPermissionAlert } from '../utils/permissionAlerts';

export const useCameraPermission = () => {
  const [hasPermission, setHasPermission] = useState(false);
  const [permissionDenied, setPermissionDenied] = useState(false);

  const requestCameraPermission = async () => {
    const status = await Camera.getCameraPermissionStatus();

    if (status === 'restricted') {
      setPermissionDenied(true);
      showPermissionAlert('camera');
      setHasPermission(false);
      return;
    }

    if (status === 'granted') {
      setHasPermission(true);
      setPermissionDenied(false);
      return;
    }

    const permission = await Camera.requestCameraPermission();
    const granted = permission === 'granted';
    setHasPermission(granted);
    setPermissionDenied(!granted);

    if (!granted) {
      showPermissionAlert('camera');
    }
  };

  useEffect(() => {
    requestCameraPermission();
  }, []);

  return { hasPermission, permissionDenied, requestCameraPermission };
};
