import { StyleSheet, Platform } from 'react-native';

const cartStyles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#0a0a0f' },

  empty: {
    flex: 1,
    backgroundColor: '#0a0a0f',
    alignItems: 'center',
    justifyContent: 'center',
    gap: 12,
  },

  emptyText: { color: '#6b6a82', fontSize: 16 },

  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: 16,
    paddingTop: 60,
    paddingBottom: 12,
  },

  headerTitle: {
    fontSize: 26,
    fontWeight: '900',
    color: '#ef4444',
  },

  limpar: {
    color: '#f87171',
    fontSize: 14,
  },

  shippingBox: {
    marginHorizontal: 16,
    marginBottom: 12,
    backgroundColor: '#12121a',
    borderRadius: 10,
    padding: 14,
    borderWidth: 1,
    borderColor: '#1c1c2e',

    ...Platform.select({
      ios: {
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 3 },
        shadowOpacity: 0.25,
        shadowRadius: 6,
      },
      android: {
        elevation: 4,
      },
    }),
  },

  shippingTitle: {
    color: '#e8e6f0',
    fontSize: 16,
    fontWeight: '700',
    marginBottom: 10,
  },

  cepInput: {
    backgroundColor: '#0a0a0f',
    borderWidth: 1,
    borderColor: '#2a2a3d',
    borderRadius: 8,
    color: '#fff',
    height: 48,
    paddingHorizontal: 12,
    marginBottom: 10,
    textAlignVertical: Platform.OS === 'android' ? 'center' : 'auto',
  },

  shippingButton: {
    backgroundColor: '#dc2626',
    height: 46,
    borderRadius: 8,
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 10,
  },

  shippingButtonText: {
    color: '#fff',
    fontWeight: '700',
  },

  locationButton: {
    height: 46,
    borderRadius: 8,
    borderWidth: 1,
    borderColor: '#ef4444',
    alignItems: 'center',
    justifyContent: 'center',
    flexDirection: 'row',
    gap: 8,
  },

  locationButtonText: {
    color: '#ef4444',
    fontWeight: '700',
  },

  addressText: {
    color: '#9896b0',
    fontSize: 12,
    marginTop: 10,
    lineHeight: 18,
  },

  item: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 12,
    marginBottom: 16,
    backgroundColor: '#12121a',
    borderRadius: 10,
    padding: 12,
    borderWidth: 1,
    borderColor: '#1c1c2e',
  },

  thumb: {
    width: 56,
    height: 80,
    borderRadius: 6,
    resizeMode: 'cover',
    backgroundColor: '#0a0a0f',
  },

  itemInfo: { flex: 1 },

  itemName: {
    fontSize: 13,
    fontWeight: '600',
    color: '#e8e6f0',
    marginBottom: 4,
  },

  itemType: {
    fontSize: 11,
    color: '#9896b0',
    marginBottom: 4,
  },

  itemPrice: {
    fontSize: 13,
    color: '#ef4444',
    fontWeight: '600',
    marginBottom: 8,
  },

  qtyRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 12,
  },

  qtyBtn: {
    width: 26,
    height: 26,
    borderRadius: 6,
    backgroundColor: '#1c1c2e',
    alignItems: 'center',
    justifyContent: 'center',
  },

  qtyText: {
    color: '#e8e6f0',
    fontSize: 14,
    fontWeight: '600',
    minWidth: 20,
    textAlign: 'center',
  },

  summary: {
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
    backgroundColor: '#12121a',
    borderTopWidth: 1,
    borderTopColor: '#1c1c2e',
    padding: 20,
    gap: 8,
  },

  row: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },

  label: {
    fontSize: 14,
    color: '#9896b0',
  },

  value: {
    fontSize: 14,
    color: '#e8e6f0',
  },

  totalRow: {
    marginTop: 8,
    paddingTop: 8,
    borderTopWidth: 1,
    borderTopColor: '#1c1c2e',
  },

  totalLabel: {
    fontSize: 16,
    fontWeight: '700',
    color: '#e8e6f0',
  },

  totalValue: {
    fontSize: 18,
    fontWeight: '700',
    color: '#ef4444',
  },

  checkout: {
    marginTop: 12,
    height: 50,
    backgroundColor: '#dc2626',
    borderRadius: 10,
    alignItems: 'center',
    justifyContent: 'center',
  },

  checkoutText: {
    color: '#fff',
    fontWeight: '700',
    fontSize: 16,
  },
});

export default cartStyles;
