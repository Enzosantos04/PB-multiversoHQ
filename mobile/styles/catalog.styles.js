import { StyleSheet } from 'react-native';

const catalogStyles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#0a0a0f' },
  header: { paddingHorizontal: 16, paddingTop: 60, paddingBottom: 12 },
  headerTitle: { fontSize: 26, fontWeight: '900', color: '#ef4444' },
  searchBar: {
    flexDirection: 'row', alignItems: 'center', gap: 10,
    marginHorizontal: 16, marginBottom: 16, padding: 12,
    backgroundColor: '#12121a', borderRadius: 10,
    borderWidth: 1, borderColor: '#1c1c2e',
  },
  searchInput: { flex: 1, color: '#e8e6f0', fontSize: 15 },
  card: {
    flex: 1,
    backgroundColor: '#12121a',
    borderRadius: 10,
    overflow: 'hidden',
    borderWidth: 1,
    borderColor: '#1c1c2e',
  },
  cover: { width: '100%', aspectRatio: 0.67, resizeMode: 'cover', backgroundColor: '#0a0a0f' },
  comicName: { fontSize: 13, fontWeight: '600', color: '#e8e6f0', padding: 10, paddingBottom: 2 },
  publisher: { fontSize: 11, color: '#9896b0', paddingHorizontal: 10, paddingBottom: 10 },
  empty: { flex: 1, alignItems: 'center', justifyContent: 'center' },
  emptyText: { color: '#6b6a82', fontSize: 15 },
});

export default catalogStyles;
