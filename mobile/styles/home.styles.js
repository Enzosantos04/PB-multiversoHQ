import { StyleSheet } from 'react-native';

const homeStyles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#0a0a0f',
  },
  loading: {
    flex: 1,
    backgroundColor: '#0a0a0f',
    alignItems: 'center',
    justifyContent: 'center',
    gap: 12,
  },
  loadingText: {
    color: '#9896b0',
    fontSize: 14,
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 16,
    paddingTop: 60,
    paddingBottom: 20,
  },
  perfilBtn: {
    width: 44,
    height: 44,
    borderRadius: 22,
    backgroundColor: 'rgba(239, 68, 68, 0.1)',
    borderWidth: 1,
    borderColor: 'rgba(239, 68, 68, 0.3)',
    alignItems: 'center',
    justifyContent: 'center',
  },
  headerTitle: {
    fontSize: 26,
    fontWeight: '900',
    color: '#ef4444',
    marginBottom: 4,
  },
  headerSubtitle: {
    fontSize: 14,
    color: '#9896b0',
  },
  secao: {
    marginBottom: 24,
  },
  secaoTitulo: {
    fontSize: 18,
    fontWeight: '700',
    color: '#e8e6f0',
    marginBottom: 12,
    paddingHorizontal: 16,
  },
  card: {
    width: 120,
  },
  cover: {
    width: 120,
    height: 180,
    borderRadius: 8,
    backgroundColor: '#12121a',
    resizeMode: 'cover',
  },
  comicName: {
    fontSize: 12,
    fontWeight: '600',
    color: '#e8e6f0',
    marginTop: 8,
  },
});

export default homeStyles;
