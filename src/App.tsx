import { SafeAreaProvider } from 'react-native-safe-area-context';
import { QueryClientProvider } from '@tanstack/react-query';
import dayjs from 'dayjs';
import customParseFormat from 'dayjs/plugin/customParseFormat';
import 'dayjs/locale/ru';

import Toast from 'react-native-toast-message';

import { Routes } from 'navigation';
import { toastConfig } from 'utils/toast';
import { queryClient } from 'api/query-client';

dayjs.extend(customParseFormat);
dayjs.locale('ru');

function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <SafeAreaProvider>
        <Routes />
        <Toast config={toastConfig} />
      </SafeAreaProvider>
    </QueryClientProvider>
  );
}

export default App;
