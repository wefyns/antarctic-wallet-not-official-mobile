import { StyleSheet } from 'react-native';
import { colors } from 'constants/colors';

export const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  loadingContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  header: {
    paddingHorizontal: 24,
    paddingTop: 20,
    paddingBottom: 16,
    borderBottomWidth: 1,
    borderBottomColor: colors.cardBorder,
  },
  backButton: {
    marginBottom: 12,
  },
  backButtonText: {
    fontSize: 16,
    color: colors.primaryButton,
  },
  title: {
    fontSize: 28,
    fontWeight: 'bold',
    color: colors.white,
  },
  scrollContainer: {
    flex: 1,
    paddingHorizontal: 24,
  },
  emptyState: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 40,
  },
  emptyText: {
    fontSize: 16,
    color: colors.textSecondary,
    textAlign: 'center',
  },
  // Info Card
  infoCard: {
    backgroundColor: 'rgba(10, 132, 255, 0.1)',
    borderRadius: 16,
    padding: 16,
    marginTop: 20,
    marginBottom: 24,
    borderWidth: 1,
    borderColor: 'rgba(10, 132, 255, 0.3)',
  },
  infoText: {
    fontSize: 14,
    color: colors.white,
    lineHeight: 20,
  },
  // Coin Section
  coinSection: {
    marginBottom: 24,
  },
  coinSectionHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 12,
    gap: 8,
  },
  coinSectionTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    color: colors.white,
  },
  coinSectionCode: {
    fontSize: 14,
    color: colors.textSecondary,
    backgroundColor: colors.cardBackground,
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: 8,
  },
  // Address Card
  addressCard: {
    backgroundColor: colors.cardBackground,
    borderRadius: 16,
    padding: 16,
    marginBottom: 12,
    borderWidth: 1,
    borderColor: colors.cardBorder,
  },
  addressHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 12,
  },
  networkBadge: {
    backgroundColor: 'rgba(10, 132, 255, 0.2)',
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: 12,
    borderWidth: 1,
    borderColor: colors.primaryButton,
  },
  networkBadgeText: {
    fontSize: 12,
    fontWeight: '600',
    color: colors.primaryButton,
  },
  commissionBadge: {
    backgroundColor: 'rgba(255, 149, 0, 0.2)',
    paddingHorizontal: 10,
    paddingVertical: 4,
    borderRadius: 10,
  },
  commissionText: {
    fontSize: 11,
    color: colors.warning,
    fontWeight: '500',
  },
  addressContent: {
    marginBottom: 8,
  },
  addressLabel: {
    fontSize: 12,
    color: colors.textSecondary,
    marginBottom: 6,
  },
  addressText: {
    fontSize: 14,
    color: colors.white,
    fontFamily: 'monospace',
    backgroundColor: 'rgba(255, 255, 255, 0.05)',
    padding: 12,
    borderRadius: 8,
  },
  copyHint: {
    alignItems: 'center',
    paddingTop: 8,
    borderTopWidth: 1,
    borderTopColor: colors.cardBorder,
  },
  copyHintText: {
    fontSize: 12,
    color: colors.primaryButton,
    fontWeight: '500',
  },
  // Warning Card
  warningCard: {
    backgroundColor: 'rgba(255, 59, 48, 0.1)',
    borderRadius: 16,
    padding: 16,
    marginTop: 12,
    marginBottom: 40,
    borderWidth: 1,
    borderColor: 'rgba(255, 59, 48, 0.3)',
  },
  warningTitle: {
    fontSize: 16,
    fontWeight: 'bold',
    color: colors.white,
    marginBottom: 8,
  },
  warningText: {
    fontSize: 13,
    color: colors.white,
    lineHeight: 20,
    opacity: 0.9,
  },
});
