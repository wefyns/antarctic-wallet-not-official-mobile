import { StyleSheet } from 'react-native';
import { colors } from 'constants/colors';

export const styles = StyleSheet.create({
  scrollContainer: {
    flex: 1,
  },
  container: {
    flex: 1,
    paddingHorizontal: 24,
    paddingTop: 20,
    paddingBottom: 40,
  },
  loadingContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  errorContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    paddingHorizontal: 24,
  },
  errorText: {
    fontSize: 16,
    color: colors.error,
    textAlign: 'center',
  },
  header: {
    marginBottom: 24,
  },
  userInfo: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 12,
  },
  avatar: {
    width: 56,
    height: 56,
    borderRadius: 28,
    backgroundColor: colors.cardBackground,
  },
  greeting: {
    fontSize: 24,
    fontWeight: 'bold',
    color: colors.white,
  },
  username: {
    fontSize: 14,
    color: colors.textSecondary,
    marginTop: 2,
  },
  balanceCard: {
    backgroundColor: colors.cardBackground,
    borderRadius: 24,
    padding: 24,
    marginBottom: 24,
    borderWidth: 1,
    borderColor: colors.cardBorder,
  },
  balanceLabel: {
    fontSize: 16,
    color: colors.white,
    opacity: 0.7,
    marginBottom: 8,
  },
  balanceAmount: {
    fontSize: 42,
    fontWeight: 'bold',
    color: colors.white,
    marginBottom: 20,
  },
  buttonContainer: {
    width: '100%',
  },
  // QR Scanner Card
  scannerCard: {
    backgroundColor: colors.cardBackground,
    borderRadius: 24,
    padding: 24,
    marginBottom: 24,
    borderWidth: 2,
    borderColor: colors.primaryButton,
  },
  scannerContent: {
    marginBottom: 16,
  },
  scannerTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    color: colors.white,
    marginBottom: 6,
  },
  scannerDescription: {
    fontSize: 14,
    color: colors.textSecondary,
    lineHeight: 20,
  },
  // Coins Section
  coinsSection: {
    marginTop: 8,
  },
  sectionTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    color: colors.white,
    marginBottom: 16,
  },
  emptyState: {
    padding: 40,
    alignItems: 'center',
  },
  emptyText: {
    fontSize: 16,
    color: colors.textSecondary,
  },
  // Coin Card
  coinCard: {
    backgroundColor: colors.cardBackground,
    borderRadius: 20,
    padding: 16,
    marginBottom: 12,
    borderWidth: 1,
    borderColor: colors.cardBorder,
  },
  coinHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 12,
  },
  coinInfo: {
    flex: 1,
  },
  coinName: {
    fontSize: 18,
    fontWeight: '600',
    color: colors.white,
    marginBottom: 2,
  },
  coinCode: {
    fontSize: 14,
    color: colors.textSecondary,
  },
  coinBalance: {
    alignItems: 'flex-end',
  },
  coinBalanceAmount: {
    fontSize: 20,
    fontWeight: 'bold',
    color: colors.white,
    marginBottom: 2,
  },
  coinBalanceLabel: {
    fontSize: 12,
    color: colors.textSecondary,
  },
  coinBalanceFiat: {
    fontSize: 11,
    color: colors.textSecondary,
    marginTop: 2,
    opacity: 0.8,
  },
  // Rates
  coinRates: {
    flexDirection: 'row',
    paddingVertical: 12,
    paddingHorizontal: 16,
    backgroundColor: 'rgba(255, 255, 255, 0.03)',
    borderRadius: 12,
    marginBottom: 8,
  },
  rateItem: {
    flex: 1,
    alignItems: 'center',
  },
  rateLabel: {
    fontSize: 12,
    color: colors.textSecondary,
    marginBottom: 4,
  },
  rateValue: {
    fontSize: 14,
    fontWeight: '600',
    color: colors.white,
  },
  rateDivider: {
    width: 1,
    backgroundColor: colors.cardBorder,
    marginHorizontal: 12,
  },
  // Networks
  networksContainer: {
    marginTop: 8,
  },
  networksLabel: {
    fontSize: 12,
    color: colors.textSecondary,
    marginBottom: 6,
  },
  networksList: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 6,
  },
  networkBadge: {
    paddingHorizontal: 10,
    paddingVertical: 4,
    backgroundColor: 'rgba(10, 132, 255, 0.2)',
    borderRadius: 8,
    borderWidth: 1,
    borderColor: colors.primaryButton,
  },
  networkBadgeDisabled: {
    backgroundColor: 'rgba(255, 255, 255, 0.05)',
    borderColor: colors.cardBorder,
    opacity: 0.5,
  },
  networkBadgeText: {
    fontSize: 11,
    fontWeight: '600',
    color: colors.primaryButton,
  },
  networkBadgeTextDisabled: {
    color: colors.textSecondary,
  },
});
