import { StyleSheet } from 'react-native';

const comicDetailsStyles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#0a0a0f' },
  loading: { flex: 1, backgroundColor: '#0a0a0f', alignItems: 'center', justifyContent: 'center' },
  back: { position: 'absolute', top: 50, left: 16, zIndex: 10, backgroundColor: 'rgba(10,10,15,0.7)', borderRadius: 20, padding: 8 },
  cover: { width: '100%', height: 420, resizeMode: 'cover' },
  info: { padding: 20 },
  badge: { alignSelf: 'flex-start', paddingVertical: 4, paddingHorizontal: 12, backgroundColor: 'rgba(239, 68, 68, 0.15)', borderWidth: 1, borderColor: 'rgba(239, 68, 68, 0.3)', borderRadius: 16, marginBottom: 12 },
  badgeText: { color: '#dc2626', fontSize: 11, fontWeight: '700' },
  title: { fontSize: 24, fontWeight: '900', color: '#e8e6f0', marginBottom: 14 },
  desc: { fontSize: 14, color: '#9896b0', lineHeight: 22, marginBottom: 24 },
  precos: { flexDirection: 'row', gap: 12, marginBottom: 20 },
  precoBox: { flex: 1, backgroundColor: '#12121a', borderRadius: 10, borderWidth: 1, borderColor: '#1c1c2e', padding: 14, alignItems: 'center' },
  precoLabel: { fontSize: 12, color: '#9896b0', marginBottom: 4 },
  precoValor: { fontSize: 18, fontWeight: '700', color: '#ef4444' },
  btnPrimary: { flexDirection: 'row', gap: 8, height: 52, backgroundColor: '#dc2626', borderRadius: 10, alignItems: 'center', justifyContent: 'center', marginBottom: 12 },
  btnText: { color: '#fff', fontWeight: '700', fontSize: 16 },
  btnSecondary: { height: 52, borderRadius: 10, alignItems: 'center', justifyContent: 'center', backgroundColor: 'rgba(239, 68, 68, 0.1)', borderWidth: 1, borderColor: 'rgba(239, 68, 68, 0.3)' },
  btnTextSec: { color: '#dc2626', fontWeight: '700', fontSize: 16 },
});

export default comicDetailsStyles;
