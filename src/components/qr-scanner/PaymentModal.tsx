import React, { useState } from 'react';
import {
  View,
  Text,
  Modal,
  StyleSheet,
  TouchableOpacity,
  ActivityIndicator,
} from 'react-native';
import { colors } from 'constants/colors';
import { usePrepareSBPPayment } from 'hooks/usePrepareSBPPayment';
import { useCreateSBPPayment } from 'hooks/useCreateSBPPayment';
import { useTransactionStatus } from 'hooks/useTransactionStatus';
import { CustomButton } from 'common/button';
import { showToast } from 'utils/toast';

type PaymentModalProps = {
  visible: boolean;
  qrUrl: string;
  coin: string;
  onClose: () => void;
};

export const PaymentModal: React.FC<PaymentModalProps> = ({
  visible,
  qrUrl,
  coin,
  onClose,
}) => {
  const [txId, setTxId] = useState<string | null>(null);
  
  const { data, isLoading, isError, error } = usePrepareSBPPayment(
    { coin, qr_url: qrUrl },
    visible && !txId
  );

  const createPayment = useCreateSBPPayment();
  const { data: txStatus, isLoading: txLoading } = useTransactionStatus(txId, !!txId);

  const formatTime = (seconds: number): string => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins}:${secs.toString().padStart(2, '0')}`;
  };

  const handlePay = async () => {
    if (!data) return;

    try {
      const result = await createPayment.mutateAsync({
        idempotency: data.idempotency,
        qr_url: qrUrl,
        coin: coin,
      });

      setTxId(result.txId);
      showToast.success('Платеж создан');
    } catch (err) {
      showToast.error((err as any)?.message || 'Ошибка создания платежа');
    }
  };

  const handleClose = () => {
    setTxId(null);
    onClose();
  };

  if (!visible) return null;

  // Show transaction status if payment was created
  if (txId && txStatus) {
    return (
      <Modal
        visible={visible}
        transparent
        animationType="slide"
        onRequestClose={handleClose}
      >
        <View style={styles.overlay}>
          <View style={styles.modalContainer}>
            <View style={styles.dragHandle} />
            
            <View style={styles.modalHeader}>
              <Text style={styles.modalTitle}>Статус платежа</Text>
              <TouchableOpacity onPress={handleClose} style={styles.closeButton}>
                <Text style={styles.closeButtonText}>✕</Text>
              </TouchableOpacity>
            </View>

            <View style={styles.content}>
              <View style={styles.statusContainer}>
                {txStatus.status === 'pending' && (
                  <>
                    <ActivityIndicator size="large" color={colors.primaryButton} />
                    <Text style={styles.statusText}>Ожидание подтверждения...</Text>
                  </>
                )}
                {txStatus.status === 'completed' && (
                  <>
                    <Text style={styles.successIcon}>✓</Text>
                    <Text style={styles.statusText}>Платеж завершен</Text>
                  </>
                )}
                {(txStatus.status === 'failed' || txStatus.status === 'cancelled') && (
                  <>
                    <Text style={styles.errorIcon}>✕</Text>
                    <Text style={styles.statusText}>Платеж отклонен</Text>
                  </>
                )}
              </View>

              <View style={styles.infoRow}>
                <Text style={styles.label}>ID транзакции</Text>
                <Text style={styles.valueSmall}>{txStatus.txHash}</Text>
              </View>

              <View style={styles.infoRow}>
                <Text style={styles.label}>Магазин</Text>
                <Text style={styles.value}>{txStatus.shopName || '-'}</Text>
              </View>

              <View style={styles.infoRow}>
                <Text style={styles.label}>Сумма ({coin})</Text>
                <Text style={styles.value}>{txStatus.value}</Text>
              </View>

              <View style={styles.infoRow}>
                <Text style={styles.label}>Сумма (RUB)</Text>
                <Text style={styles.value}>{txStatus.fiatValue}</Text>
              </View>

              {txStatus.status === 'completed' && (
                <View style={styles.buttonContainer}>
                  <CustomButton 
                    title="Закрыть" 
                    onPress={handleClose}
                    size="lg"
                  />
                </View>
              )}
            </View>
          </View>
        </View>
      </Modal>
    );
  }

  return (
    <Modal
      visible={visible}
      transparent
      animationType="slide"
      onRequestClose={onClose}
    >
      <View style={styles.overlay}>
        <View style={styles.modalContainer}>
          <View style={styles.dragHandle} />
          
          <View style={styles.modalHeader}>
            <Text style={styles.modalTitle}>Детали платежа</Text>
            <TouchableOpacity onPress={onClose} style={styles.closeButton}>
              <Text style={styles.closeButtonText}>✕</Text>
            </TouchableOpacity>
          </View>

          {isLoading && (
            <View style={styles.loadingContainer}>
              <ActivityIndicator size="large" color={colors.primaryButton} />
              <Text style={styles.loadingText}>Загрузка...</Text>
            </View>
          )}

          {isError && (
            <View style={styles.errorContainer}>
              <Text style={styles.errorText}>
                {(error as any)?.message || 'Ошибка загрузки данных'}
              </Text>
              <TouchableOpacity onPress={onClose} style={styles.retryButton}>
                <Text style={styles.retryButtonText}>Закрыть</Text>
              </TouchableOpacity>
            </View>
          )}

          {data && !isLoading && !isError && (
            <View style={styles.content}>
              <View style={styles.infoRow}>
                <Text style={styles.label}>Сумма ({coin})</Text>
                <Text style={styles.value}>{data.value}</Text>
              </View>

              <View style={styles.infoRow}>
                <Text style={styles.label}>Сумма (RUB)</Text>
                <Text style={styles.value}>{data.fiatAmount}</Text>
              </View>

              <View style={styles.infoRow}>
                <Text style={styles.label}>Курс</Text>
                <Text style={styles.value}>{data.rate}</Text>
              </View>

              <View style={styles.infoRow}>
                <Text style={styles.label}>Действительно</Text>
                <Text style={styles.value}>
                  {formatTime(data.validTime)}
                </Text>
              </View>

              <View style={styles.footer}>
                <Text style={styles.updateText}>
                  Обновляется каждые 10 секунд
                </Text>
              </View>

              <View style={styles.buttonContainer}>
                <CustomButton 
                  title="Оплатить" 
                  onPress={handlePay}
                  size="lg"
                  disabled={createPayment.isPending}
                />
              </View>
            </View>
          )}
        </View>
      </View>
    </Modal>
  );
};

const styles = StyleSheet.create({
  overlay: {
    flex: 1,
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
    justifyContent: 'flex-end',
  },
  modalContainer: {
    backgroundColor: colors.darkBackground,
    borderTopLeftRadius: 32,
    borderTopRightRadius: 32,
    padding: 24,
    paddingBottom: 40,
    borderTopWidth: 1,
    borderLeftWidth: 1,
    borderRightWidth: 1,
    borderColor: colors.cardBorder,
  },
  dragHandle: {
    width: 40,
    height: 4,
    backgroundColor: colors.textSecondary,
    borderRadius: 2,
    alignSelf: 'center',
    marginBottom: 16,
    opacity: 0.5,
  },
  modalHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 20,
  },
  modalTitle: {
    fontSize: 24,
    fontWeight: 'bold',
    color: colors.white,
  },
  closeButton: {
    width: 32,
    height: 32,
    borderRadius: 16,
    backgroundColor: 'rgba(255, 255, 255, 0.1)',
    justifyContent: 'center',
    alignItems: 'center',
  },
  closeButtonText: {
    fontSize: 18,
    color: colors.white,
  },
  loadingContainer: {
    paddingVertical: 60,
    alignItems: 'center',
  },
  loadingText: {
    marginTop: 12,
    fontSize: 14,
    color: colors.textSecondary,
  },
  errorContainer: {
    paddingVertical: 20,
    alignItems: 'center',
  },
  errorText: {
    fontSize: 14,
    color: colors.error,
    textAlign: 'center',
    marginBottom: 16,
  },
  retryButton: {
    paddingHorizontal: 24,
    paddingVertical: 12,
    backgroundColor: colors.primaryButton,
    borderRadius: 20,
  },
  retryButtonText: {
    fontSize: 14,
    fontWeight: '600',
    color: colors.white,
  },
  content: {
    gap: 16,
  },
  infoRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingVertical: 16,
    paddingHorizontal: 20,
    backgroundColor: 'rgba(255, 255, 255, 0.03)',
    borderRadius: 16,
  },
  label: {
    fontSize: 15,
    color: colors.textSecondary,
  },
  value: {
    fontSize: 17,
    fontWeight: '600',
    color: colors.white,
  },
  footer: {
    marginTop: 8,
    paddingTop: 16,
    borderTopWidth: 1,
    borderTopColor: colors.cardBorder,
    alignItems: 'center',
  },
  updateText: {
    fontSize: 12,
    color: colors.textSecondary,
    opacity: 0.7,
  },
  buttonContainer: {
    marginTop: 24,
    width: '100%',
  },
  statusContainer: {
    paddingVertical: 32,
    alignItems: 'center',
    marginBottom: 16,
  },
  statusText: {
    fontSize: 18,
    fontWeight: '600',
    color: colors.white,
    marginTop: 16,
  },
  successIcon: {
    fontSize: 64,
    color: '#4CD964',
  },
  errorIcon: {
    fontSize: 64,
    color: colors.error,
  },
  valueSmall: {
    fontSize: 13,
    fontWeight: '600',
    color: colors.white,
    flex: 1,
    textAlign: 'right',
  },
});
