import { StyleSheet } from 'react-native';

const plansStyles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#0a0a0f',
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 16,
    paddingTop: 60,
    paddingBottom: 20,
    gap: 12,
  },
  headerTitle: {
    fontSize: 26,
    fontWeight: '900',
    color: '#ef4444',
  },
  content: {
    padding: 16,
    gap: 16,
  },
  card: {
    backgroundColor: '#12121a',
    borderRadius: 16,
    padding: 20,
    borderWidth: 1,
    borderColor: '#1c1c2e',
    gap: 12,
  },
  activeCard: {
    borderColor: '#ef4444',
    borderWidth: 2,
  },
  planHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  planName: {
    fontSize: 20,
    fontWeight: '800',
    color: '#e8e6f0',
  },
  planPrice: {
    fontSize: 18,
    fontWeight: '700',
    color: '#ef4444',
  },
  planDesc: {
    fontSize: 14,
    color: '#9896b0',
    lineHeight: 20,
  },
  featureRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
  },
  featureText: {
    fontSize: 13,
    color: '#e8e6f0',
  },
  button: {
    height: 48,
    backgroundColor: '#dc2626',
    borderRadius: 10,
    alignItems: 'center',
    justifyContent: 'center',
    marginTop: 8,
  },
  buttonDisabled: {
    backgroundColor: '#1c1c2e',
  },
  buttonText: {
    color: '#fff',
    fontWeight: '700',
    fontSize: 15,
  },
  buttonTextDisabled: {
    color: '#6b6a82',
  },
});

export default plansStyles;
